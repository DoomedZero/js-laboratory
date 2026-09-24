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

    <!-- MDN-Style Structured Code Block -->
    <div class="code-wrapper">
      <div class="code-header">
        <span class="code-lang">JavaScript</span>
        <button class="copy-btn" id="copy-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25v-7.5z"></path>
            <path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25v-7.5zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-7.5z"></path>
          </svg>
          <span class="copy-label">Copy</span>
        </button>
      </div>
      <pre><code class="language-javascript">${escapeHtml(activeSnippet.code)}</code></pre>
    </div>

    <div class="output-box"><strong>Expected Output:</strong> ${escapeHtml(activeSnippet.output)}</div>
  </article>
`;

    Prism.highlightAll();

    // Attach copy handler
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            await navigator.clipboard.writeText(activeSnippet.code);
            const label = copyBtn.querySelector('.copy-label');
            label.textContent = 'Copied!';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                label.textContent = 'Copy';
                copyBtn.classList.remove('copied');
            }, 1500);
        });
    }

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