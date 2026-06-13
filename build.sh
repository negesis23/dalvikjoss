#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=== 1. Building Frontend (Vite) ==="
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js build --config vite.config.server.js

echo "=== 2. Compiling Java Classes ==="
mkdir -p bin
ecj -d bin -cp libs/nanohttpd-dex.jar:libs/quickjs-android-java7-dex.jar src/java/com/dalvikjoss/*.java

echo "=== 3. Dexing Classes ==="
mkdir -p build
dx --dex --output=build/dalvikjoss.jar bin

echo "=== Build Completed Successfully ==="
