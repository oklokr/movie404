1. ui 라이브러리: material-ui
   https://mui.com/material-ui/getting-started/installation/

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @fontsource/roboto
npm install @mui/icons-material

2. Type Script는 미적용

3. Next js는 최종 프로젝트에 적용

4. build tool: vite

https://velog.io/@onnuri/reactreact-router-dom-v6

\***\* 폴더구조 \*\***

```
not500
├─ backend
│  ├─ settings.gradle
│  └─ src
│     └─ main
│        ├─ java
│        │  └─ com
│        │     └─ project
│        │        ├─ config
│        │        │  ├─ ApiResponseAspect.java
│        │        │  ├─ ServletInitializer.java
│        │        │  └─ WebConfig.java
│        │        ├─ controller
│        │        │  ├─ auth
│        │        │  │  └─ Login.java
│        │        │  └─ main
│        │        ├─ interceptor
│        │        ├─ model
│        │        │  ├─ ApiResponse.java
│        │        │  └─ UserDto.java
│        │        ├─ ProjectApplication.java
│        │        ├─ repository
│        │        │  └─ UserMapper.java
│        │        └─ service
│        │           └─ UserService.java
│        └─ resources
│           ├─ application.yml
│           ├─ logback-spring.xml
│           ├─ mybatis
│           │  └─ user.xml
│           └─ static
├─ front
│  ├─ .prettierrc
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ jsconfig.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  └─ sample.js
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ layout
│  │  │  ├─ content
│  │  │  │  └─ index.jsx
│  │  │  ├─ footer
│  │  │  │  └─ index.jsx
│  │  │  └─ header
│  │  │     └─ index.jsx
│  │  ├─ locales
│  │  │  ├─ en
│  │  │  │  └─ translationEN.json
│  │  │  ├─ i18n.js
│  │  │  └─ ko
│  │  │     └─ translationKO.json
│  │  ├─ main.jsx
│  │  ├─ page
│  │  │  ├─ 404
│  │  │  │  └─ index.jsx
│  │  │  ├─ auth
│  │  │  │  ├─ findId
│  │  │  │  ├─ findPw
│  │  │  │  ├─ login
│  │  │  │  │  └─ index.jsx
│  │  │  │  └─ singup
│  │  │  └─ main
│  │  ├─ routes
│  │  │  ├─ index.jsx
│  │  │  └─ pages
│  │  │     ├─ auth.jsx
│  │  │     └─ main.jsx
│  │  ├─ store
│  │  │  ├─ index.js
│  │  │  ├─ selectors.js
│  │  │  └─ slices
│  │  │     ├─ common.js
│  │  │     └─ user.js
│  │  └─ utils
│  │     ├─ auth.js
│  │     ├─ request.js
│  │     └─ validate.js
│  └─ vite.config.js
├─ git
│  ├─ merge-develop.sh
│  └─ merge-master.sh
├─ package-lock.json
├─ package.json
└─ README.md
```
