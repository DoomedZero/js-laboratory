import { snippets } from './lab-data.js';

const navContainer = document.getElementById('sidebar-nav');
const contentContainer = document.getElementById('active-snippet-container');
const searchInput = document.getElementById('search-input');

// --- MDN Drawer Controller ---
const drawerToggle = document.getElementById('drawer-toggle');
const drawerClose = document.getElementById('drawer-close');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const subbarTopic = document.getElementById('subbar-topic-label');

function setDrawerOpen(isOpen) {
    sidebar.classList.toggle('open', isOpen);
    overlay.classList.toggle('active', isOpen);
}

if (drawerToggle) {
    drawerToggle.addEventListener('click', () => setDrawerOpen(true));
}

if (drawerClose) {
    drawerClose.addEventListener('click', () => setDrawerOpen(false));
}

if (overlay) {
    overlay.addEventListener('click', () => setDrawerOpen(false));
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 1. Build the grouped sidebar links
function renderSidebar(filterText = '') {
    navContainer.innerHTML = '';

    const filtered = snippets.filter(s =>
        s.title.toLowerCase().includes(filterText.toLowerCase()) ||
        s.category.toLowerCase().includes(filterText.toLowerCase())
    );

    // Group items by category
    const grouped = filtered.reduce((acc, snippet) => {
        acc[snippet.category] = acc[snippet.category] || [];
        acc[snippet.category].push(snippet);
        return acc;
    }, {});

    const currentHash = window.location.hash.replace('#', '') || (snippets[0] ? snippets[0].id : '');

    for (const [category, items] of Object.entries(grouped)) {
        const groupEl = document.createElement('div');
        groupEl.className = 'category-group';

        const titleEl = document.createElement('div');
        titleEl.className = 'category-title';
        titleEl.textContent = category;
        groupEl.appendChild(titleEl);

        items.forEach(item => {
            const link = document.createElement('a');
            link.href = `#${item.id}`;
            link.className = `nav-item ${item.id === currentHash ? 'active' : ''}`;
            link.textContent = item.title;
            groupEl.appendChild(link);
        });

        navContainer.appendChild(groupEl);
    }
}

// 2. Render only the active snippet
function renderActiveSnippet() {
    const currentId = window.location.hash.replace('#', '');
    const activeSnippet = snippets.find(s => s.id === currentId) || snippets[0];

    if (!activeSnippet) {
        contentContainer.innerHTML = `<p>No snippet selected or found.</p>`;
        return;
    }

    // Auto-close drawer if screen is <= 800px
    if (window.innerWidth <= 800) {
        setDrawerOpen(false);
    }

    // Sync the URL hash on initial visit if it was empty
    if (!window.location.hash) {
        window.location.hash = activeSnippet.id;
    }

    contentContainer.innerHTML = `
    <article>
      <span class="badge">${activeSnippet.category}</span>
      <h1 class="snippet-title">${activeSnippet.title}</h1>
      <p class="snippet-prompt">${activeSnippet.prompt}</p>

      <div class="code-wrapper">
        <button class="copy-btn" id="copy-btn">Copy</button>
        <pre><code class="language-javascript">${escapeHtml(activeSnippet.code)}</code></pre>
      </div>

      <div class="output-box"><strong>Expected Output:</strong> ${activeSnippet.output}</div>
    </article>
  `;

    Prism.highlightAll();

    // Attach copy handler
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(activeSnippet.code);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
    });

    // Update active state in sidebar without re-rendering the whole tree
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.getAttribute('href') === `#${activeSnippet.id}`);
    });
}

// 3. Event Listeners
window.addEventListener('hashchange', renderActiveSnippet);

searchInput.addEventListener('input', (e) => {
    renderSidebar(e.target.value);
});

// 4. Initial execution
renderSidebar();
renderActiveSnippet();