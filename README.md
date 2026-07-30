# Team 3
**Notion 링크** : https://app.notion.com/p/019130e765d18369ba6f81c98d8a719b?v=135130e765d183d68eda08b0f9ec47b3

# 팀원 구성
김찬희(팀장)
김은진(부팀장)
김민수
문치호
이영주
조민성

___

# 프로젝트 소개
- 사용자가 직접 포토카드를 생성하고, 마켓플레이스에서 다른 사용자와 포토카드를 구매하거나 교환할 수 있는 디지털 포토카드 거래 서비스
- 프로젝트 기간 : 2026.07.08. ~ 2026.07.30.
  
___

# 기술 스택
- **Front-end** : Next.js, React, JavaScript, Tailwind Css, Tanstack Query, Vercel
- **Back-end** : Node.js, Express, Prisma, PostgreSQL, Zod, JWT/Cookie, Swagger, Render
  
___

# 팀원별 구현 기능 상세
<details>
  <summary>김민수/조민성</summary>

  - 마켓플레이스 공통 목록 페이지 구현
  - 검색, 필터, 정렬 UI 구현
  - 마이갤러리 카드 목록 구현
  - 나의 판매 포토카드 목록 구현
  - 무한 스크롤 / 페이지네이션 관련 UI 처리 
</details>

<details>
  <summary>김찬희/문치호</summary>

  - 마켓플레이스 상세 페이지 구현
  - 구매자/판매자 입장의 포토카드 상세 화면 구현
  - 판매 등록 모달 구현
  - 판매 정보 수정 모달 구현
  - 판매 내리기 기능 연동
  - 포토카드 구매 API 연동
  - 교환 제안 API 연동
  - 교환 승인/거절/취소 API 연동
</details>

<details>
  <summary>김은진</summary>

  - 랜덤 포인트 모달 구현
  - 포인트 획득 기능 구현
  - 알림 UI 구현
  - 알림 조회 및 읽음 처리 연동
  - 프로필 관련 모달 구현
</details>

<details>
  <summary>이영주</summary>

  - 랜딩 페이지 구현
  - 로그인/회원가입 페이지 구현
  - 마이갤러리 페이지 구현
  - 포토카드 생성 페이지 구현
  - 포토카드 생성 결과 페이지 구현
</details>
___

# 파일 구조
```txt
my-favorite-photo-fe-team3/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ (auth)/
│  │  │  ├─ login/
│  │  │  └─ signup/
│  │  │
│  │  └─ (main)/
│  │     ├─ gallery/
│  │     ├─ marketplace/
│  │     ├─ my-sales/
│  │     └─ _components/
│  │
│  ├─ common/
│  │  ├─ api/
│  │  ├─ components/
│  │  └─ utils/
│  │
│  ├─ features/
│  │  ├─ auth/
│  │  ├─ exchange/
│  │  ├─ notification/
│  │  ├─ ownership/
│  │  ├─ photocard/
│  │  ├─ point/
│  │  ├─ shopListing/
│  │  └─ user/
│  │
│  ├─ providers/
│  └─ styles/
│
├─ next.config.mjs
└─ package.json
```

___

# 구현 홈페이지
https://my-favorite-photo-fe-team3-silk.vercel.app/

___

# 프로젝트 회고록
