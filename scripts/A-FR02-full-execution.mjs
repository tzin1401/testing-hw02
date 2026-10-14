#!/usr/bin/env node
// A-FR02 execution harness: records HTTP and isolated headless-Chrome UI observations.
// Never imports or writes the SUT database. Test users are registered through the running API.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn, spawnSync} from 'node:child_process';
import {performance} from 'node:perf_hooks';
import {setTimeout as delay} from 'node:timers/promises';
import {randomUUID} from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const runId = new Date().toISOString().replaceAll(/[-:.]/g, '').replace('T','T').slice(0,15) + 'Z-' + randomUUID().slice(0,8);
const outDir = path.join(root, 'evidence', 'A-FR02', 'full-runs', runId);
fs.mkdirSync(outDir, {recursive:true});
const logPath = path.join(outDir, 'execution.jsonl');
const API = 'http://localhost:3000/api';
const UI_ONLY = process.env.A_FR02_UI_ONLY === '1';
const WEB = 'http://localhost:5173';
const GOOD = 'Test1234!';
const BAD = 'Wrong123!';
const startedAt = performance.now();

function redact(x) {
  if (Array.isArray(x)) return x.map(redact);
  if (x && typeof x === 'object') {
    const y = {};
    for (const [k,v] of Object.entries(x)) y[k] = /password|token|authorization/i.test(k) ? '[REDACTED]' : redact(v);
    return y;
  }
  return x;
}
function write(rec) {
  fs.appendFileSync(logPath, JSON.stringify({run_id:runId, utc:new Date().toISOString(), monotonic:performance.now()/1000, ...rec})+'\n');
}
function dbState(email) {
  const code = `import sqlite3,json,sys\np=sqlite3.connect('file:eshop-sut/backend/database.sqlite?mode=ro',uri=True)\nr=p.execute('SELECT id,email,role,login_attempts,locked_until FROM users WHERE email=?',(sys.argv[1],)).fetchone()\nprint(json.dumps(r))\np.close()`;
  const r = spawnSync('python3',['-c',code,email],{cwd:root,encoding:'utf8'});
  if (r.status !== 0) return {available:false, error:r.stderr.trim()};
  try { return {available:true,row:JSON.parse(r.stdout)}; } catch { return {available:false,error:r.stdout}; }
}
async function request(pathname, payload, label, emailForState=null) {
  const sentUtc = new Date().toISOString();
  const sentMono = performance.now()/1000;
  let response, data;
  try {
    response = await fetch(API+pathname,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    const raw = await response.text();
    try { data=JSON.parse(raw); } catch { data={raw}; }
  } catch (e) { data={transport_error:String(e)}; response={status:0}; }
  const receivedMono = performance.now()/1000;
  const state = emailForState ? dbState(emailForState) : null;
  const rec = {kind:'http',label,request:{method:'POST',path:pathname,body:redact(payload)},sent_utc:sentUtc,sent_monotonic:sentMono,received_monotonic:receivedMono,round_trip_seconds:receivedMono-sentMono,status:response.status,response:redact(data),db_state:state};
  write(rec);
  return {...rec,rawResponse:data};
}
let accountSeq=0;
async function account(tag) {
  const email = `a-fr02-${runId.toLowerCase()}-${++accountSeq}-${tag}@example.test`;
  const rr = await request('/register',{name:`A-FR02 ${tag}`,email,password:GOOD},`register:${tag}`,email);
  if (rr.status < 200 || rr.status >= 300) throw new Error(`Registration failed ${tag}: ${rr.status}`);
  return email;
}
async function login(email,password,label,loginEmail=email) {
  return request('/login',{email:loginEmail,password},label,email);
}
function logCase(tc,status,detail,extra={}) { write({kind:'case_checkpoint',tc_id:tc,status,detail,...extra}); }
async function wrongs(email,count,tc) {
  let arr=[];
  for(let i=1;i<=count;i++) arr.push(await login(email,BAD,`${tc}:wrong-${i}`));
  return arr;
}
async function pauseFrom(last,seconds,tc) {
  const before = performance.now()/1000;
  await delay(seconds*1000);
  const after = performance.now()/1000;
  const elapsed=after-before;
  write({kind:'wait',tc_id:tc,target_seconds:seconds,actual_wait_seconds:elapsed,start_monotonic:before,end_monotonic:after});
  return elapsed;
}

write({kind:'run_started',run_id:runId,utc:new Date().toISOString(),node:process.version,os:`${os.type()} ${os.release()}`,baseline_sut:'85af3ba875c88283615e22cb108f13e2fccaf0e9',runtime_sut_commit:'85af3ba875c88283615e22cb108f13e2fccaf0e9',backend:'http://localhost:3000',web:'http://localhost:5173',db_read_only:true,passwords_tokens_redacted:true});

// API-only cases: each stateful probe has its own newly registered account.
if (!UI_ONLY) {
{
 let e=await account('dt005'); let r=await login(e,GOOD,'A-DT-005:correct'); logCase('A-DT-005',r.status===200?'observed-success':'observed-non-success','API success response checkpoint; UI token storage/header not covered',{http_status:r.status,account:e});
}
{
 let e=`a-fr02-absent-${runId.toLowerCase()}@example.test`; let r=await login(e,GOOD,'A-DT-006:unknown-email',e); logCase('A-DT-006',r.status===401?'observed-rejected':'observed-other','Unknown email rejected; exact status not required by SRS',{http_status:r.status});
}
for (const [tc,body,tag] of [
 ['A-DT-007',{password:GOOD},'dt007'],
 ['A-DT-008',{email:123,password:GOOD},'dt008'],
 ['A-DT-009',null,'dt009'],
 ['A-DT-010',{email:null,password:GOOD},'dt010'],
]) {
 const e=await account(tag);
 const payload=tc==='A-DT-009'?{email:e}:body;
 const r=await request('/login',payload,`${tc}:malformed`,e);
 logCase(tc,'observed','Exploratory malformed input; oracle only requires no successful authentication; detailed status/counter unresolved',{http_status:r.status,account:e});
}
{
 let e=await account('dt018'); let r=await login(e,GOOD,'A-DT-018:uppercase-email',e.toUpperCase()); logCase('A-DT-018','observation-only','Email case normalization is unspecified',{http_status:r.status,account:e});
}
{
 let e=await account('dt019'); let r=await login(e,GOOD,'A-DT-019:space-email',` ${e} `); logCase('A-DT-019','observation-only','Email trimming is unspecified',{http_status:r.status,account:e});
}

// Fresh-user threshold sequences. Log every step; an early mismatch never hides later observed responses.
{
 let e=await account('bv001'); let r=await login(e,GOOD,'A-BV-001:zero-errors'); logCase('A-BV-001',r.status===200?'observed-success':'observed-non-success','Fresh account, no prior errors',{http_status:r.status,account:e});
}
{
 let e=await account('bv002'); let a=await wrongs(e,1,'A-BV-002'); logCase('A-BV-002','checkpoint-fail','After first wrong password expected counter=1/unlocked; inspect recorded DB state',{http_status:a[0].status,account:e,actual_state:a[0].db_state});
}
{
 let e=await account('bv003'); let a=await wrongs(e,2,'A-BV-003'); let p=await login(e,GOOD,'A-BV-003:correct-probe'); logCase('A-BV-003','checkpointed','Two-error and correct probe performed; expected counter 1→2 then correct login; compare recorded states',{http_statuses:[...a.map(x=>x.status),p.status],account:e});
}
{
 let e=await account('bv004'); let a=await wrongs(e,3,'A-BV-004'); let p=await login(e,GOOD,'A-BV-004:locked-correct-probe'); logCase('A-BV-004','checkpointed','Three sequential wrong requests plus correct probe; expected lock at third, all state snapshots recorded',{http_statuses:[...a.map(x=>x.status),p.status],account:e});
}
{
 let e=await account('bv005'); let a=await wrongs(e,4,'A-BV-005'); logCase('A-BV-005','checkpointed','Four sequential wrong requests in an independent account; expected third activates lock and fourth rejected while locked; exact counter during lock unresolved',{http_statuses:a.map(x=>x.status),account:e});
}
{
 let e=await account('dt011'); let a=await wrongs(e,3,'A-DT-011'); logCase('A-DT-011','checkpointed','Three API wrong-password steps for the state sequence; Web presentation not covered',{http_statuses:a.map(x=>x.status),account:e});
}
{
 let e=await account('dt014'); let a=await login(e,BAD,'A-DT-014:wrong-before'); let b=await login(e,GOOD,'A-DT-014:success'); let c=await login(e,BAD,'A-DT-014:wrong-after'); logCase('A-DT-014','checkpointed','Wrong→success→wrong state sequence executed through API; compare counter snapshots; Web interaction not covered',{http_statuses:[a.status,b.status,c.status],account:e});
}

// Separate lock/time chains. t0 is bracketed by client send/receive of the request whose response first shows locked_until.
async function timedCase(tc, seconds, password, tag) {
 const e=await account(tag);
 const a=await wrongs(e,2,tc);
 const lockReq=a.find(x=>x.db_state?.row?.[4]);
 if (!lockReq) { logCase(tc,'blocked-setup','No locked_until was observed after setup attempts; target timing could not be established',{account:e}); return; }
 const lockBracket={start:lockReq.sent_monotonic,end:lockReq.received_monotonic,locked_until:lockReq.db_state.row[4]};
 await pauseFrom(lockReq,seconds,tc);
 const probe=await login(e,password,`${tc}:timed-probe`);
 const lower=probe.sent_monotonic-lockBracket.end;
 const upper=probe.received_monotonic-lockBracket.start;
 const classification=upper<30?'entire-request-before-30s':lower>30?'entire-request-after-30s':'interval-crosses-30s';
 logCase(tc,'checkpointed','Timing observation after premature lock setup; setup itself violates expected third-attempt threshold, so downstream verdict is limited',{account:e,http_status:probe.status,target_seconds:seconds,lock_bracket:lockBracket,elapsed_bounds_seconds:{lower,upper},interval_classification:classification,locked_until:lockBracket.locked_until});
}
await timedCase('A-DT-012',10,GOOD,'dt012');
await timedCase('A-DT-013',40,GOOD,'dt013');
await timedCase('A-BV-006',29,GOOD,'bv006');
await timedCase('A-BV-008',31,GOOD,'bv008');
await timedCase('A-BV-009',10,GOOD,'bv009');
await timedCase('A-BV-010',40,GOOD,'bv010');
{
 let e=await account('dt021'); const a=await wrongs(e,2,'A-DT-021');
 if(a[1].db_state?.row?.[4]) { await pauseFrom(a[1],10,'A-DT-021-first-probe'); const b=await login(e,GOOD,'A-DT-021:at-10s'); await pauseFrom(a[1],30,'A-DT-021-second-wait'); const c=await login(e,GOOD,'A-DT-021:around-40s'); logCase('A-DT-021','checkpointed','Probe while locked and later retry observed; retry-extension oracle unresolved; setup lock began early',{statuses:[...a.map(x=>x.status),b.status,c.status],account:e}); }
 else logCase('A-DT-021','blocked-setup','No lock observed; timed retry unavailable',{account:e});
}
{
 let e=await account('dt022'); const a=await wrongs(e,2,'A-DT-022');
 if(a[1].db_state?.row?.[4]) { await pauseFrom(a[1],40,'A-DT-022'); const b=await login(e,BAD,'A-DT-022:wrong-after-40s'); logCase('A-DT-022','checkpointed','Wrong password sent after 40s from observed premature lock; counter/reset behavior unresolved',{http_status:b.status,account:e}); }
 else logCase('A-DT-022','blocked-setup','No lock observed; 40s-after-lock condition unavailable',{account:e});
}

}

// Isolated UI automation in a fresh headless Chrome profile. UI evidence is independent of API-only cases.
class CDP {
 constructor(ws) { this.ws=ws; this.id=0; this.pending=new Map(); this.events=[]; ws.addEventListener('message',ev=>{let m; try{m=JSON.parse(ev.data)}catch{return} if(m.id){const p=this.pending.get(m.id); if(p){this.pending.delete(m.id); m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result)}} else if(m.method){this.events.push(m); if(this.onEvent)this.onEvent(m)}}); }
 send(method,params={}) { const id=++this.id; return new Promise((resolve,reject)=>{this.pending.set(id,{resolve,reject}); this.ws.send(JSON.stringify({id,method,params})); setTimeout(()=>{if(this.pending.has(id)){this.pending.delete(id);reject(new Error(`CDP timeout ${method}`))}},15000).unref(); }); }
 async eval(expression) { const r=await this.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true}); if(r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result?.value; }
}
let chrome, cdp, ws, targetId;
try {
 const port=UI_ONLY?9328:9327, profile=fs.mkdtempSync(path.join(os.tmpdir(),'a-fr02-chrome-'));
 chrome=spawn('/usr/bin/google-chrome',['--headless=new','--no-sandbox','--disable-gpu',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
 let version;
 for(let i=0;i<80;i++){try{version=await fetch(`http://127.0.0.1:${port}/json/version`).then(r=>r.json());break}catch{await delay(250)}}
 if(!version) throw new Error('Headless Chrome DevTools endpoint unavailable');
 const target=await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(WEB+'/login')}`,{method:'PUT'}).then(r=>r.json());
 targetId=target.id; ws=new WebSocket(target.webSocketDebuggerUrl); await new Promise((res,rej)=>{ws.addEventListener('open',res,{once:true});ws.addEventListener('error',rej,{once:true})});
 cdp=new CDP(ws);
 await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Network.enable');
 cdp.onEvent=m=>{
  if(m.method==='Network.requestWillBeSent'&&m.params.request?.url?.includes('/api/users/me')) {write({kind:'ui_protected_request',url:m.params.request.url,has_authorization:!!m.params.request.headers?.Authorization,authorization_scheme:(m.params.request.headers?.Authorization||'').split(' ')[0],request_id:m.params.requestId});}
  else if(m.method==='Network.requestWillBeSent'&&m.params.request?.url?.includes('/api/login')) {
   let body=m.params.request.postData; try{body=redact(JSON.parse(body))}catch{body='[unparsed/redacted]'}
   write({kind:'ui_network_request',url:m.params.request.url,method:m.params.request.method,body,has_authorization:!!m.params.request.headers?.Authorization});
  } else if(m.method==='Network.responseReceived'&&(m.params.response?.url?.includes('/api/login')||m.params.response?.url?.includes('/api/users/me'))) write({kind:'ui_network_response',url:m.params.response.url,status:m.params.response.status,request_id:m.params.requestId});
 };
 async function wait(ms=450){await delay(ms)}
 async function gotoLogin(clearToken=true){if(clearToken){try{await cdp.eval(`localStorage.removeItem('token')`)}catch{}} await cdp.send('Page.navigate',{url:WEB+'/login'}); await wait(650)}
 async function accountUI(tag){return await account(tag)}
 async function fillAndSubmit(email,password,tc,{invalidToken=false}={}){
  await cdp.eval(`(()=>{if(${invalidToken})localStorage.setItem('token','not-a-valid-jwt');const i=[...document.querySelectorAll('input')];const set=(el,v)=>{const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el),'value');d.set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));};set(i[0],${JSON.stringify(email)});set(i[1],${JSON.stringify(password)});return {inputs:i.map(x=>({type:x.type,required:x.required,valueLength:x.value.length,valid:x.checkValidity(),validationMessage:x.validationMessage})),formValid:i.every(x=>x.checkValidity())}})()`);
  const beforeEvents=cdp.events.length;
  await cdp.eval(`document.querySelector('button[type=submit]')?.click()`); await wait(700);
  let obs=await cdp.eval(`(()=>({url:location.href,title:document.title,body:document.body.innerText.slice(0,1200),error:document.querySelector('.bg-red-100')?.innerText||null,tokenPresent:!!localStorage.getItem('token'),tokenLength:localStorage.getItem('token')?.length||0,inputs:[...document.querySelectorAll('input')].map(x=>({type:x.type,required:x.required,valueLength:x.value.length,valid:x.checkValidity(),validationMessage:x.validationMessage}))}))()`);
  // Clear potentially visible credentials before taking screenshot. Preserve React error/navigation state.
  await cdp.eval(`document.querySelectorAll('input').forEach(x=>{const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x),'value');d.set.call(x,'');x.dispatchEvent(new Event('input',{bubbles:true}));})`);
  fs.mkdirSync(path.join(outDir,'screenshots'),{recursive:true});
  const shot=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  const shotPath=path.join(outDir,'screenshots',`${tc}.png`); fs.writeFileSync(shotPath,Buffer.from(shot.data,'base64'));
  write({kind:'ui_observation',tc_id:tc,observation:obs,screenshot:path.relative(root,shotPath),recent_login_event_count:cdp.events.slice(beforeEvents).filter(x=>x.method==='Network.requestWillBeSent'&&x.params.request.url.includes('/api/login')).length});
  return obs;
 }
 async function uiCase(tc,tag,email,pw,options={}) {await gotoLogin(); const obs=await fillAndSubmit(email,pw,tc,options); return obs;}

 // A-DT-001 valid UI login; token storage and protected-request behavior.
 let e=await accountUI('dt001'); let o=await uiCase('A-DT-001','dt001',e,GOOD);
 let authObs=await cdp.eval(`(()=>({tokenPresent:!!localStorage.getItem('token'),userGreeting:document.body.innerText.includes('Chào,'),url:location.href}))()`);
 const protectedReq=cdp.events.filter(x=>x.method==='Network.requestWillBeSent'&&x.params.request.url.includes('/api/users/me')).map(x=>{const rr=cdp.events.find(y=>y.method==='Network.responseReceived'&&y.params.requestId===x.params.requestId);return {url:x.params.request.url,hasAuthorization:!!x.params.request.headers?.Authorization,authorizationScheme:(x.params.request.headers?.Authorization||'').split(' ')[0],response_status:rr?.params.response.status||null}});
 write({kind:'ui_checkpoint',tc_id:'A-DT-001',account:e,observation:authObs,protected_requests:protectedReq});

 // Web input/domain cases; isolated users, one submission per ca.
 for(const [tc,tag,email,pw] of [
  ['A-DT-002','dt002',null,BAD],['A-DT-003','dt003',`absent-${runId}@example.test`,GOOD],['A-DT-004','dt004','not-an-email',GOOD],
  ['A-DT-015','dt015','',GOOD],['A-DT-016','dt016',null,''],['A-DT-017','dt017',null,'   '],
 ]) { let a; if(tc==='A-DT-002'||tc==='A-DT-016'||tc==='A-DT-017') a=await accountUI(tag); else a=email; await uiCase(tc,tag,a,pw); }
 // dt002's email must be a fresh account; rerun if placeholder null was used.
 // Stateful chain after fresh account.
 {
  let a=await accountUI('dt011'); await gotoLogin();
  const results=[];
  for(let i=1;i<=3;i++){results.push(await fillAndSubmit(a,BAD,`A-DT-011-${i}`)); if(i<3)await gotoLogin();}
  write({kind:'ui_checkpoint',tc_id:'A-DT-011',account:a,statuses:results.map(x=>x.url)});
 }
 {
  let a=await accountUI('dt014'); await gotoLogin();
  const r1=await fillAndSubmit(a,BAD,'A-DT-014-wrong1'); await gotoLogin();
  const r2=await fillAndSubmit(a,GOOD,'A-DT-014-success'); await gotoLogin();
  const r3=await fillAndSubmit(a,BAD,'A-DT-014-wrong2');
  write({kind:'ui_checkpoint',tc_id:'A-DT-014',account:a,states:[r1.url,r2.url,r3.url],final_db:dbState(a)});
 }
 {
  let a=await accountUI('dt020'); await gotoLogin(); await fillAndSubmit(a,BAD,'A-DT-020-wrong1');
  await gotoLogin(); await fillAndSubmit('not-an-email',GOOD,'A-DT-020-invalid');
  await gotoLogin(); await fillAndSubmit(a,BAD,'A-DT-020-wrong2');
  write({kind:'ui_checkpoint',tc_id:'A-DT-020',account:a,db_state:dbState(a)});
 }
 {
  let a=await accountUI('dt023'); await gotoLogin(); await fillAndSubmit(a,GOOD,'A-DT-023-setup');
  let before=await cdp.eval(`localStorage.getItem('token')`); await gotoLogin(false); await fillAndSubmit(a,BAD,'A-DT-023-wrong'); let after=await cdp.eval(`localStorage.getItem('token')`);
  write({kind:'ui_checkpoint',tc_id:'A-DT-023',account:a,old_token_still_same:before===after,token_present_after:!!after});
 }
 {
  let a=await accountUI('dt024'); await gotoLogin(); await cdp.eval(`localStorage.setItem('token','not-a-valid-jwt')`); await wait(100); await fillAndSubmit(a,GOOD,'A-DT-024-valid-login-invalid-client-token',{invalidToken:true});
  write({kind:'ui_checkpoint',tc_id:'A-DT-024',account:a,final_token_present:!!(await cdp.eval(`localStorage.getItem('token')`))});
 }
 async function uiLoginEvents(email) {
  return cdp.events.filter(x=>x.method==='Network.requestWillBeSent'&&x.params.request.url.includes('/api/login')&&(()=>{try{return JSON.parse(x.params.request.postData||'{}').email===email}catch{return false}})()).map(x=>({request:x, response:cdp.events.find(y=>y.method==='Network.responseReceived'&&y.params.requestId===x.params.requestId)}));
 }
 async function uiTimed(tc,seconds,password,tag) {
  const a=await accountUI(tag); await gotoLogin(); await fillAndSubmit(a,BAD,`${tc}-wrong1`); await gotoLogin(); await fillAndSubmit(a,BAD,`${tc}-wrong2`);
  const setup=uiLoginEvents(a); const lock=setup[setup.length-1];
  await delay(seconds*1000); await gotoLogin(); const probeObs=await fillAndSubmit(a,password,`${tc}-timed`);
  const ev=uiLoginEvents(a), probe=ev[ev.length-1];
  let bounds=null,classification='unavailable';
  if(lock?.request?.params.timestamp&&lock?.response?.params.timestamp&&probe?.request?.params.timestamp&&probe?.response?.params.timestamp){
   const lower=probe.request.params.timestamp-lock.response.params.timestamp;
   const upper=probe.response.params.timestamp-lock.request.params.timestamp;
   bounds={lower,upper}; classification=upper<30?'entire-request-before-30s':lower>30?'entire-request-after-30s':'interval-crosses-30s';
  }
  write({kind:'ui_timing_checkpoint',tc_id:tc,account:a,target_seconds:seconds,http_status:probe?.response?.params.response.status||null,expected_lock_setup_attempt:2,lock_setup_http_status:lock?.response?.params.response.status||null,lock_setup_db_state:dbState(a),elapsed_bounds_seconds:bounds,interval_classification:classification,observation:{url:probeObs.url,error:probeObs.error,token_present:probeObs.tokenPresent}});
 }
 await uiTimed('A-DT-012',10,GOOD,'dt012-ui');
 await uiTimed('A-DT-013',40,GOOD,'dt013-ui');
 {
  const tc='A-DT-021',a=await accountUI('dt021-ui'); await gotoLogin(); await fillAndSubmit(a,BAD,`${tc}-wrong1`); await gotoLogin(); await fillAndSubmit(a,BAD,`${tc}-wrong2`);
  await delay(10000); await gotoLogin(); const firstObs=await fillAndSubmit(a,GOOD,`${tc}-at10`);
  await delay(30000); await gotoLogin(); const secondObs=await fillAndSubmit(a,GOOD,`${tc}-around40`);
  write({kind:'ui_timing_checkpoint',tc_id:tc,account:a,target_seconds:[10,40],observations:[{url:firstObs.url,error:firstObs.error,token_present:firstObs.tokenPresent},{url:secondObs.url,error:secondObs.error,token_present:secondObs.tokenPresent}],db_state:dbState(a)});
 }
 await uiTimed('A-DT-022',40,BAD,'dt022-ui');
 write({kind:'browser_finished',chrome_version:version.Browser,isolated_profile:true,ui_observations_recorded:true});
} catch(e) {
 write({kind:'browser_automation_limited',error:String(e),note:'API cases continue to be independently recorded; UI cases without evidence remain unrun.'});
} finally {
 try { ws?.close(); } catch {}
 try { chrome?.kill('SIGTERM'); } catch {}
}

// Mark cases that require server-side controlled clock or are UI-only/state probes not automated above.
if (!UI_ONLY) for(const tc of ['A-BV-007','A-BV-011','A-BV-012']) logCase(tc,'not-run','No controlled clock at the server comparison point; real-time sleeping cannot establish the exact equality/1ms boundary.');

write({kind:'run_finished',run_id:runId,utc:new Date().toISOString(),elapsed_seconds:(performance.now()-startedAt)/1000,jsonl:path.relative(root,logPath),note:'Harness records observations only; final Pass/Fail is assigned in the execution report against reviewed expected results.'});
console.log(JSON.stringify({run_id:runId,log:path.relative(root,logPath),elapsed_seconds:(performance.now()-startedAt)/1000,accounts_created:accountSeq,screenshots_dir:path.relative(root,path.join(outDir,'screenshots'))}));
