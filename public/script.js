const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;
  appendMessage('user', userMessage);
  input.value = '';

  // Show a temporary "thinking" message
  const thinkingElem = appendMessage('bot', 'Gemini is thinking...');

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    if (thinkingElem && thinkingElem.remove) thinkingElem.remove();
    appendMessage('bot', data.reply);
  } catch (error) {
    if (thinkingElem && thinkingElem.remove) thinkingElem.remove();
    appendMessage('bot', 'Sorry, there was an error connecting to Gemini.');
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
