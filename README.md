# Auth & Board API

NestJS 기반의 사용자 인증 및 게시판 관리 REST API 서버입니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [API 문서](#api-문서)
- [환경 설정](#환경-설정)
- [주요 기능 설명](#주요-기능-설명)

---

## 프로젝트 개요

이 프로젝트는 사용자 회원가입, 로그인 및 게시판 CRUD 기능을 제공하는 REST API 서버입니다. JWT 기반의 인증 시스템과 PostgreSQL 데이터베이스를 활용하여 안전한 사용자 관리와 게시물 관리를 지원합니다.

**프로젝트명**: day1  
**버전**: 0.0.1  
**라이선스**: UNLICENSED

---

## 주요 기능

### 🔐 인증 (Auth)

- 사용자 회원가입 (Sign Up)
- 사용자 로그인 (Sign In)
- JWT 기반 토큰 인증
- 사용자 정보 조회
- 사용자 정보 수정
- 비밀번호 해싱 (bcrypt)

### 📝 게시판 (Board)

- 게시물 생성
- 게시물 조회 (전체, 개별, 사용자별)
- 게시물 수정
- 게시물 삭제
- PUBLIC/PRIVATE 상태 관리
- 사용자별 게시물 격리

### 📚 추가 기능

- Swagger API 문서화
- TypeORM을 통한 데이터베이스 관리
- 자동 마이그레이션 지원 (개발 환경)
- 입력 값 검증 (class-validator)
- 설정 관리 (config 라이브러리)

---

## 기술 스택

### 백엔드 프레임워크

- **NestJS** ^11.0.1 - Progressive Node.js 프레임워크
- **Node.js** - JavaScript 런타임

### 데이터베이스

- **PostgreSQL** - 관계형 데이터베이스
- **TypeORM** ^0.3.28 - Node.js ORM

### 인증 & 보안

- **JWT (JSON Web Token)** - 토큰 기반 인증
- **Passport.js** - 인증 미들웨어
- **bcryptjs** - 비밀번호 암호화

### API 문서화

- **Swagger/OpenAPI** - API 문서 자동 생성

### 개발 도구

- **TypeScript** ^5.7.3 - 타입 안전 JavaScript
- **SWC** - 빠른 JavaScript/TypeScript 컴파일러
- **ESLint** & **Prettier** - 코드 린팅 및 포맷팅
- **Jest** - 단위 테스트 프레임워크

---

## 프로젝트 구조

```
project-root/
├── config/                          # 설정 파일
│   ├── default.yml                 # 기본 설정
│   ├── development.yml             # 개발 환경 설정
│   ├── production.yml              # 프로덕션 설정
│   └── config.example.md           # 설정 예제
│
├── src/                            # 소스 코드
│   ├── auth/                       # 인증 모듈
│   │   ├── dto/                   # 데이터 전송 객체
│   │   │   ├── auth-credentials.dto.ts      # 로그인/회원가입 DTO
│   │   │   ├── auth-res.dto.ts              # 인증 응답 DTO
│   │   │   ├── update-auth.dto.ts           # 사용자 정보 수정 DTO
│   │   │   └── user-res.dto.ts              # 사용자 응답 DTO
│   │   ├── entities/
│   │   │   └── user.entity.ts              # User 엔티티
│   │   ├── interfaces/
│   │   │   └── jwt-interface.ts            # JWT 페이로드 인터페이스
│   │   ├── auth.controller.ts              # 인증 컨트롤러
│   │   ├── auth.service.ts                 # 인증 비즈니스 로직
│   │   ├── auth.module.ts                  # 인증 모듈
│   │   ├── user.repository.ts              # User 리포지토리
│   │   ├── jwt.strategy.ts                 # JWT 전략
│   │   └── get-user.deco.ts                # 현재 사용자 데코레이터
│   │
│   ├── board/                      # 게시판 모듈
│   │   ├── dto/
│   │   │   ├── create-board.dto.ts         # 게시물 생성 DTO
│   │   │   └── get-board.dto.ts            # 게시물 응답 DTO
│   │   ├── entity/
│   │   │   └── board.entity.ts             # Board 엔티티
│   │   ├── pipe/
│   │   │   └── clg-check.pipe.ts           # 로깅 파이프
│   │   ├── board.controller.ts             # 게시판 컨트롤러
│   │   ├── board.service.ts                # 게시판 비즈니스 로직
│   │   ├── board.model.ts                  # 게시판 모델
│   │   ├── board.module.ts                 # 게시판 모듈
│   │   └── board.repository.ts             # Board 리포지토리
│   │
│   ├── app.module.ts               # 루트 모듈
│   └── main.ts                     # 애플리케이션 부트스트랩
│
├── test/                           # 테스트 파일
│
├── package.json                    # 프로젝트 의존성
├── tsconfig.json                   # TypeScript 설정
├── tsconfig.build.json             # 빌드용 TypeScript 설정
├── nest-cli.json                   # NestJS CLI 설정
└── README.md                       # 이 파일

```

---

## 설치 및 실행

### 필수 요구사항

- Node.js 18.0 이상
- PostgreSQL 12 이상
- npm | yarn | pnpm

### 1. 프로젝트 클론 및 의존성 설치

```bash
# 저장소 클론
git clone <repository-url>
cd day1

# 의존성 설치
pnpm install
```

### 2. 환경 설정

```bash
# 설정 파일 생성
cp config/default.yml.example config/default.yml
cp config/development.yml.example config/development.yml
cp config/production.yml.example config/production.yml
```

자세한 설정 방법은 [환경 설정](#환경-설정) 섹션을 참고하세요.

### 3. 데이터베이스 준비

```bash
# PostgreSQL에서 데이터베이스 생성
createdb day1_db
```

### 4. 개발 서버 실행

```bash
# 개발 모드 (핫 리로드 포함)
pnpm run start:dev

# 또는 일반 시작
pnpm run start

# 디버그 모드
pnpm run start:debug
```

서버가 정상 실행되면 다음 메시지가 출력됩니다:

```
[NestFactory] Starting Nest application...
app running on port 4001
```

### 5. 프로덕션 빌드 및 실행

```bash
# 빌드
pnpm run build

# 프로덕션 실행
pnpm run start:prod
```

---

## API 문서

서버 실행 후 Swagger UI를 통해 API 문서를 확인할 수 있습니다.

**URL**: `http://localhost:4001/api`

### 인증 엔드포인트

| 메서드 | 엔드포인트         | 설명                  |
| ------ | ------------------ | --------------------- |
| POST   | `/api/auth/signup` | 회원가입              |
| POST   | `/api/auth/signin` | 로그인                |
| GET    | `/api/auth/me`     | 현재 사용자 정보 조회 |
| PATCH  | `/api/auth/update` | 사용자 정보 수정      |

### 게시판 엔드포인트

| 메서드 | 엔드포인트       | 설명             |
| ------ | ---------------- | ---------------- |
| GET    | `/api/board`     | 전체 게시물 조회 |
| GET    | `/api/board/my`  | 내 게시물 조회   |
| GET    | `/api/board/:id` | 특정 게시물 조회 |
| POST   | `/api/board`     | 게시물 생성      |
| PATCH  | `/api/board/:id` | 게시물 수정      |
| DELETE | `/api/board/:id` | 게시물 삭제      |

---

## 환경 설정

### 설정 파일 구조

프로젝트는 `config` 라이브러리를 사용하여 환경별 설정을 관리합니다.

#### default.yml (기본 설정)

```yaml
server:
  port: 4001

db:
  type: 'postgres'
  port: 4000
  database: 'db_name'

jwt:
  expiresIn: 3600 # 1시간
```

#### development.yml (개발 환경)

```yaml
db:
  host: 'localhost'
  username: 'postgres'
  password: 'your_password'
  synchronize: true # 자동 테이블 생성

jwt:
  secret: 'your_secret_key'
```

#### production.yml (프로덕션)

```yaml
db:
  synchronize: false # 수동 마이그레이션 필수
```

### 환경 변수 설정

NODE_ENV를 통해 환경을 지정합니다:

```bash
# 개발 환경
NODE_ENV=development pnpm run start:dev

# 프로덕션 환경
NODE_ENV=production pnpm run start:prod
```

---

## 주요 기능 설명

### 🔐 인증 시스템

#### 회원가입 & 로그인

**요청 예시**:

```json
{
  "user": {
    "userName": "john_doe",
    "password": "password123"
  }
}
```

**검증 규칙**:

- 사용자명: 4~20자, 영문자/숫자만 가능
- 비밀번호: 4~20자, 영문자/숫자만 가능
- 비밀번호는 자동으로 bcrypt로 해싱됨

**응답 예시**:

```json
{
  "user": {
    "id": 1,
    "userName": "john_doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### JWT 인증

모든 보호된 엔드포인트는 Authorization 헤더의 Bearer 토큰이 필요합니다:

```
Authorization: Bearer <access_token>
```

#### 비밀번호 해싱

User 엔티티의 `@BeforeInsert()` 및 `@BeforeUpdate()` 훅에서 자동으로 비밀번호를 해싱합니다:

```typescript
async hashPassword() {
  if (!this.password) return;
  if (this.password.startsWith('$2')) return;  // 이미 해시된 경우 스킵
  this.password = await bcrypt.hash(this.password, 10);
}
```

---

### 📝 게시판 관리

#### 게시물 생성

**요청 예시**:

```json
{
  "board": {
    "title": "제목",
    "description": "설명",
    "status": "PUBLIC"
  }
}
```

**상태 (Status)**:

- `PUBLIC`: 모두 볼 수 있음
- `PRIVATE`: 작성자만 볼 수 있음
  - {{base_url}}/board/myboard : GET 을 통해 로그인 중인 사용자의 모든 게시물을 볼 수 있습니다.
  - {{base_url}}/board : GET 을 통해 PUBLIC 상태인 모든 게시물을 볼 수 있습니다.

#### 게시물 수정

부분 업데이트를 지원합니다:

- 수정할 필드만 요청 본문에 포함
- 빈 문자열 검증 적용

---

## 개발 및 테스트

### 린팅 및 포맷팅

```bash
# ESLint 실행 (자동 수정)
npm run lint

# Prettier 포맷팅
npm run format
```

### 테스트 실행

```bash
# 단위 테스트
npm run test

# 테스트 watch 모드
npm run test:watch

# 커버리지 리포트
npm run test:cov

# E2E 테스트
npm run test:e2e
```

---

## 기술적 주요 사항

### 아키텍처

- **모듈식 설계**: Auth, Board 모듈로 기능 분리
- **리포지토리 패턴**: 데이터 접근 로직 분리
- **DTO 활용**: 요청/응답 데이터 검증 및 변환
- **의존성 주입**: NestJS 내장 IoC 컨테이너 활용

### 보안

- **JWT 기반 인증**: Stateless 인증
- **비밀번호 해싱**: bcrypt 사용 (Salt rounds: 10)
- **입력 검증**: class-validator를 통한 엄격한 검증
- **패스워드 숨김**: User 엔티티의 `select: false` 옵션

### 데이터베이스 관계

```
User (1) ──────── (Many) Board
  ↑
  ├─ id (PK)
  ├─ userName (UNIQUE)
  └─ password

Board
  ├─ id (PK)
  ├─ title
  ├─ description
  ├─ status
  └─ user (FK → User.id)
```

---

## 문제 해결

### PostgreSQL 연결 실패

```bash
# PostgreSQL 상태 확인
sudo service postgresql status

# PostgreSQL 시작
sudo service postgresql start

# 데이터베이스 생성 확인
psql -U postgres -l
```

### 포트 충돌

```bash
# 4001 포트 사용 중인 프로세스 확인
lsof -i :4001

# config/development.yml 에서 포트 변경
server:
  port: 4002
```

### 데이터베이스 마이그레이션

개발 환경에서는 `synchronize: true` 설정으로 자동 마이그레이션이 수행됩니다.

프로덕션 환경에서는 수동 마이그레이션이 필요합니다:

```bash
npm run typeorm migration:generate
npm run typeorm migration:run
```

---

## 기여하기

1. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
2. 변경사항 커밋 (`git commit -m 'Add AmazingFeature'`)
3. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
4. Pull Request 생성

---

## 라이선스

UNLICENSED

---

## 문의

프로젝트 관련 질문이나 버그 리포트는 이슈를 등록해주세요.

---

**마지막 업데이트**: 2025년 11월
