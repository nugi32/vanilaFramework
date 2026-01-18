const fs = require('fs');
const path = require('path');

function ensureDir(dir : string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyJsonRecursive(src : string, dest : string) {
  ensureDir(dest);

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyJsonRecursive(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📦 Copied: ${srcPath} → ${destPath}`);
    }
  }
}

/**
 * Wrapper Task
 * @param {string} src
 * @param {string} dest
 * @param {string} label
 */
function copyJob(src : string, dest : string, label = null) {
  console.log(`\n=== 🚀 COPY JOB: ${label || src} ===`);
  console.log(`SRC  → ${src}`);
  console.log(`DEST → ${dest}`);

  ensureDir(src);
  ensureDir(dest);

  copyJsonRecursive(src, dest);
}

const SRC_USR = path.join(__dirname, '..', '..', 'artifacts', 'contracts', 'Counter.sol');
const DEST_USR = path.join(__dirname, '..', 'artifact');


console.log("\n📦=== START COPY CONTRACTS ===");

copyJob(SRC_USR, DEST_USR);

console.log("\n🎉 ALL TASK FINISHED!");
