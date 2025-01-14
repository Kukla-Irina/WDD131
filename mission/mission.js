const themeSelector = document.querySelector('select');

function changeTheme() {
    const selectedTheme = themeSelector.value;
    const body = document.body;
    const logo = document.querySelector('.logo');
    if (selectedTheme === 'dark') {
        body.classList.add('dark');
        logo.src = 'byui-logo_white.png'; 
    } else {
        body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp'; 
    }
}

themeSelector.addEventListener('change', changeTheme);
