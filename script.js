document.getElementById('generate').addEventListener('click', function() {
    const length = parseInt(document.getElementById('length').value);
    
    if (length < 1 || length > 600) {
        alert("The length must be between 1 and 600.");
        return;
    }

    const charset = 
        "abcdefghijklmnopqrstuvwxyz" + 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
        "0123456789" + 
        "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?>";

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('password').value = password;

    document.querySelector('label[for="password"]').classList.remove('hidden');
    document.getElementById('password').classList.remove('hidden');
    document.getElementById('copy').classList.remove('hidden');
});

document.getElementById('copy').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert("Password copied to the clipboard!");
});

function toggleTheme() {
    const body = document.body;
    const container = document.querySelector('.container');
    const logo = document.getElementById('logo');

    body.classList.toggle('light-mode');
    container.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        logo.src = 'assets/icons/light-mode.png';
    } else {
        logo.src = 'assets/icons/dark-mode.png';
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/password-gen/service-worker.js')
            .then((registration) => {
                console.log('Service Worker is running:', registration);
            })
            .catch((error) => {
                console.log('Rervice Worker failed running:', error);
            });
    });
}
