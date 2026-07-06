const fs = require('fs');
const broken = fs.readFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', 'utf8');
const old = fs.readFileSync('C:/uni/main_apnileap/frontend/src/App.jsx', 'utf8');

// Find start of chunk in old
const oldStartIdx = old.indexOf('<button \n        onClick={() => setIsOpen(!isOpen)}');
// Find end of chunk in old
const oldEndStr = '<button\n                              onClick={() => onDeleteClick(proj)}';
const oldEndIdx = old.indexOf(oldEndStr, oldStartIdx);

if (oldStartIdx === -1 || oldEndIdx === -1) {
  console.log("Could not find start or end in old file!");
  process.exit(1);
}

const missingChunk = old.slice(oldStartIdx, oldEndIdx);

// Find splice point in broken
const brokenStartStr = '<>\n      \n                            <button\n                              onClick={() => onDeleteClick(proj)}';
const brokenSpliceIdx = broken.indexOf(brokenStartStr);

if (brokenSpliceIdx === -1) {
  console.log("Could not find splice point in broken file!");
  process.exit(1);
}

// Splice
const newFile = broken.slice(0, brokenSpliceIdx + 11) + missingChunk + broken.slice(brokenSpliceIdx + 11);
fs.writeFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', newFile);
console.log("File recovered!");
