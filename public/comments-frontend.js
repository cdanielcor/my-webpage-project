async function fetchComments() {
    const res = await fetch('/comments');
    const comments = await res.json();
    const container = document.getElementById('comments');
    container.innerHTML = '';
    comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment';
        div.textContent = `${c.name} (${new Date(c.date).toLocaleString()}): ${c.text}`;
        container.appendChild(div);
    });
}

async function submitComment() {
    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('text').value.trim();
    if (!text) return alert('Please fill in at least the comment field.');

    await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text })
    });

    document.getElementById('text').value = '';
    fetchComments();
}

fetchComments();