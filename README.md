# nest-typeorm-framework

## :books: nest-typeorm-framework
NestJS 프로그램을 작성할 때 TypeORM 를 사용하여 효율적으로 개발 할 수 있도록 공통 기능이 제공되는 framework 제작을 목적으로 합니다.

## :airplane: Overview
**위 framework 를 사용하면 아래와 같은 기능들이 포함되어 활용할 수 있습니다.**
* :white_check_mark: TypeORM 을 사용
* :white_check_mark: Production, stage, development 환경에 따른 config 사용
* :white_check_mark: passport-local, passport-jwt, Guards 를 통한 인증 처리
* :white_check_mark: 민감정보(비밀번호) 단방향 암호화
* :white_check_mark: Swagger 를 사용하여 API 문서 및 테스트 가능

## :helicopter: Getting Started
### Environment
* **Node.js 버전** - v16.14.2
* **데이터베이스** - MySQL v.8.0.28
* **개발 IDE** - Webstorm

### Configuration
:triangular_flag_on_post: src/.env 파일의 내용을 수정하여 서버의 실행 환경을 수정할 수 있습니다.
```  
  
# mysql DB 정보  
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=iu00
DATABASE_PASSWORD=q1w2e3!@
DATABASE_NAME=MANYSON
DATABASE_SYNCHRONIZE=true

### Installing
1. MySQL 를 설치하고 아래의 DDL를 실행하여 테이블을 생성
```mysql  
 CREATE TABLE `TB_USER` ( 
 `user_id` VARCHAR(64) NOT NULL COMMENT '아이디' COLLATE 'utf8mb4_unicode_ci',  
 `user_name` VARCHAR(64) NOT NULL COMMENT '이름' COLLATE 'utf8mb4_unicode_ci',  
 `password` VARCHAR(512) NOT NULL COMMENT '비밀번호' COLLATE 'utf8mb4_unicode_ci',  
 `salt` VARCHAR(512) NOT NULL COMMENT 'SALT' COLLATE 'utf8mb4_unicode_ci', PRIMARY KEY (`user_id`) USING BTREE )
  COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;  
```  
2. 모듈 설치 명령어
```  
 npm install
 ```  
3. node 실행
```  
 npm start
```
## :monorail: Swagger
1.  swagger 실행
```
	http://localhost:3000/api-docs/
```
 <img src="https://user-images.githubusercontent.com/18624766/164874848-cf3ccccd-83f5-4051-9911-6f8665f3a401.png" width="90%" height="90%">

2. JWT 설정
+ 아래의 API는  로그인  실행 후 응답 데이터의 값을 authorization Value에 설정하여야 정상 처리 됩니다.
    - 회원 조회
    - 회원 수정
    - 회원 삭제

 <img src="https://user-images.githubusercontent.com/18624766/164875936-99a9edc6-be94-4e13-86ed-0b47fcc3d969.png" width="85%" height="85%">

 <img src="https://user-images.githubusercontent.com/18624766/164877665-bf7855fa-93bb-43fa-8163-a644001d8e62.png" width="85%" height="85%">
   
## :package: Software architecture

###  소스 구성

|  디렉토리           | 내용 | 
|-------------------|--|
| auth | 인증 관련 처리 모듈, 컨트롤러, 서비스, DTO |
| common | 공통적으로 사용하는 함수 모듈 |
| config | 서버 실행시 필요한 configuration 사항 |
| constant | 상수 정보 |
| guard | guard 기능을 사는 컴포넌트 |
| middleware | middleware 컴포넌트 |
| strategy | strategy 컴포넌트 |
| swagger| API 문서를 만들기 위한 yaml 파일 |
| user | 사용자 관련 처리 모듈, 컨트롤러, 서비스, DTO |



## :man_in_tuxedo: Authors
- [iu00](https://github.com/manyson) - **Junghyun Kim** - <artjung77@gmail.com>


## :scroll: License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```  
MIT License  
  
Copyright (c) 2022 iu00  
  
Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.  
```
