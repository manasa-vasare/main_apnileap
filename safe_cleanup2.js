const fs = require('fs');
let app = fs.readFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', 'utf8');

const targetStr = `{isAssigned ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                              {/* Show each campus allocation as a badge */}
                              {(proj.allocations && proj.allocations.length > 0) ? (
                                proj.allocations.map(alloc => (
                                  <span key={alloc.targetCampusId} style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>
                                    {alloc.assignedTo}
                                  </span>
                                ))
                              ) : (
                                <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>{proj.assignedTo}</span>
                              )}
                              <span style={{
                                fontFamily: "var(--mono)",
                                fontSize: "11px",
                                fontWeight: "800",
                                color: proj.assignedKey ? "var(--primary)" : "#818cf8",
                                background: proj.assignedKey ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)",
                                padding: "2px 6px",
                                borderRadius: "4px"
                              }}>
                                {proj.allocations && proj.allocations.length > 1
                                  ? \`\${proj.allocations.filter(a => a.assignedKey).length} Jira Epics\`
                                  : (proj.assignedKey || "Awaiting Acceptance")}
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => onAssignClick(proj)}
                              className="btn-primary"
                              style={{
                                padding: "6px 12px",
                                fontSize: "12px",
                                borderRadius: "8px",
                                background: "var(--accent)",
                                borderColor: "transparent",
                                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
                                cursor: "pointer"
                              }}
                            >
                              Assign Project
                            </button>
                          )}`;

const replacementStr = `{isAssigned && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", marginBottom: "8px" }}>
                              {/* Show each campus allocation as a badge */}
                              {(proj.allocations && proj.allocations.length > 0) ? (
                                proj.allocations.map(alloc => (
                                  <span key={alloc.targetCampusId} style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>
                                    {alloc.assignedTo}
                                  </span>
                                ))
                              ) : (
                                <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>{proj.assignedTo}</span>
                              )}
                              <span style={{
                                fontFamily: "var(--mono)",
                                fontSize: "11px",
                                fontWeight: "800",
                                color: proj.assignedKey ? "var(--primary)" : "#818cf8",
                                background: proj.assignedKey ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)",
                                padding: "2px 6px",
                                borderRadius: "4px"
                              }}>
                                {proj.allocations && proj.allocations.length > 1
                                  ? \`\${proj.allocations.filter(a => a.assignedKey).length} Jira Epics\`
                                  : (proj.assignedKey || "Awaiting Acceptance")}
                              </span>
                            </div>
                          )}
                            <button
                              onClick={() => onAssignClick(proj)}
                              className="btn-primary"
                              style={{
                                padding: "6px 12px",
                                fontSize: "12px",
                                borderRadius: "8px",
                                background: "var(--accent)",
                                borderColor: "transparent",
                                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
                                cursor: "pointer"
                              }}
                            >
                              {isAssigned ? "+ Add Spoke" : "Assign Project"}
                            </button>`;

if (app.includes(targetStr)) {
  app = app.replace(targetStr, replacementStr);
  fs.writeFileSync('C:/uni/apn1/apnileap-final-main/frontend/src/App.jsx', app);
  console.log("Safe replacement succeeded!");
} else {
  console.log("Could not find exact string to replace.");
}
