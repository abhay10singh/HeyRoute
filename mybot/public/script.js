//script.js

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (!userInput.trim()) return;

  addMessage(userInput, 'user');
  document.getElementById('user-input').value = '';

  try {
    const response = await fetch('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userInput }),
    });

    const data = await response.json();
    if (data.answer) {
      addMessage(formatBotReply(data.answer), 'bot');
    } else {
      addMessage('❌ No response from bot.', 'bot');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    addMessage('❌ An error occurred while fetching the response.', 'bot');
  }
}

function addMessage(text, sender) {
  const container = document.createElement('div');
  container.className = `message ${sender}`;
  container.innerHTML = sender === 'bot' ? text : escapeHTML(text);
  document.getElementById('messages').appendChild(container);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

function formatBotReply(reply) {
  return reply
    .replace(/- /g, '<br>- ')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(\r\n|\r|\n)/g, '<br>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
