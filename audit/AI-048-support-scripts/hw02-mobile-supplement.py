import subprocess as S,xml.etree.ElementTree as E,json,time,datetime,sqlite3,pathlib,uuid,shlex,hashlib
ROOT=pathlib.Path('/home/zinn/zinn/test/hw02'); A='/home/zinn/Android/Sdk/platform-tools/adb'
run=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'-'+uuid.uuid4().hex[:6]
out=ROOT/'evidence/D-MREG/supplement-runs'/run;out.mkdir(parents=True);pathlib.Path('/tmp/hw02-mobile-newdir').write_text(str(out))
db='/tmp/hw02-dmreg-isolated-run/database.sqlite'
def adb(*a):return S.check_output([A,*a])
def log(x):
 x.update(utc=datetime.datetime.now(datetime.timezone.utc).isoformat(),monotonic=time.monotonic(),run_id=run)
 with (out/'events.jsonl').open('a') as f:f.write(json.dumps(x,ensure_ascii=False)+'\n')
def tree():
 adb('shell','uiautomator','dump','/sdcard/hw02-ui.xml');return E.fromstring(adb('exec-out','cat','/sdcard/hw02-ui.xml'))
def text():return [n.get('text') for n in tree().iter('node') if n.get('text') and n.get('password')!='true']
def shot(label): (out/(label+'.png')).write_bytes(adb('exec-out','screencap','-p'))
def tapnode(n):
 import re
 x1,y1,x2,y2=map(int,re.findall(r'\d+',n.get('bounds')));adb('shell','input','tap',str((x1+x2)//2),str((y1+y2)//2));time.sleep(.3)
def click(label):
 nodes=list(tree().iter('node')); n=next((n for n in nodes if n.get('text')==label),None)
 if n is None:raise Exception('Missing '+label)
 tapnode(n)
def count(email):
 c=sqlite3.connect('file:'+db+'?mode=ro',uri=True);v=c.execute('select count(*) from users where email=?',(email,)).fetchone()[0];c.close();return v
def fill(vals):
 for i,value in enumerate(vals):
  fields=[n for n in tree().iter('node') if n.get('class')=='android.widget.EditText'];tapnode(fields[i]);adb('shell','input','keycombination','113','29');adb('shell','input','keyevent','67')
  if value: adb('shell',"input text "+shlex.quote(value.replace(' ','%s')))
  time.sleep(.2) # hardware keyboard; BACK would leave app
def register():
 t=text()
 if 'OK' in t:click('OK');t=text()
 if 'Đăng Ký Tài Khoản' not in t:click('Chưa có tài khoản? Đăng ký ngay')
log({'kind':'metadata','backend_db':db,'backend_pid':620916,'device':'Pixel 9 Android15 API35 Expo SDK54 density420','baseline':S.check_output(['git','-C',str(ROOT/'eshop-sut'),'rev-parse','HEAD']).decode().strip(),'note':'Reached login with TAB, DPAD_UP, DPAD_RIGHT, DPAD_CENTER; temporary density/rotation experiments restored. One exploratory product add was cleared by activity recreation on density change; no product data deleted. No server restart.','mobile_app_sha256':hashlib.sha256((ROOT/'eshop-sut/frontend-mobile/App.js').read_bytes()).hexdigest()})
shot('D-DT-001-register-form'); t=text();log({'tc':'D-DT-001','kind':'presence','visible':t,'edit_field_count':len([n for n in tree().iter('node') if n.get('class')=='android.widget.EditText']),'expected':'4 fields including confirmation','actual':'3 fields, no confirmation in fully visible form','status':'Fail'})
cases=[('D-DT-002','HW02 Vinh','Aa1!bbbb','new'),('D-DT-003','','Aa1!bbbb','new'),('D-DT-004','HW02 Vinh','Aa1!bbbb','empty'),('D-DT-005','HW02 Vinh','Aa1!bbbb','bad'),('D-DT-006','HW02 Vinh','Aa1!bbbb','duplicate'),('D-DT-007','HW02 Vinh','','new'),('D-DT-008','HW02 Vinh','aa1!bbbb','new'),('D-DT-009','HW02 Vinh','AA1!BBBB','new'),('D-DT-010','HW02 Vinh','Aa!!bbbb','new'),('D-DT-011','HW02 Vinh','Aa12bbbb','new'),('D-BV-001','HW02 Vinh','Aa1!bbb','new'),('D-BV-002','HW02 Vinh','Aa1!bbbb','new'),('D-BV-003','HW02 Vinh','Aa1!bbbbb','new'),('D-BV-004','HW02 Vinh','aa1!bbbb','new'),('D-BV-005','HW02 Vinh','AA1!BBBB','new'),('D-BV-006','HW02 Vinh','Aa!!bbbb','new'),('D-BV-007','HW02 Vinh','Aa12bbbb','new')]
fixture=None
for tc,name,pwd,typ in cases:
 register();email=f'dsupp-{run.lower()}-{tc.lower()}@example.com'
 if typ=='empty':email=''
 if typ=='bad':email=f'bad-{run.lower()}'
 if typ=='duplicate':email=fixture
 pre=count(email);fill([name,email,pwd]);shot(tc+'-before');before=text();click('Đăng Ký');time.sleep(.7);shot(tc+'-response');after=text();post=count(email)
 if 'OK' in after:click('OK');shot(tc+'-navigation')
 nav=text();log({'tc':tc,'kind':'ui_checkpoint','input':{'name':name,'email':email,'password':'[REDACTED]','password_length':len(pwd),'confirmation':'absent'},'before':before,'response_screen':after,'navigation':nav,'account_count_before':pre,'account_count_after':post,'http':'not captured; UI+readonly DB evidence','scope':'Independent checkpoint on existing fields; full designed confirmation setup Blocked','evidence':[tc+'-before.png',tc+'-response.png']})
 if tc=='D-DT-002':fixture=email
 print(tc,pre,post,'login' if 'Sign In' in nav else 'register',flush=True)
for tc in ['D-DT-012','D-DT-013']:
 register();shot(tc+'-missing-confirm');log({'tc':tc,'status':'Blocked','reason':'confirmation field absent','evidence':tc+'-missing-confirm.png'})
log({'kind':'completed','note':'No test accounts deleted; no password/token in evidence. Original full-case setup requires confirmation: do not promote partial UI observations to whole-case Pass.'})
print(out,flush=True)
