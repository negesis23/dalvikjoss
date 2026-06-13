import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function run(cmd) {
  console.log(`> ${cmd}`);
  const shell = process.env.SHELL || '/system/bin/sh';
  execSync(cmd, { stdio: 'inherit', shell });
}

console.log("=== 1. Building Frontend (Vite) ===");
run("npx vite build");
run("npx vite build --config vite.config.server.js");

console.log("=== 2. Compiling Java Classes ===");
const binDir = path.resolve('bin');
if (!fs.existsSync(binDir)) fs.mkdirSync(binDir);
const cp = 'libs/nanohttpd-dex.jar:libs/quickjs-android-java7-dex.jar';
run(`ecj -d bin -cp ${cp} src/java/com/dalvikjoss/core/*.java src/java/com/dalvikjoss/web/*.java src/java/com/dalvikjoss/engine/*.java`);

console.log("=== 3. Dexing Classes ===");
const buildDir = path.resolve('build');
if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);
run("dx --dex --output=build/dalvikjoss.jar bin");

console.log("=== Build Completed Successfully ===");

