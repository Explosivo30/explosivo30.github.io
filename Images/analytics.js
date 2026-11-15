/* Private GoatCounter reporting. No visible counter or navigation changes. */
(() => {
  'use strict';

  // Do not load third-party analytics in local previews or copied sites.
  if (window.location.hostname !== 'explosivo30.github.io') return;

  const page = window.location.pathname.replace(/\/index\.html$/, '/');
  const pending = [];
  window.goatcounter = { path: page, no_events: true };

  function send(event) {
    const counter = window.goatcounter;
    if (typeof counter.count !== 'function') {
      if (pending.length < 20) pending.push(event);
      return;
    }
    // Respect GoatCounter's opt-out, bot and iframe filters for custom events too.
    if (!counter.filter()) counter.count(event);
  }

  function trackOutbound(event) {
    if (event.defaultPrevented || (event.type === 'auxclick' && event.button !== 1)) return;
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    let destination;
    try { destination = new URL(anchor.href); } catch { return; }
    if (destination.protocol !== 'https:') return;
    const host = destination.hostname.toLowerCase();
    const service = host === 'github.com' ? 'GitHub'
      : (host === 'itch.io' || host.endsWith('.itch.io')) ? 'itch.io' : null;
    if (!service) return;

    // No query strings, fragments, link text or personal identifiers in events.
    send({
      path: 'outbound:' + host + destination.pathname + ':from:' + page,
      title: service + ' click: ' + host + destination.pathname + ' (from ' + page + ')',
      event: true
    });
  }

  // Delegation includes the game modal's dynamically assigned destination.
  document.addEventListener('click', trackOutbound);
  document.addEventListener('auxclick', trackOutbound);

  const script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.dataset.goatcounter = 'https://explosivo30.goatcounter.com/count';
  script.addEventListener('load', () => pending.splice(0).forEach(send));
  script.addEventListener('error', () => { pending.length = 0; });
  document.head.appendChild(script);
})();
