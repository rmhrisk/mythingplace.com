// Load and render the product catalog
async function loadCatalog() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error('Failed to load product catalog');
    }
    const data = await response.json();
    
    // Load hero image if specified
    if (data.heroImage) {
      const heroEl = document.getElementById('hero-image');
      if (heroEl) {
        const img = document.createElement('img');
        img.src = data.heroImage;
        img.alt = 'Featured handmade items';
        img.onerror = function() {
          // If image fails to load, keep the placeholder text
          this.style.display = 'none';
        };
        heroEl.innerHTML = '';
        heroEl.appendChild(img);
      }
    }
    
    renderProducts(data);
  } catch (error) {
    console.error('Error loading catalog:', error);
    document.getElementById('product-grid').innerHTML = 
      '<p class="tiny-text">Unable to load products. Please try again later.</p>';
  }
}

function renderProducts(data) {
  const grid = document.getElementById('product-grid');
  const countsEl = document.getElementById('counts');
  const symbol = (data.currencySymbol || '$').trim();
  let selectedId = null;

  const allCategories = Array.from(new Set(data.items.map(i => i.category).filter(Boolean)));
  const activeCategories = new Set(allCategories);
  const categoryButtons = Array.from(document.querySelectorAll('.category-toggle[data-category]'));

  // Initialize category buttons
  categoryButtons.forEach(btn => {
    const raw = btn.getAttribute('data-category') || '';
    const cat = raw.replace(/&amp;/g, '&');
    btn.setAttribute('data-category', cat);
    btn.setAttribute('aria-pressed', activeCategories.has(cat) ? 'true' : 'false');
    if (!allCategories.includes(cat)) btn.style.display = 'none';
  });

  // Category filter click handlers
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (!cat) return;

      if (activeCategories.has(cat)) {
        // Don't allow deselecting the last category
        if (activeCategories.size === 1) return;
        activeCategories.delete(cat);
        btn.setAttribute('aria-pressed', 'false');
      } else {
        activeCategories.add(cat);
        btn.setAttribute('aria-pressed', 'true');
      }

      // If selected item is now filtered out, deselect it
      const selectedItem = data.items.find(x => x.id === selectedId);
      if (selectedItem && selectedItem.category && !activeCategories.has(selectedItem.category)) {
        selectedId = null;
      }

      renderTiles();
    });
  });

  function priceText(p) {
    return `${symbol}${p}`;
  }

  function getImageHTML(imagePath, altText, size = 80) {
    if (!imagePath) {
      return `<div class="tile-media" style="width:${size}px;height:${size}px;color:#bbb;font-weight:700;">Photo</div>`;
    }
    
    return `
      <div class="tile-media" style="width:${size}px;height:${size}px;">
        <img src="${imagePath}" alt="${altText}" onerror="this.style.display='none'; this.parentElement.innerHTML='Photo';">
      </div>
    `;
  }

  function renderCollapsedTile(item, halfRow) {
    const p = priceText(item.price);
    const disabled = item.soldOut || !item.paymentLink;
    const status = disabled ? 'Sold Out' : '';
    const cls = `product-tile${halfRow ? ' half-row' : ''}`;

    return `
      <button class="${cls}" type="button" data-id="${item.id}">
        <div class="tile-top">
          ${getImageHTML(item.image, item.name, 80)}
          <div class="tile-price">${p}</div>
        </div>
        <h4 class="tile-name">${item.name}</h4>
        <div class="tile-meta">
          ${item.tag ? `<span class="tile-tag">${item.tag}</span>` : `<span class="tile-tag">Item</span>`}
          ${status ? `<span class="tile-status">${status}</span>` : `<span class="tile-status">&nbsp;</span>`}
        </div>
      </button>
    `;
  }

  function renderExpandedTile(item) {
    const p = priceText(item.price);
    const disabled = item.soldOut || !item.paymentLink;

    const buy = disabled
      ? `<span class="buy-btn" aria-disabled="true">Sold Out</span>`
      : `<button class="buy-btn buy-action" type="button" data-url="${item.paymentLink}">Buy for ${p}</button>`;

    const expandedImage = item.image 
      ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#bbb;font-weight:700;\\'>Photo</div>';">`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#bbb;font-weight:700;">Photo</div>`;

    return `
      <div class="product-tile expanded" data-id="${item.id}" role="group" aria-label="${item.name} details">
        <div class="expanded-content">
          <div class="expanded-media">
            ${expandedImage}
          </div>

          <div class="expanded-right">
            <div class="expanded-header">
              <div>
                <h4 class="tile-name" style="font-size:1.15rem; margin:0;">${item.name}</h4>
                <div class="tile-price" style="margin-top:4px;">${p}</div>
              </div>
              <button class="tile-close" type="button" aria-label="Close">✕</button>
            </div>

            <p class="tile-desc" style="margin:0;">${item.description || ''}</p>

            <div class="tile-actions" style="margin-top:auto;">
              ${item.tag ? `<span class="tile-tag">${item.tag}</span>` : `<span class="tile-tag">Item</span>`}
              ${buy}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTiles() {
    const perRow = parseInt(getComputedStyle(grid).getPropertyValue('--perRow').trim() || '3', 10);
    const items = data.items.filter(it => !it.category || activeCategories.has(it.category));

    const selectedIndex = selectedId ? items.findIndex(x => x.id === selectedId) : -1;
    const selectedRowStart = (selectedIndex >= 0 && perRow > 0) ? Math.floor(selectedIndex / perRow) * perRow : -1;
    const selectedRowEnd = (selectedRowStart >= 0) ? Math.min(selectedRowStart + perRow, items.length) : -1;

    let html = '';

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (selectedId && i === selectedRowStart) {
        const rowItems = items.slice(selectedRowStart, selectedRowEnd);
        const remaining = rowItems.filter(x => x.id !== selectedId);
        remaining.forEach(x => {
          html += renderCollapsedTile(x, (perRow === 3 && remaining.length === 2));
        });
        const selectedItem = rowItems.find(x => x.id === selectedId);
        if (selectedItem) html += renderExpandedTile(selectedItem);
        i = selectedRowEnd - 1;
        continue;
      }

      if (item.id === selectedId) continue;
      html += renderCollapsedTile(item, false);
    }

    grid.innerHTML = html;

    const total = data.items.length;
    const shown = items.length;
    if (countsEl) countsEl.textContent = `Showing ${shown} of ${total} things`;

    // Attach event listeners to collapsed tiles
    grid.querySelectorAll('button.product-tile[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        selectedId = (selectedId === id) ? null : id;
        renderTiles();
        if (selectedId) {
          const expanded = grid.querySelector(`.product-tile.expanded[data-id="${selectedId}"]`);
          if (expanded) expanded.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });

    // Buy button inside expanded panel
    const buyBtn = grid.querySelector('.product-tile.expanded .buy-action');
    if (buyBtn) {
      buyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = buyBtn.getAttribute('data-url');
        if (url) window.location.href = url;
      });
    }

    // Close button in expanded panel
    const closeBtn = grid.querySelector('.product-tile.expanded .tile-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectedId = null;
        renderTiles();
      });
    }
  }

  renderTiles();
}

// Load catalog when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCatalog);
} else {
  loadCatalog();
}
