const mongoose = require('mongoose');

class MeetingNotesAgent {
  async processNotes(meetingId) {
    const Meeting = mongoose.model("Meeting");
    const meeting = await Meeting.findOne({ id: meetingId });
    if (!meeting) return { success: false, message: "Meeting not found" };

    // Simulate an AI Agent reading the notes (e.g. from Read.ai or Copilot)
    // and extracting Action Items to auto-generate Jira epics/tasks
    
    // We will extract action items from the 'agenda' or a 'notes' field.
    const rawText = meeting.agenda || "";
    const actionItems = this.extractActionItems(rawText);
    
    if (actionItems.length === 0) {
       return { success: true, message: "No actionable items found in meeting notes." };
    }

    const MockTask = mongoose.model("MockTask");
    const generatedTasks = [];

    for (const item of actionItems) {
      const newTask = new MockTask({
        key: `AUTO-${Math.floor(Math.random() * 1000)}`,
        fields: {
          summary: item,
          status: { name: "To Do" },
          assignee: { displayName: "Unassigned" },
          priority: { name: "Medium" },
          description: "🤖 Auto-generated from Meeting Notes by Rovo AI Agent.",
          customfield_10020: [{ name: "Auto-Sprint" }]
        }
      });
      await newTask.save();
      generatedTasks.push(newTask.key);
    }
    
    meeting.actionItems = generatedTasks; // Save references
    await meeting.save();

    return { success: true, generated: generatedTasks, message: `Successfully generated ${generatedTasks.length} Jira tasks from meeting notes.` };
  }
  
  // A simple mock skill for parsing action items using regex/heuristics
  extractActionItems(text) {
    const actions = [];
    const lines = text.split("\n");
    for (const line of lines) {
       const lower = line.toLowerCase();
       if (lower.includes("action:") || lower.includes("todo:") || lower.includes("needs to") || lower.startsWith("- [ ]")) {
          let clean = line.replace(/action:/i, "").replace(/todo:/i, "").replace(/- \[ \]/, "").trim();
          if (clean) actions.push(clean);
       }
    }
    return actions;
  }
}

module.exports = new MeetingNotesAgent();
