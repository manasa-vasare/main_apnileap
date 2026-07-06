const mongoose = require('mongoose');
const axios = require('axios');

class JiraCommunicationSkill {
  
  async execute(prompt, context) {
    const { userRole, auth, invalidateCache } = context;
    const pLower = prompt.toLowerCase();

    // 1. APPROVE TASK
    if (pLower.startsWith("approve ")) {
      if (userRole !== "Faculty Mentor" && userRole !== "Spoke Coordinator") {
         return { success: true, response: `🔒 **Access Denied:** Only Faculty Mentors can approve student deliverables.` };
      }
      const tKey = prompt.substring("approve ".length).trim().toUpperCase();
      
      const Submission = mongoose.model("Submission");
      const submission = await Submission.findOne({ taskId: tKey });
      if (!submission) return { success: true, response: `⚠️ I could not find a submitted deliverable for task **${tKey}**.` };
      
      submission.status = "Approved";
      submission.grade = "A";
      submission.feedback = "🤖 [Rovo Agent]: Approved by AI.";
      await submission.save();

      this.triggerJiraTransition(tKey, "done", auth);
      return { success: true, response: `✨ **Task Evaluated!**\n\nI graded **${tKey}** with an A and moved it to Done.` };
    }

    // 2. BLOCK TASK
    if (pLower.startsWith("block ")) {
      if (userRole !== "Student Developer" && userRole !== "Faculty Mentor") {
         return { success: true, response: `🔒 **Access Denied:** Only assigned Students or Faculty can flag a task as blocked.` };
      }
      const tKey = prompt.substring("block ".length).trim().toUpperCase();
      
      const MockTask = mongoose.model("MockTask");
      const dbTask = await MockTask.findOne({ key: tKey });
      if (dbTask) {
         dbTask.fields.status.name = "Blocked";
         await dbTask.save();
         if (invalidateCache) invalidateCache();
      }
      this.triggerJiraTransition(tKey, "blocked", auth);
      return { success: true, response: `🚨 **Task Blocked!**\n\nI have flagged **${tKey}** as Blocked. A notification will be sent.` };
    }

    // 3. ASSIGN TASK
    if (pLower.startsWith("assign me to ")) {
      if (userRole !== "Student Developer") {
         return { success: true, response: `🔒 **Access Denied:** Only Students can self-assign tasks.` };
      }
      const tKey = prompt.substring("assign me to ".length).trim().toUpperCase();
      
      const MockTask = mongoose.model("MockTask");
      const dbTask = await MockTask.findOne({ key: tKey });
      if (dbTask) {
         dbTask.fields.assignee = { accountId: "mock-student", displayName: "Student Developer", avatarUrls: { "48x48": "https://www.gravatar.com/avatar/"} };
         if (dbTask.fields.status.name === "To Do") dbTask.fields.status.name = "In Progress";
         await dbTask.save();
         if (invalidateCache) invalidateCache();
      }
      // Simulate JIRA assign
      if (auth && process.env.JIRA_DOMAIN) {
        try {
          await axios.put(`${process.env.JIRA_DOMAIN}/rest/api/2/issue/${tKey}`, { fields: { assignee: null } }, { headers: { Authorization: `Basic ${auth}` }});
        } catch (e) {}
      }
      return { success: true, response: `✨ **Assigned!**\n\nYou are now assigned to **${tKey}**. It has been automatically moved to In Progress. Happy coding!` };
    }
  }

  async triggerJiraTransition(tKey, targetStatus, auth) {
     if (!auth || !process.env.JIRA_DOMAIN) return;
     try {
       const trRes = await axios.get(`${process.env.JIRA_DOMAIN}/rest/api/2/issue/${tKey}/transitions`, { headers: { Authorization: `Basic ${auth}`, Accept: "application/json" } });
       const tr = trRes.data.transitions.find(t => t.name.toLowerCase() === targetStatus);
       if (tr) await axios.post(`${process.env.JIRA_DOMAIN}/rest/api/2/issue/${tKey}/transitions`, { transition: { id: tr.id } }, { headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } });
     } catch (e) {}
  }
}

module.exports = new JiraCommunicationSkill();
