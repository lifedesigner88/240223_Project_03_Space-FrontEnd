# EncoreSpaceApp (encorespace)

EncoreSpaceProject

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).

---

### 디렉터리 구조
```
project/
│
├── src/
│   ├── assets/                     # 정적 파일들 (이미지, 아이콘 등)
│   ├── components/                 # 재사용 가능한 Vue 컴포넌트
│   │   ├── common/                 # 공통 컴포넌트
│   │   ├── layout/                 # 레이아웃 관련 컴포넌트
│   │   └── shared/                 # 여러 모듈에서 사용되는 컴포넌트
│   ├── pages/                      # 페이지 컴포넌트
│   ├── routing/                    # Vue Router 설정
│   ├── services/                   # API 요청과 같은 비즈니스 로직 처리 서비스
│   ├── state/                      # Vuex 상태 관리 모듈
│   │   ├── modules/                # Vuex 모듈들
│   │   ├── actions.js              # 액션 타입 및 액션 생성자
│   │   ├── mutations.js            # 뮤테이션 타입 및 뮤테이션 핸들러
│   │   ├── getters.js              # Vuex 게터
│   │   └── store.js                # Vuex 스토어 생성 및 내보내기
│   ├── css/                        # 전역 스타일 시트 및 변수
│   │   ├── quasar.variables.scss   # Sass 변수
│   │   ├── mixins.scss             # Sass 믹스인
│   │   └── main.scss               # 전역 스타일시트
│   ├── utils/                      # 유틸리티 함수 및 도구
│   └── App.vue                     # 루트 컴포넌트
│
├── public/                         # 정적 파일 (index.html 등)
│
├── tests/                          # 테스트 파일들
│
├── node_modules/                   # npm 패키지들
│
├── .eslintrc.js                    # ESLint 설정 파일
├── .gitignore                      # Git 무시 파일
├── babel.config.js                 # Babel 설정 파일
├── package.json                    # 프로젝트 정보와 의존성 관리
└── README.md                       # 프로젝트 설명 및 문서
```
