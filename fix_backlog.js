const fs = require('fs');

let app = fs.readFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', 'utf8');

// Replace exact string matches
app = app.replace(/"Backlog"/g, '"To Do"');
app = app.replace(/>Backlog</g, '>To Do<');
app = app.replace(/=== "Backlog"/g, '=== "To Do"');

fs.writeFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', app);
console.log('Successfully changed Backlog to To Do in frontend');
