const mongoose = require('mongoose');

class MeetingSchedulingSkill {
  async execute(prompt, context) {
    const { userRole, campusId } = context;

    if (userRole === "Student Developer") {
       return { success: true, response: `🔒 **Access Denied:** Only Moderators and Faculty can schedule official syncs via Rovo.` };
    }
    
    const onSplit = prompt.split(" on ");
    if (onSplit.length < 2) {
       return { success: true, response: `⚠️ **Missing Data:** Please specify a date and time. Example: schedule meeting Sprint Review on 2024-10-15 at 10:00` };
    }
    let title = onSplit[0].replace(/schedule meeting/i, "").trim();
    let targetCampusId = campusId || "3";
    
    const forMatch = title.match(/ for (KLE|COEP|MMCOEP|RIT)/i);
    if (forMatch) {
       const spokeName = forMatch[1].toUpperCase();
       if (spokeName === "KLE") targetCampusId = "3";
       if (spokeName === "COEP") targetCampusId = "101";
       if (spokeName === "MMCOEP") targetCampusId = "102";
       if (spokeName === "RIT") targetCampusId = "103";
       title = title.replace(forMatch[0], "").trim();
    }
    
    const atSplit = onSplit[1].split(" at ");
    const date = atSplit[0].trim();
    const time = atSplit[1] ? atSplit[1].trim() : "10:00";
    
    const Meeting = mongoose.model("Meeting");
    const newMeeting = new Meeting({
      id: `meet-${Date.now()}`,
      title,
      campusId: targetCampusId,
      date,
      time,
      link: `https://meet.jit.si/Rovo-Sync-${Date.now().toString().slice(-5)}`,
      agenda: "Automated Rovo Sync.",
      cadenceType: "General Sync"
    });
    await newMeeting.save();
    
    return { success: true, response: `✨ **Meeting Scheduled!**\n\nI have successfully scheduled **"${title}"** on **${date}** at **${time}**.\n\nThe auto-generated Jitsi Meet link has been added to the calendar.` };
  }
}

module.exports = new MeetingSchedulingSkill();
