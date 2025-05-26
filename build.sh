#!/bin/bash

set -e

# Tomcat 경로 (공백 때문에 "" 필수)
TOMCAT_PATH="/c/Tomcat 10.1/webapps"
TOMCAT_BIN_PATH="/c/Tomcat 10.1/bin"
PROJECT_ROOT=$(pwd)

echo "⏹️ [0] Tomcat 종료 시도 (shutdown.bat)"
"$TOMCAT_BIN_PATH/shutdown.bat" || echo "⚠️ shutdown.bat 실행 실패 또는 이미 종료됨"

echo "⌛ Tomcat 종료 대기 (3초)..."
sleep 3

echo "🧨 [0-1] Tomcat 프로세스 강제 종료 시도 (java.exe)"
taskkill //F //IM java.exe || echo "⚠️ 실행 중인 Java 프로세스가 없거나 강제 종료 실패"

echo "🔧 [1] 프론트엔드 빌드 시작"
cd "$PROJECT_ROOT/front"
npm install
rm -rf dist
npm run build

if [ ! -d "dist" ]; then
  echo "❌ 프론트엔드 빌드 결과(dist)가 생성되지 않았습니다."
  exit 1
fi

echo "📦 [2] 빌드 결과 백엔드로 복사"
rm -rf "$PROJECT_ROOT/backend/src/main/resources/static/*"
cp -r dist/* "$PROJECT_ROOT/backend/src/main/resources/static/"

echo "🛠️ [3] 백엔드 WAR 빌드 시작"
cd "$PROJECT_ROOT/backend"
./mvnw.cmd clean package

WAR_FILE="$PROJECT_ROOT/backend/target/not404.war"

if [ -f "$WAR_FILE" ]; then
  echo "🧹 [4-0] 기존 WAR 및 exploded 디렉토리 삭제"
  rm -f "$TOMCAT_PATH/not404.war" || echo "⚠️ 기존 WAR 삭제 실패 (무시하고 진행)"
  rm -rf "$TOMCAT_PATH/not404" || echo "⚠️ exploded 디렉토리 삭제 실패 (무시하고 진행)"

  echo "🚀 [4] WAR 파일을 Tomcat으로 복사"
  cp -f "$WAR_FILE" "$TOMCAT_PATH/not404.war"
  echo "✅ 복사 완료: $WAR_FILE -> $TOMCAT_PATH/not404.war"
else
  echo "❌ WAR 파일이 존재하지 않습니다."
  exit 1
fi

echo "▶️ [5] Tomcat 시작 시도 (startup.bat)"
"$TOMCAT_BIN_PATH/startup.bat" || echo "⚠️ Tomcat 시작 실패. 수동으로 실행하세요."

echo "🎉 빌드 및 배포 완료! 브라우저에서 http://localhost:8080/not404/ 로 확인하세요."
