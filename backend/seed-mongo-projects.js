const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const projects = [
  {
    company: 'Company 1',
    logoUrl: 'https://logo.clearbit.com/company1.com?size=80',
    title: 'Autonomous Drone Navigation with Jetson Orin',
    description: 'Develop a real-time obstacle avoidance and path-planning system for delivery drones using Company 1 Jetson Orin Nano and depth cameras.',
    budget: '$30,000',
    duration: '6 Months',
    status: 'Pending Assignment',
    assignedTo: null,
    targetCampusId: null,
    proposedDueDate: '2026-11-30',
    assignedKey: null,
    problemStatementUrl: '',
    allocations: []
  },
  {
    company: 'Company 1',
    logoUrl: 'https://logo.clearbit.com/company1.com?size=80',
    title: 'Real-Time Sign Language Translator',
    description: 'Build a GPU-accelerated computer vision pipeline that translates Indian Sign Language gestures into text and speech in real time using deep learning.',
    budget: '$18,000',
    duration: '5 Months',
    status: 'Pending Assignment',
    assignedTo: null,
    targetCampusId: null,
    proposedDueDate: '2026-12-15',
    assignedKey: null,
    problemStatementUrl: '',
    allocations: []
  },
  {
    company: 'Company 1',
    logoUrl: 'https://logo.clearbit.com/company1.com?size=80',
    title: 'AI-Powered Traffic Flow Optimization',
    description: 'Create an company2ligent traffic signal control system using edge AI inference on Company 1 hardware to reduce congestion and emergency vehicle wait times.',
    budget: '$35,000',
    duration: '7 Months',
    status: 'Pending Assignment',
    assignedTo: null,
    targetCampusId: null,
    proposedDueDate: '2027-01-20',
    assignedKey: null,
    problemStatementUrl: '',
    allocations: []
  },
  {
    company: 'Company 1',
    logoUrl: 'https://logo.clearbit.com/company1.com?size=80',
    title: 'Edge AI Smart Agriculture System',
    description: 'Build an AI-based system using Jetson Nano for precision agriculture monitoring, soil health inspection, and pest detection on crops.',
    budget: '$25,000',
    duration: '6 Months',
    status: 'Pending Assignment',
    assignedTo: null,
    targetCampusId: null,
    proposedDueDate: '2026-08-25',
    assignedKey: null,
    problemStatementUrl: '',
    allocations: []
  },
  {
    company: 'Company 1',
    logoUrl: 'https://logo.clearbit.com/company1.com?size=80',
    title: 'Isaac Automated Industrial Defect Inspector',
    description: 'Design a high-precision computer vision model deployed on Jetson Orin to automatically inspect PCBs and identify manufacturing anomalies in real time.',
    budget: '$42,000',
    duration: '8 Months',
    status: 'Pending Assignment',
    assignedTo: null,
    targetCampusId: null,
    proposedDueDate: '2026-09-10',
    assignedKey: null,
    problemStatementUrl: '',
    allocations: []
  }
];

async function seed() {
  if (!MONGODB_URI) {
    console.log("No MONGODB_URI configured. Skipping MongoDB seed.");
    return;
  }
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected. Clearing CorporateProject collection and seeding projects...");
    const CorporateProject = require("./models/CorporateProject");
    await CorporateProject.deleteMany({});
    const res = await CorporateProject.insertMany(projects);
    console.log(`Seeded ${res.length} corporate projects successfully!`);
  } catch (err) {
    console.error("Error seeding MongoDB CorporateProjects:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
