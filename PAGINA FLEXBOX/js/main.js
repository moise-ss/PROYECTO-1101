// filepath: sticky-sections-app/sticky-sections-app/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Si hay secciones en la página, mantener la lógica de scroll para una SPA
    if (sections.length > 0 && navLinks.length > 0) {
// sourcery skip: avoid-function-declarations-in-blocks
        function changeActiveLink(){
            let index = sections.length;
            while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
            navLinks.forEach((link) => link.classList.remove('active'));
            if (navLinks[index]) navLinks[index].classList.add('active');
        }
        changeActiveLink();
        window.addEventListener('scroll', changeActiveLink);
    } else if (navLinks.length > 0) {
        // Páginas separadas: resaltar el enlace cuyo href coincide con el archivo actual
        const current = location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            try {
                const linkPath = new URL(link.href).pathname.split('/').pop();
                if (linkPath === current) link.classList.add('active');
            } catch (e) {
                // fallback simple
                const href = link.getAttribute('href');
                if (href === current) link.classList.add('active');
            }
        });
    }

    // Exponer diálogo como `modal` para compatibilidad con botones inline
    const dialogEl = document.getElementById('modal');
    if (dialogEl) window.modal = dialogEl;
});