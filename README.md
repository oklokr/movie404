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
│     └─ main/
│        ├─ java/
│        │  └─ com/
│        │     └─ project/
│        │        ├─ config/
│        │        │  ├─ ApiResponseAspect.java
│        │        │  ├─ ServletInitializer.java
│        │        │  └─ WebConfig.java
│        │        ├─ controller/
│        │        │  ├─ auth/
│        │        │  │  ├─ Login.java
│        │        │  │  └─ Findpw.java
│        │        │  ├─ admin/
│        │        │  │  └─ MovieController.java
│        │        │  └─ main/
│        │        ├─ interceptor/
│        │        │  └─ AuthInterceptor.java
│        │        ├─ model/
│        │        │  ├─ ApiResponse.java
│        │        │  └─ UserDto.java
│        │        ├─ repository/
│        │        │  ├─ CommonMapper.java
│        │        │  ├─ MovieMapper.java
│        │        │  └─ UserMapper.java
│        │        ├─ service/
│        │        │  ├─ CommonService.java
│        │        │  ├─ MovieService.java
│        │        │  └─ UserService.java
│        │        └─ util/
│        │           └─ DateFormatUtil.java
│        └─ resources/
│           ├─ application.yml
│           ├─ logback-spring.xml
│           ├─ mybatis/
│           │  └─ user.xml
│           └─ static/
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
│     ├─ api/
│     │  ├─ admin.js
│     │  ├─ common.js
│     │  └─ sample.js
│     ├─ assets/
│     │  └─ react.svg
│     ├─ layout/
│     │  ├─ content/
│     │  │  └─ index.jsx
│     │  ├─ footer/
│     │  │  └─ index.jsx
│     │  ├─ header/
│     │  │  └─ index.jsx
│     │  └─ index.jsx
│     ├─ locales/
│     │  ├─ en/
│     │  │  └─ translationEN.json
│     │  ├─ i18n.js
│     │  └─ ko/
│     │     └─ translationKO.json
│     ├─ main.jsx
│     ├─ page/
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
│     ├─ routes/
│     │  ├─ index.jsx
│     │  └─ pages/
│     │     ├─ admin.jsx
│     │     ├─ auth.jsx
│     │     ├─ community.jsx
│     │     ├─ main.jsx
│     │     └─ ... (기타 라우트)
│     ├─ store/
│     │  ├─ index.js
│     │  ├─ selectors.js
│     │  └─ slices/
│     │     ├─ common.js
│     │     └─ user.js
│     └─ utils/
│        ├─ auth.js
│        ├─ request.js
│        └─ validate.js
└─ .vscode/
   └─ settings.json
```
