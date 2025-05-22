1. ui 라이브러리: material-ui
   https://mui.com/material-ui/getting-started/installation/

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @fontsource/roboto
npm install @mui/icons-material

2. Type Script는 미적용

3. Next js는 최종 프로젝트에 적용

4. build tool: vite

5. !주의 # 확장 Run on Save 필수 설치

https://velog.io/@onnuri/reactreact-router-dom-v6

\***\* 폴더구조 \*\***

```
not404/
├─ .gitignore
├─ README.md
├─ setting.env
├─ run-dev.bat
├─ temp/
│  ├─ create.sql
│  └─ sample.sql
├─ git/
│  ├─ merge-develop.sh
│  └─ merge-master.sh
├─ backend/
│  ├─ build.gradle
│  ├─ gradlew
│  ├─ gradlew.bat
│  ├─ HELP.md
│  ├─ .classpath
│  ├─ .gitattributes
│  ├─ .gitignore
│  ├─ .project
│  └─ src/
│     ├─ main/
│     │  ├─ java/
│     │  │  └─ com/
│     │  │     └─ project/
│     │  │        ├─ config/         # 스프링 설정 (PortOneConfig 등)
│     │  │        ├─ controller/     # REST API 컨트롤러 (auth, admin, main 등 하위폴더)
│     │  │        ├─ interceptor/    # 인터셉터
│     │  │        ├─ model/          # DTO, VO, Entity 클래스
│     │  │        ├─ repository/     # MyBatis Mapper 인터페이스
│     │  │        ├─ service/        # 비즈니스 로직 서비스
│     │  │        ├─ util/           # 유틸리티 클래스
│     │  │        └─ scheduler/      # 배치/스케줄러 및 TMDB 관련
│     │  │           ├─ dto/
│     │  │           │  ├─ response/
│     │  │           │  └─ ...
│     │  │           ├─ MovieBatchService.java
│     │  │           ├─ TMDBClient.java
│     │  │           └─ TMDBScheduler.java
│     │  └─ resources/
│     │     ├─ application.yml
│     │     ├─ logback-spring.xml
│     │     ├─ mybatis/
│     │     │  ├─ user.xml
│     │     │  ├─ movie.xml
│     │     │  └─ ... (기타 매퍼)
│     │     └─ static/
│     └─ test/
│        └─ java/
│           └─ com/
│              └─ project/
│                 └─ ... (테스트 코드)
├─ front/
│  ├─ .gitignore
│  ├─ .prettierrc
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ jsconfig.json
│  ├─ package.json
│  ├─ README.md
│  ├─ vite.config.js
│  ├─ public/
│  │  └─ vite.svg
│  └─ src/
│     ├─ api/                # API 호출 함수 (admin.js, common.js 등)
│     ├─ assets/             # 이미지, 폰트 등 정적 리소스
│     ├─ component/          # 공통 컴포넌트 (popupProvider, popupContainer 등)
│     ├─ layout/             # 레이아웃(Header, Footer, Content 등)
│     │  ├─ content/
│     │  ├─ footer/
│     │  ├─ header/
│     │  └─ index.jsx
│     ├─ locales/            # 다국어(i18n)
│     │  ├─ en/
│     │  ├─ ko/
│     │  └─ i18n.js
│     ├─ main.jsx
│     ├─ page/               # 페이지별 폴더
│     │  ├─ 404/
│     │  │  └─ index.jsx
│     │  ├─ admin/
│     │  │  ├─ movie/
│     │  │  │  ├─ component/
│     │  │  │  │  ├─ detail.jsx
│     │  │  │  │  └─ edit.jsx
│     │  │  │  └─ index.jsx
│     │  │  ├─ play.jsx
│     │  │  ├─ user/
│     │  │  │  ├─ component/
│     │  │  │  │  └─ detail.jsx
│     │  │  │  └─ index.jsx
│     │  │  └─ index.jsx
│     │  ├─ auth/
│     │  │  ├─ findId/
│     │  │  │  └─ index.jsx
│     │  │  ├─ findPw/
│     │  │  │  └─ index.jsx
│     │  │  ├─ login/
│     │  │  │  └─ index.jsx
│     │  │  └─ signup/
│     │  │     └─ index.jsx
│     │  ├─ community/
│     │  │  ├─ faq.jsx
│     │  │  ├─ notice.jsx
│     │  │  └─ qna/
│     │  │     ├─ component/
│     │  │     │  ├─ detail.jsx
│     │  │     │  └─ edit.jsx
│     │  │     ├─ index.jsx
│     │  │     └─ write.jsx
│     │  ├─ main/
│     │  │  ├─ index.jsx
│     │  │  └─ reservation.jsx
│     │  └─ ... (기타 페이지)
│     ├─ routes/             # 라우트 정의
│     │  ├─ index.jsx
│     │  └─ pages/
│     │     ├─ admin.jsx
│     │     ├─ auth.jsx
│     │     ├─ community.jsx
│     │     ├─ main.jsx
│     │     └─ ... (기타 라우트)
│     ├─ store/              # 상태관리(Redux 등)
│     │  ├─ index.js
│     │  ├─ selectors.js
│     │  └─ slices/
│     │     ├─ common.js
│     │     └─ user.js
│     └─ utils/              # 유틸 함수 (auth.js, request.js, validate.js 등)
├─ logs/
│  ├─ batch.2025-05-19.log
│  ├─ batch.2025-05-20.log
│  ├─ batch.2025-05-21.log
│  └─ batch.log
```
