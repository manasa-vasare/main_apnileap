const fs = require('fs');
let app = fs.readFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', 'utf8');

// Remove Fast Switch
const regex = /\{\/\* DEMO FAST SWITCH DROPDOWN \*\/\}[\s\S]*?<\/select>/;
app = app.replace(regex, '');

// Re-apply Moderator changes WITHOUT using greedy regex!
// Instead of replacing from `<button` to `onEditClick`, we'll find `onEditClick` and replace its exact button block.
const editBtnRegex = /<button[\s\n]*onClick=\{\(\) => onEditClick\(proj\)\}[\s\S]*?<\/button>/;
app = app.replace(editBtnRegex, '');

// Re-apply the Assignment multi-spoke logic:
// We want to change:
// {isAssigned ? (
//   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
// ...
//   </div>
// ) : (
//   <button ... onClick={() => onAssignClick(proj)} ... Assign Project </button>
// )}
//
// To:
// {isAssigned && (
//   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
// ...
//   </div>
// )}
// <button ... onClick={() => onAssignClick(proj)} ... {isAssigned ? "+ Add Spoke" : "Assign Project"} </button>

// I will just use `replace_file_content` block by block, or a precise string match instead of regex!

fs.writeFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', app);
console.log('Fast Switch & Edit Button removed safely!');
