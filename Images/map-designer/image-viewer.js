(() => {
  const dialog = document.getElementById('editor-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const scrollArea = document.getElementById('viewer-scroll');
  const zoom = document.getElementById('viewer-zoom');
  const status = document.getElementById('viewer-status');
  let trigger;
  let previousOverflow;

  function setZoom(actualSize) {
    scrollArea.classList.toggle('actual-size', actualSize);
    zoom.setAttribute('aria-pressed', String(actualSize));
    zoom.textContent = actualSize ? 'Fit to window' : 'Actual size';
    status.textContent = actualSize
      ? 'Actual size · Scroll to inspect the interface. Escape closes this view.'
      : 'Full interface · Select Actual size to inspect the controls. Escape closes this view.';
    scrollArea.scrollTop = 0;
    scrollArea.scrollLeft = 0;
  }

  for (const link of document.querySelectorAll('#open-editor, #enlarge-editor')) {
    link.addEventListener('click', event => {
      event.preventDefault();
      trigger = link;
      setZoom(false);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  }
  zoom.addEventListener('click', () => setZoom(!scrollArea.classList.contains('actual-size')));
  document.getElementById('viewer-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    trigger?.focus();
  });
})();
