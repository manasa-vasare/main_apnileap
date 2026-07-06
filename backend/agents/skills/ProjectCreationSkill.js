const mongoose = require('mongoose');

class ProjectCreationSkill {
  async execute(prompt, context) {
    const { userRole, companyName, apiCache, invalidateCache } = context;

    if (userRole !== "Corporate Sponsor" && userRole !== "Spoke Coordinator") {
       return { success: true, response: `🔒 **Access Denied:** Only Corporate Sponsors or Spoke Coordinators can create new projects.` };
    }
    
    let title = prompt.replace(/create project/i, "").trim();
    
    const phases = [
      { name: "Phase 1: Planning & UI Design", description: "Define requirements, architecture, and UI mockups." },
      { name: "Phase 2: Backend Architecture", description: "Set up the server, database schemas, and core logic." },
      { name: "Phase 3: API Integration", description: "Connect frontend and backend, integrate third-party APIs." },
      { name: "Phase 4: Testing & QA", description: "Perform unit, integration, and user acceptance testing." },
      { name: "Phase 5: Deployment & Handover", description: "Deploy to production server and finalize documentation." }
    ];
    
    const CorporateProject = mongoose.model("CorporateProject");
    const newProj = new CorporateProject({
      company: companyName || "Rovo Auto Company",
      title: title,
      description: "AI Generated Scope for: " + title,
      budget: "$5,000",
      duration: "10 Weeks",
      status: "Pending Assignment",
      proposedDueDate: new Date(Date.now() + 10 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      phases: phases
    });
    
    await newProj.save();
    
    if (apiCache) {
        apiCache.moderatorProjects = null;
        apiCache.moderatorProjectsTime = 0;
    }
    if (invalidateCache) invalidateCache();
    
    return { success: true, response: `✨ **Project Created!**\n\nI have successfully drafted the project **"${title}"** and auto-generated 5 structured Agile phases for it.` };
  }
}

module.exports = new ProjectCreationSkill();
