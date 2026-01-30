const navBar = document.querySelector('nav')
const menuBtn = document.querySelector('.menu-btn')

const images = document.querySelector('#images')
const modal = document.querySelector('dialog')
const modalImage = modal.querySelector('img')
const closeButton = modal.querySelector('.close-viewer')

// opening and closing the nav bar menu
menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    navBar.classList.toggle('hidden')
}

// opening and closing the modal image
images.addEventListener('click', openModal);

function openModal(e) {
    const img = e.target;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const full = src.replace('sm', 'full');

    modalImage.src = full;
    modalImage.alt = alt;

    modal.showModal()
}

closeButton.addEventListener('click', () => {
    modal.close();
})

// close the modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
})