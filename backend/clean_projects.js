require("dotenv").config();
const mongoose = require("mongoose");
const CorporateProject = require("./models/CorporateProject");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");
  
  const titlesToDelete = [
    "Real-Time Sign Language Translator",
    "Edge AI Smart Agriculture System",
    "Automotive VLSI Controller Chip",
    "Cloud-Native Health Tracking API"
  ];
  
  const result = await CorporateProject.deleteMany({ title: { $in: titlesToDelete } });
  console.log(`Deleted ${result.deletedCount} seeded projects.`);
  
  process.exit(0);
}
run();
