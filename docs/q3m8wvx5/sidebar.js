(function () {
  const placeholder = document.getElementById('sidebar-placeholder');
  if (!placeholder) return;

  fetch('sidebar.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      placeholder.innerHTML = html;

      const current = location.pathname.split('/').pop() || 'index.html';
      placeholder.querySelectorAll('nav a').forEach(function (a) {
        if (a.getAttribute('href') === current) {
          a.classList.add('active');
        }
      });

      const searchInput = placeholder.querySelector('.search-input');
      if (searchInput) {
        searchInput.addEventListener('input', function () {
          const q = this.value.toLowerCase();
          placeholder.querySelectorAll('nav a').forEach(function (a) {
            a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
          });
        });
      }
    });
})();
