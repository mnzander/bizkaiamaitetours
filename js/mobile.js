document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector(".burger-btn");
    const burgerSvg = document.querySelector(".burger-svg");
    const crossSvg = document.querySelector(".cross-svg");
    const burgerMenu = document.querySelector(".burger-menu");
    let burgerMenuActive = false;
    
    burgerSvg.style.opacity = 1;
    burgerSvg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    crossSvg.style.opacity = 0;
    crossSvg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    burgerMenu.style.opacity = 0;
    burgerMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    burgerBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Evitar que el clic en el botón cierre el menú
        if (!burgerMenuActive) {
            burgerMenu.style.display = 'flex';
            burgerSvg.style.display = "none";
            crossSvg.style.display = "block";
            setTimeout(() => {
                burgerMenu.style.opacity = 1;
                burgerSvg.style.opacity = 0;
                crossSvg.style.opacity = 1;
            }, 30);
            burgerMenuActive = true;
        } else {
            closeBurgerMenu();
        }
    });

    // Detectar clics en cualquier lugar del documento
    document.addEventListener("click", (event) => {
        if (burgerMenuActive && !burgerMenu.contains(event.target)) { //Si esta activo y el click es fuera del menu
            closeBurgerMenu();
        }
    });

    function closeBurgerMenu() {
        burgerMenu.style.opacity = 0;

        burgerSvg.style.display = "block";
        crossSvg.style.display = "none";

        setTimeout(() => {
            burgerMenu.style.display = 'none';
        }, 300);

        setTimeout(() => {
            crossSvg.style.opacity = 0;
            burgerSvg.style.opacity = 1;
        }, 50);

        burgerMenuActive = false;
    }  

});
