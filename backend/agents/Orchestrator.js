const ProjectCreationSkill = require('./skills/ProjectCreationSkill');
const JiraCommunicationSkill = require('./skills/JiraCommunicationSkill');
const TeamGradingSkill = require('./skills/TeamGradingSkill');
const MeetingSchedulingSkill = require('./skills/MeetingSchedulingSkill');

class OrchestratorAgent {
  constructor() {
    this.skills = [
      { name: "ProjectCreation", triggers: ["create project", "draft project"], agent: ProjectCreationSkill },
      { name: "JiraApprove", triggers: ["approve "], agent: JiraCommunicationSkill },
      { name: "JiraBlock", triggers: ["block ", "help with "], agent: JiraCommunicationSkill },
      { name: "JiraAssign", triggers: ["assign me to "], agent: JiraCommunicationSkill },
      { name: "TeamGrading", triggers: ["grade team "], agent: TeamGradingSkill },
      { name: "MeetingScheduling", triggers: ["schedule meeting "], agent: MeetingSchedulingSkill }
    ];
  }

  async processPrompt(prompt, context) {
    const pLower = prompt.toLowerCase();
    
    // Swarm logic: find the correct specialized sub-agent for the task
    for (const skill of this.skills) {
       for (const trigger of skill.triggers) {
          if (pLower.startsWith(trigger)) {
             console.log(`[Orchestrator] Delegating task to Sub-Agent: ${skill.name}`);
             return await skill.agent.execute(prompt, context);
          }
       }
    }
    
    // Fallback response if no sub-agent matches
    return { 
       success: true, 
       response: `I am the Rovo Orchestrator Agent. I analyzed your prompt but none of my specialized sub-agents could process it. Try asking me to "create project [Name]", "approve [Task]", or "schedule meeting [Title] on [Date]".` 
    };
  }
}

module.exports = new OrchestratorAgent();
