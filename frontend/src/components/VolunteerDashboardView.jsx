import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Target, 
  Clock, 
  ChevronRight, 
  CheckCircle,
  Briefcase,
  Calendar,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

function VolunteerDashboardView({ activeWorkspace }) {
  const [loading, setLoading] = useState(true);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);

  useEffect(() => {
    // In a real scenario, this would fetch from a /api/volunteer/projects endpoint
    // For now, we simulate fetching projects
    setTimeout(() => {
      setAssignedProjects([
        { id: 1, title: 'AI Recommendation Engine', company: 'TechCorp', status: 'In Progress', students: 4 }
      ]);
      setAvailableProjects([
        { id: 2, title: 'Mobile Banking App', company: 'FinServe', students: 3 },
        { id: 3, title: 'Healthcare Portal', company: 'HealthPlus', students: 5 }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
        <div style={{ width: "32px", height: "32px", border: "3px solid rgba(99,102,241,0.2)", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 12px", animation: "spin 0.8s linear infinite" }} />
        <p>Loading Volunteer Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ 
        background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.05))", 
        border: "1px solid var(--border-glass)", 
        padding: "24px", 
        borderRadius: "16px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between"
      }}>
        <div>
          <h2 style={{ margin: "0 0 8px 0", color: "var(--text-main)", fontSize: "24px" }}>
            Welcome, Volunteer Mentor! 👋
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14px", maxWidth: "600px", lineHeight: "1.5" }}>
            Thank you for dedicating your time to guide student teams. Here you can track the projects you are mentoring and browse new opportunities to share your expertise.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        
        {/* Left Column: Mentoring Projects */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Briefcase size={18} className="text-primary" /> Active Mentorships
          </h3>
          
          {assignedProjects.length > 0 ? assignedProjects.map(proj => (
            <div key={proj.id} style={{ 
              background: "var(--bg-card)", 
              border: "1px solid var(--border-glass)", 
              borderRadius: "12px", 
              padding: "20px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                    {proj.company}
                  </div>
                  <h4 style={{ margin: 0, color: "var(--text-main)", fontSize: "17px" }}>{proj.title}</h4>
                </div>
                <div style={{ 
                  background: "rgba(16, 185, 129, 0.1)", 
                  color: "#10b981", 
                  padding: "4px 10px", 
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  height: "fit-content"
                }}>
                  {proj.status}
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "24px", color: "var(--text-muted)", fontSize: "13px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Users size={14}/> {proj.students} Students</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Target size={14}/> 4 Milestones</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={14}/> Next Sync: Tomorrow</span>
              </div>
            </div>
          )) : (
            <div style={{ padding: "30px", textAlign: "center", border: "1px dashed var(--border-glass)", borderRadius: "12px", color: "var(--text-muted)", fontSize: "14px" }}>
              You are not actively mentoring any projects right now. Browse available projects to get started!
            </div>
          )}
        </div>

        {/* Right Column: Available Projects */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={18} className="text-primary" /> Opportunities
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {availableProjects.map(proj => (
              <div key={proj.id} style={{ 
                background: "var(--bg-card)", 
                border: "1px solid var(--border-glass)", 
                borderRadius: "10px", 
                padding: "16px",
                cursor: "pointer",
                transition: "border-color 0.2s"
              }} onMouseOver={e => e.currentTarget.style.borderColor = "var(--primary)"} onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-glass)"}>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>{proj.company}</div>
                <div style={{ fontWeight: "600", color: "var(--text-main)", fontSize: "14px", marginBottom: "8px" }}>{proj.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{proj.students} Students Need Help</span>
                  <button style={{ 
                    background: "none", 
                    border: "none", 
                    color: "var(--primary)", 
                    fontSize: "12px", 
                    fontWeight: "600", 
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    Details <ChevronRight size={12}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default VolunteerDashboardView;
