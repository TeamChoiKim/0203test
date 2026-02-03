from fastapi import FastAPI, Response, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from db import findOne, findAll, save
from settings import settings
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
import urllib.parse
import base64
import uuid


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.react_url,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginModel(BaseModel):
    email: str
    pwd: str

class SignupModel(BaseModel):
    name: str
    email: str
    pwd: str
    gender: bool

def base64Decode(data):
  encoded = urllib.parse.unquote(data)
  return base64.b64decode(encoded).decode("utf-8")

SECRET_KEY="your-extremely-secure-random-secret-key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def set_token(no: int, email: str):
    try:
        iat = datetime.now(timezone.utc) + (timedelta(hours=7))         # Claim설정
        exp = iat + (timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        data = {
            "email": email,
            "iss": "EDU",
            "sub": str(no),
            "iat": iat,
            "exp": exp
        }
        id = uuid.uuid4().hex
        token = jwt.encode(data, SECRET_KEY, ALGORITHM)
        sql = f'''
            INSERT INTO test.login
            (`uuid`,`token`)
            VALUE
            ('{id}','{token}')
            ;
            '''
        if save(sql): return id
    except JWTError as e:
        print(f"JWT ERROR : {e}")
    return None

@app.get("/getList")
def read_root():
    sql = f'''
    select b.`no`, b.`title`, u.`name`
    from `test`.`board` as b
    inner Join `test`.`user` as u
    on(b.`user_email` = u.email)
    where b.`delYn` = 0;
    '''
    data = findAll(sql)
    return {"status": True, "boardList" : data}

class boardModel(BaseModel):
    params:str = Field(..., title="게시글넘버", description="게시글넘버 입니다.")

@app.post("/boardview")
def boardview(item : boardModel, req: Request):
    sql = f'''
    select b.`title`, u.`name`, b.`content`, b.`user_email`
    from `test`.`board` as b
    inner Join `test`.`user` as u
    on(b.`user_email` = u.email)
    where (b.`no` = {item.params});
    '''
    data = findOne(sql)

    uuid = req.cookies.get('user')
    
    log_sql = f'''
    select `token` from `test`.`login`
    where `test`.`login`.`uuid` = '{uuid}'
    '''
    idData = findOne(log_sql)
    print(idData)
    result = jwt.decode(idData["token"], SECRET_KEY, algorithms=ALGORITHM)
    return {"status": True, "boardData": data, "login": result}

@app.post("/boardDel")
def boardDel(item:boardModel):
    sql = f'''
    UPDATE `test`.`board`
    SET `delYn` = 1
    where (`no` = {item.params});
    '''
    save(sql)

@app.post("/login")
def login(loginmodel: LoginModel, response: Response):
    print(loginmodel)
    sql = settings.login_sql.replace("{email}", loginmodel.email).replace("{pwd}", loginmodel.pwd)
    data = findOne(sql)
    if data:
        access_token = set_token(data["no"], data["email"])
        print(access_token)
        response.set_cookie(
        key="user",
        value=access_token,
        max_age=3600,        
        expires=3600,        
        path="/",
        secure=False,            # HTTPS에서만 전송
        httponly=True,          # JS 접근 차단 (⭐ 보안 중요)
        samesite="lax",         # 'lax' | 'strict' | 'none'
      )
        return {"status": True, "msg": f"{data["name"]}님 안녕하세요."}
    else: 
        return {"status": False, "msg": "로그인 실패"}
    


@app.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="user",
        path="/",
        secure=False,  
        httponly=True,
        samesite="lax",
    )

    return {"status": True, "msg": "로그아웃 완료"}

@app.post("/signup")
def signup(response: Response,signupmodel: SignupModel):
    check_sql = settings.check_sql.replace("{email}",signupmodel.email)
    existing_user = findOne(check_sql)
    if existing_user:
        return {"status": False, "msg": "이미 사용 중인 이메일입니다."}
    sql = settings.signup_sql.replace("{name}",signupmodel.name).replace("{email}",signupmodel.email).replace("{pwd}",signupmodel.pwd).replace("{gender}",str(int(signupmodel.gender)))
    save(sql)
    new_user=findOne(check_sql)
    if new_user:
        access_token = set_token(new_user["no"], new_user["email"])
        print(access_token)
        response.set_cookie(
        key="user",
        value=access_token,
        max_age=3600,        
        expires=3600,        
        path="/",
        secure=False,            
        httponly=True,        
        samesite="lax",         
      )
        return {"status": True, "msg": f"회원가입에 성공했습니다. {new_user["name"]}님 안녕하세요."}
    return {"status": False, "msg": "회원 가입 중 오류가 발생했습니다."}

class boardModel(BaseModel):
    title: str
    content: str

@app.post("/boardadd")
def boardadd(boardmodel:boardModel, request:Request):
    token = request.cookies.get("user")
    print(f"받은 토큰: {token}")
    if not token:
        return {"status": False, "msg": "로그인 안됨"}
    try:
        info = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = info.get("email")

        sql =  f"""
            INSERT INTO test.board (`user_email`,`title`,`content`)
            VALUES ('{user_email}','{boardmodel.title}','{boardmodel.content}');
            """
        save(sql)
        return {"status" : True }

    except JWTError as e :
        print(f"실패원인: {e}")
        return {"status": False, "msg": "안되잖아"}
