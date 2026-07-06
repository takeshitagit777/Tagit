import { works } from './works.mjs';

const grid = document.querySelector('#workGrid');
const filterRow = document.querySelector('#filterRow');
const categories = ['すべて', ...Array.from(new Set(works.map((work) => work.category)))];
let current = 'すべて';

function renderFilters() {
  filterRow.innerHTML = categories
    .map((category) => `<button type="button" class="filter-button ${category === current ? 'active' : ''}" data-category="${category}">${category}</button>`)
    .join('');

  filterRow.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      current = button.dataset.category;
      renderFilters();
      renderWorks();
    });
  });
}

function workImage(work) {
  return `./assets/works/${work.slug}.png`;
}

function fallbackImage(work) {
  return `./assets/works/${work.slug}.svg`;
}

function renderWorks() {
  const visibleWorks = current === 'すべて' ? works : works.filter((work) => work.category === current);

  grid.innerHTML = visibleWorks
    .map((work) => {
      const targetUrl = work.liveUrl || work.githubUrl;
      const buttonLabel = work.liveUrl ? 'サイトを見る' : 'GitHubを見る';
      return `
        <article class="work-card reveal ${work.featured ? 'is-featured' : ''}">
          <a class="work-image" href="${targetUrl}" target="_blank" rel="noreferrer" aria-label="${work.title}を見る">
            <img src="${workImage(work)}" data-fallback="${fallbackImage(work)}" alt="${work.title}のスクリーンショット" loading="lazy" />
            <span>${work.liveUrl ? 'Live Site' : 'GitHub'}</span>
          </a>
          <div class="work-body">
            <div class="work-topline">
              <span>${work.category}</span>
              <small>${work.repo}</small>
            </div>
            <h3>${work.title}</h3>
            <p>${work.lead}</p>
            <div class="tag-list">
              ${work.tags.map((tag) => `<span>${tag}</span>`).join('')}
            </div>
            <div class="work-links">
              <a href="${targetUrl}" target="_blank" rel="noreferrer">${buttonLabel} →</a>
              <a href="${work.githubUrl}" target="_blank" rel="noreferrer">GitHub →</a>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  grid.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallback && img.src.indexOf(img.dataset.fallback) === -1) {
        img.src = img.dataset.fallback;
      }
    });
  });

  observeReveals();
}

function observeReveals() {
  const items = document.querySelectorAll('.reveal:not(.observed)');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => {
    item.classList.add('observed');
    observer.observe(item);
  });
}

renderFilters();
renderWorks();
observeReveals();
