const fs = require('fs');

let app = fs.readFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', 'utf8');

// Fix Company 1 password autofill
app = app.replace(
  'password = "company1123"', 
  'password = "company1_123"'
);

// Fix Company 2 password autofill if exists
app = app.replace(
  'password = "company2123"', 
  'password = "company2_123"'
);

// Fix Company 3 password autofill if exists
app = app.replace(
  'password = "company3123"', 
  'password = "company3_123"'
);

fs.writeFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', app);
console.log('Fixed autofill passwords in App.jsx');
