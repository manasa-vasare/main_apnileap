const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
const MONGODB_URI = process.env.MONGODB_URI;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

async function cleanJira() {
  if (!JIRA_DOMAIN || JIRA_DOMAIN === "undefined" || !JIRA_DOMAIN.startsWith("http")) {
    console.log("No valid JIRA_DOMAIN configured. Skipping Jira clean.");
    return;
  }
  console.log(`Connecting to Jira at ${JIRA_DOMAIN}...`);
  try {
    const searchUrl = `${JIRA_DOMAIN}/rest/api/3/search/jql?jql=project = AK OR project = PNLP&maxResults=100`;
    const response = await axios.get(searchUrl, { headers });
    const issues = response.data.issues || [];
    console.log(`Found ${issues.length} issues in Jira.`);
    
    for (const issue of issues) {
      console.log(`Deleting Jira issue ID: ${issue.id}`);
      try {
        await axios.delete(`${JIRA_DOMAIN}/rest/api/3/issue/${issue.id}`, { headers });
        console.log(`Successfully deleted Jira issue ID: ${issue.id}`);
      } catch (err) {
        console.error(`Failed to delete issue ID ${issue.id}:`, err.response ? err.response.data : err.message);
      }
    }
  } catch (err) {
    console.error("Error querying Jira issues:", err.response ? err.response.data : err.message);
  }
}

async function cleanMongo() {
  if (!MONGODB_URI) {
    console.log("No MONGODB_URI configured. Skipping MongoDB clean.");
    return;
  }
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB. Clearing all collections except User...");
    
    const MockTask = require("./models/MockTask");
    const Team = require("./models/Team");
    const Meeting = require("./models/Meeting");
    const Submission = require("./models/Submission");
    const CorporateProject = require("./models/CorporateProject");
    
    const resTasks = await MockTask.deleteMany({});
    console.log(`Deleted ${resTasks.deletedCount} documents from MockTask.`);

    const resTeams = await Team.deleteMany({});
    console.log(`Deleted ${resTeams.deletedCount} documents from Team.`);

    const resMeetings = await Meeting.deleteMany({});
    console.log(`Deleted ${resMeetings.deletedCount} documents from Meeting.`);

    const resSubmissions = await Submission.deleteMany({});
    console.log(`Deleted ${resSubmissions.deletedCount} documents from Submission.`);

    const resCorpProjs = await CorporateProject.deleteMany({});
    console.log(`Deleted ${resCorpProjs.deletedCount} documents from CorporateProject.`);
  } catch (err) {
    console.error("Error clearing MongoDB:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

async function run() {
  await cleanJira();
  await cleanMongo();
  console.log("Database reset complete!");
}

run();
