// Script for policy pages: shared header/footer + table of contents
import { initCommon } from './common.js';

initCommon();

// Build "On this page" links from the <h2> headings
const toc = document.getElementById('toc');
document.querySelectorAll('.prose h2').forEach((h, i) => {
  h.id ||= `section-${i + 1}`;
  toc?.insertAdjacentHTML('beforeend', `<li><a href="#${h.id}" class="block rounded-lg px-3 py-1.5 hover:bg-accent-100 hover:text-brand-800">${h.textContent}</a></li>`);
});
