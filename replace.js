const fs = require('fs');
let app = fs.readFileSync('frontend/src/App.jsx', 'utf8');
app = app.split('"Backlog"').join('"To Do"');
app = app.split("'Backlog'").join("'To Do'");
app = app.split('col-backlog').join('col-to-do');
fs.writeFileSync('frontend/src/App.jsx', app);

let server = fs.readFileSync('backend/server.js', 'utf8');
server = server.split('"Backlog"').join('"To Do"');
server = server.split("'Backlog'").join("'To Do'");
fs.writeFileSync('backend/server.js', server);
console.log('Replaced Backlog with To Do');
