let cards = document.querySelectorAll('.card');
let header = document.querySelector('header');
let searchInput = document.getElementById('search-input');

function checkCards() {
    cards.forEach(card => {
        if (isVisible(card)) {
            card.classList.add('show');
        }
    });
}

function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -rect.height &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height
    );
}

function throttle(callback, delay) {
    let lastCall = 0;
    return function() {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        callback.apply(null, arguments);
    };
}

const throttledCheckCards = throttle(checkCards, 200);

window.addEventListener('scroll', throttledCheckCards);
window.addEventListener('resize', throttledCheckCards);
window.addEventListener('load', throttledCheckCards);

checkCards();

let lastScroll = 0;
window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 0) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

function alternateImages() {
    document.querySelectorAll('.card').forEach(card => {
        const img = card.querySelector('img');
        const status = card.querySelector('.status');
        const originalSrc = img.dataset.original;
        const filteredSrc = img.dataset.filtered;
        let isFiltered = true;

        img.addEventListener('click', function() {
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = isFiltered ? originalSrc : filteredSrc;
                status.textContent = isFiltered ? 'Original' : 'Preset';
                img.style.opacity = 1;
                isFiltered = !isFiltered;
            }, 500);
        });
    });
}

window.addEventListener('load', alternateImages);

function toggleSearch() {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer.style.display === 'flex') {
        menuContainer.style.display = 'none';
    } else {
        menuContainer.style.display = 'flex';
        // Llamar checkCards nuevamente cuando se muestra el contenedor de búsqueda
        throttledCheckCards();
    }
}

function filterCards() {
    const searchInputValue = searchInput.value.toLowerCase();
    cards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        if (cardTitle.includes(searchInputValue)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/*prueba*/
