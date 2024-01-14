const menuBtn = document.querySelector('#menuBtn');
const menuContent = document.querySelector('#menuContent');

menuBtn.addEventListener('click', () => {
    menuContent.classList.toggle('hidden');
});