import fetch from 'node-fetch';

const JIRA_URL = 'https://mgodefroy.atlassian.net';
const EMAIL = 'melinegodefroy.mg@gmail.com';
const API_TOKEN = 'test token'; // remplace par ton token
const PROJECT_KEY = 'SUP'; 


export async function createJiraIssue(summary, description) {
  const url = `${JIRA_URL}/rest/api/3/issue`;
  const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');
  const descriptionADF = {
    type: "doc",
    version: 1,
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: description || "Aucune description fournie."
          }
        ]
      }
    ]
  };
  const body = {
    fields: {
      project: { key: PROJECT_KEY },
      summary: summary,
      description: descriptionADF,
      issuetype: { id: '10012' }
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Ticket Jira créé avec succès :', data.key);
  } else {
    const errorText = await response.text();
    console.error('Erreur création ticket Jira:', response.status, errorText);
  }
}
