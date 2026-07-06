const fs = require('fs');
let server = fs.readFileSync('C:/uni/apn1/apnileap-final-main/backend/server.js', 'utf8');

const targetStr = `await axios.post(
                \`\${process.env.JIRA_DOMAIN}/rest/api/3/issue\`,
                taskBody,
                {
                  headers: {
                    Authorization: \`Basic \${auth}\`,
                    "Content-Type": "application/json"
                  }
                }
              );`;

const replacementStr = `const taskRes = await axios.post(
                \`\${process.env.JIRA_DOMAIN}/rest/api/3/issue\`,
                taskBody,
                {
                  headers: {
                    Authorization: \`Basic \${auth}\`,
                    "Content-Type": "application/json"
                  }
                }
              );

              // Force transition to 'To Do' (if not already there)
              if (taskRes.data && taskRes.data.key) {
                try {
                  const transitionsRes = await axios.get(
                    \`\${process.env.JIRA_DOMAIN}/rest/api/3/issue/\${taskRes.data.key}/transitions\`,
                    { headers: { Authorization: \`Basic \${auth}\` } }
                  );
                  const todoTransition = transitionsRes.data.transitions.find(t => t.name.toLowerCase() === "to do");
                  if (todoTransition) {
                    await axios.post(
                      \`\${process.env.JIRA_DOMAIN}/rest/api/3/issue/\${taskRes.data.key}/transitions\`,
                      { transition: { id: todoTransition.id } },
                      { headers: { Authorization: \`Basic \${auth}\`, "Content-Type": "application/json" } }
                    );
                    console.log(\`[ASYNC PROVISIONING] Transitioned \${taskRes.data.key} to To Do\`);
                  }
                } catch (tErr) {
                  console.error(\`Failed to transition \${taskRes.data.key} to To Do:\`, tErr.message);
                }
              }`;

if (server.includes(targetStr)) {
  server = server.replace(targetStr, replacementStr);
  
  // Also transition the Epic to To Do
  const epicTargetStr = `const realKey = epicRes.data.key;
            console.log(\`[ASYNC PROVISIONING] Epic Created successfully: \${realKey}\`);`;
  
  const epicReplacementStr = `const realKey = epicRes.data.key;
            console.log(\`[ASYNC PROVISIONING] Epic Created successfully: \${realKey}\`);
            
            try {
              const epicTransRes = await axios.get(
                \`\${process.env.JIRA_DOMAIN}/rest/api/3/issue/\${realKey}/transitions\`,
                { headers: { Authorization: \`Basic \${auth}\` } }
              );
              const epicTodoTrans = epicTransRes.data.transitions.find(t => t.name.toLowerCase() === "to do");
              if (epicTodoTrans) {
                await axios.post(
                  \`\${process.env.JIRA_DOMAIN}/rest/api/3/issue/\${realKey}/transitions\`,
                  { transition: { id: epicTodoTrans.id } },
                  { headers: { Authorization: \`Basic \${auth}\`, "Content-Type": "application/json" } }
                );
                console.log(\`[ASYNC PROVISIONING] Transitioned Epic \${realKey} to To Do\`);
              }
            } catch (tErr) {
              console.error(\`Failed to transition Epic \${realKey} to To Do:\`, tErr.message);
            }`;
            
  server = server.replace(epicTargetStr, epicReplacementStr);

  fs.writeFileSync('C:/uni/apn1/apnileap-final-main/backend/server.js', server);
  console.log('Successfully injected auto-transition logic!');
} else {
  console.log('Target string not found in server.js');
}
