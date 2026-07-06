const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function printUsers() {
  if (!MONGODB_URI) {
    console.log("No MONGODB_URI configured.");
    return;
  }
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI);
    const User = require("./models/User");
    const users = await User.find({}).sort({ role: 1, displayName: 1 });
    console.log(`\nFound ${users.length} users in the database:\n`);
    
    // Print header
    console.log(String("Name").padEnd(30) + " | " + String("Email").padEnd(30) + " | " + String("Role").padEnd(15) + " | " + String("Persona").padEnd(15) + " | Spoke ID");
    console.log("-".repeat(105));
    
    for (const user of users) {
      console.log(
        String(user.displayName || '').padEnd(30) + " | " + 
        String(user.email || '').padEnd(30) + " | " + 
        String(user.role || '').padEnd(15) + " | " + 
        String(user.persona || '').padEnd(15) + " | " + 
        String(user.spokeId || 'None')
      );
    }
  } catch (err) {
    console.error("Error reading users:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

printUsers();
