#!/data/data/com.termux/files/usr/bin/bash
PORT=${1:-8080}
echo "=== Starting DalvikJoss Server on Port $PORT ==="
exec dalvikvm -Djava.library.path=libs/lib/armeabi-v7a \
  -cp build/dalvikjoss.jar:libs/nanohttpd-dex.jar:libs/quickjs-android-java7-dex.jar \
  com.dalvikjoss.Main "$PORT"
