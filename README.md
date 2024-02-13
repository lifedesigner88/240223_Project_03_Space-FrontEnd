# space_front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## [설치 메뉴얼]
vue 설치
```
npm install -g vue
```
Vue CLI 설치
```
npm uninstall vue-cil -g
npm install -g @vue/cli
```
node_module 이 있다면 삭제하고 다시 받기
```
npm i
```
디렉터리 구조
```
project/
│
├── src/
│   ├── assets/                 # 정적 파일들 (이미지, 아이콘 등)
│   ├── components/             # 재사용 가능한 Vue 컴포넌트
│   │   ├── common/             # 공통 컴포넌트
│   │   ├── layout/             # 레이아웃 관련 컴포넌트
│   │   └── shared/             # 여러 모듈에서 사용되는 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   ├── routing/                # Vue Router 설정
│   ├── services/               # API 요청과 같은 비즈니스 로직 처리 서비스
│   ├── state/                  # Vuex 상태 관리 모듈
│   │   ├── modules/            # Vuex 모듈들
│   │   ├── actions.js          # 액션 타입 및 액션 생성자
│   │   ├── mutations.js        # 뮤테이션 타입 및 뮤테이션 핸들러
│   │   ├── getters.js          # Vuex 게터
│   │   └── store.js            # Vuex 스토어 생성 및 내보내기
│   ├── styles/                 # 전역 스타일 시트 및 변수
│   │   ├── variables.scss      # Sass 변수
│   │   ├── mixins.scss         # Sass 믹스인
│   │   └── main.scss           # 전역 스타일시트
│   ├── utils/                  # 유틸리티 함수 및 도구
│   └── App.vue                 # 루트 컴포넌트
│
├── public/                     # 정적 파일 (index.html 등)
│
├── tests/                      # 테스트 파일들
│
├── node_modules/               # npm 패키지들
│
├── .eslintrc.js                # ESLint 설정 파일
├── .gitignore                  # Git 무시 파일
├── babel.config.js             # Babel 설정 파일
├── package.json                # 프로젝트 정보와 의존성 관리
└── README.md                   # 프로젝트 설명 및 문서
```