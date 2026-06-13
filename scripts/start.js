import { execSync } from 'child_process';
import path from 'path';

const port = process.argv[2] || 8080;
console.log(`=== Starting DalvikJoss Server on Port ${port} ===`);

const cp = 'build/dalvikjoss.jar:libs/nanohttpd-dex.jar:libs/quickjs-android-java7-dex.jar';
const cmd = `dalvikvm -Djava.library.path=libs/lib/armeabi-v7a -cp ${cp} com.dalvikjoss.Main ${port}`;

console.log(`> ${cmd}`);
const shell = process.env.SHELL || '/system/bin/sh';
execSync(cmd, { stdio: 'inherit', shell });

