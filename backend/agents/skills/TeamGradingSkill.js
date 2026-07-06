const mongoose = require('mongoose');

class TeamGradingSkill {
  async execute(prompt, context) {
    const { userRole } = context;

    if (userRole !== "Corporate Sponsor" && userRole !== "Spoke Coordinator") {
       return { success: true, response: `🔒 **Access Denied:** Only Corporate Sponsors can evaluate final team projects.` };
    }
    
    // "grade team Alpha A"
    const parts = prompt.split(" ");
    const grade = parts.pop().toUpperCase();
    const teamName = parts.slice(2).join(" ");
    
    const Team = mongoose.model("Team");
    const team = await Team.findOne({ name: { $regex: new RegExp(teamName, "i") } });
    if (!team) return { success: true, response: `⚠️ I could not find a team named **${teamName}**.` };
    
    team.finalProgress.status = "Evaluated";
    team.finalProgress.companyGrade = grade;
    team.finalProgress.companyFeedback = "🤖 [Rovo Agent Swarm]: Excellent work. Auto-evaluated.";
    await team.save();
    
    return { success: true, response: `✨ **Team Graded!**\n\nTeam **${teamName}** has been assigned a final grade of **${grade}**.` };
  }
}

module.exports = new TeamGradingSkill();
