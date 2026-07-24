
const ICONS = {
  "logo": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`,
  "home": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9"/></svg>`,
  "pill": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-40 12 12)"/><path d="M9.2 14.8 14.8 9.2" transform="rotate(-40 12 12)"/></svg>`,
  "bell": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z"/><path d="M10.3 19a1.8 1.8 0 0 0 3.4 0"/></svg>`,
  "bar-chart": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M20 20v-4"/></svg>`,
  "trending-up": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 16.5 10 10l4 4 6.5-6.5"/><path d="M15.5 7.5H20.5V12.5"/></svg>`,
  "users": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 5.5c1.5.3 2.5 1.5 2.5 2.5s-1 2.2-2.5 2.5"/><path d="M15.5 14c2.5.3 4.5 2.1 4.5 5"/></svg>`,
  "search": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>`,
  "calendar": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>`,
  "plus": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5v15"/><path d="M4.5 12h15"/></svg>`,
  "check": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 12.5 9.5 17.5 19.5 6.5"/></svg>`,
  "check-circle": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9"/><path d="M7.5 12.5 10.5 15.5 16.5 9"/></svg>`,
  "alert-triangle": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 3.5 21.5 20h-19L12 3.5Z"/><path d="M12 10v4"/><path d="M12 17.2v.1"/></svg>`,
  "x-circle": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6"/><path d="M15 9l-6 6"/></svg>`,
  "edit": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M16 4.5 19.5 8 8.5 19H5v-3.5L16 4.5Z"/><path d="M14 6.5 17.5 10"/></svg>`,
  "trash": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7h15"/><path d="M9 7V4.8c0-.4.4-.8.9-.8h4.2c.5 0 .9.4.9.8V7"/><path d="M6.5 7 7.3 19.2c0 .5.5.8 1 .8h7.4c.5 0 1-.3 1-.8L17.5 7"/><path d="M10.3 11v5.5"/><path d="M13.7 11v5.5"/></svg>`,
  "save": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.5h11.5L19.5 8v11a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5v-14a.5.5 0 0 1 .5-.5Z"/><path d="M8 4.5v5h7v-5"/><path d="M7.5 14.5h9v5h-9z"/></svg>`,
  "sun": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5"/><path d="M12 19v2.5"/><path d="M4.2 4.2l1.8 1.8"/><path d="M18 18l1.8 1.8"/><path d="M2.5 12H5"/><path d="M19 12h2.5"/><path d="M4.2 19.8 6 18"/><path d="M18 6l1.8-1.8"/></svg>`,
  "cloud-sun": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 4v1.8"/><path d="M3.8 8.8l1.3 1.1"/><path d="M13.2 8.8l-1.3 1.1"/><circle cx="8.5" cy="9.5" r="2.8"/><path d="M8 17.5h8a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.2 12.2 3 3 0 0 0 8 17.5Z"/></svg>`,
  "moon": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a6.8 6.8 0 0 0 9.5 9.5Z"/></svg>`,
  "moon-star": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17 15.5A8 8 0 1 1 8.5 5a6.4 6.4 0 0 0 8.5 10.5Z"/><path d="M19.5 3.5v3.4"/><path d="M18 5.2h3"/></svg>`,
  "party": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 19.5 8 9.2c.15-.45.7-.6 1.05-.28l6 5.5c.35.32.2.9-.27 1.03L4.5 19.5Z"/><path d="M13.5 2.5 14 4.3"/><path d="M18 4l-1 1.6"/><path d="M20.5 8l-1.8.5"/><path d="M9.7 12.3l1.6-1.1"/></svg>`,
  "clipboard": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4.5" width="14" height="17" rx="1.5"/><rect x="9" y="3" width="6" height="3" rx="1"/><path d="M8.5 12h7"/><path d="M8.5 16h7"/><path d="M8.5 9h4"/></svg>`,
  "clock": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  "family": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="6.5" r="2.3"/><circle cx="17" cy="6.5" r="2.3"/><circle cx="12" cy="12" r="1.9"/><path d="M3 19c0-2.6 1.8-4.5 4-4.5s4 1.9 4 4.5"/><path d="M13 19c0-2.6 1.8-4.5 4-4.5s4 1.9 4 4.5"/><path d="M9 19.5c0-1.9 1.3-3.3 3-3.3s3 1.4 3 3.3"/></svg>`,
};


function icon(name, extraClass = '') {
  const svg = ICONS[name];
  if (!svg) return '';
  return `<span class="icon${extraClass ? ' ' + extraClass : ''}" aria-hidden="true">${svg}</span>`;
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.getAttribute('data-icon');
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      el.classList.add('icon');
    }
  });
});

