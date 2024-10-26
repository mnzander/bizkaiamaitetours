import { routes } from "./mock.js";

document.addEventListener('DOMContentLoaded', function() {

    const main = document.querySelector("main");

    const rutaCosteraInfo = routes[0];
    const rutaMineraInfo = routes[1];
    const rutaDuranguesadoInfo = routes[2];
    const rutaBilbaoInfo = routes[3];
    const rutaGranBilbaoInfo = routes[4];

    const showContent = (routeInfo, num) => {
        // PORTADA DE LA RUTA
        const wallpaperContainer = document.createElement("div");
        wallpaperContainer.className = "wallpaper";
        wallpaperContainer.style.backgroundImage = `url(${routeInfo.images[0]})`;
        if (num === 1 || num === 2 || num === 3) {
            wallpaperContainer.style.backgroundPosition = "50% 30%";
        }

        const title1 = document.createElement("p");
        title1.className = "title-1";
        title1.textContent = routeInfo.title1.toUpperCase();

        const title2 = document.createElement("p");
        title2.className = "title-2";
        title2.textContent = routeInfo.title2.toUpperCase();

        // DESCRIPCION DE LA RUTA
        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "description";
        descriptionContainer.style.setProperty("--custom-before-content", `"${routeInfo.motto}"`);

        const descriptionText = document.createElement("p");
        descriptionText.className = "description-text";
        descriptionText.innerHTML = routeInfo.description;

        const mapaImg = document.createElement("img");
        mapaImg.className = "mapa";
        mapaImg.alt = "mapa";
        mapaImg.src = routeInfo.images[1];

        // PARADAS EN LA RUTA
        const routeDescription = document.createElement("div");
        routeDescription.className = "route-description";
        let isEvenStop = true;
        routeInfo.stops.forEach((stop, index) => {
            const stopContainer = document.createElement("div");
            stopContainer.className = stop.stopName.split(' ')[0].toLowerCase() + " stop-container"; //Cogemos la primera palabra del nombre de la ruta, la ponemos en minus.

            const stopName = document.createElement("p");
            stopName.className = index % 2 === 0 ? "stop-name" : "stop-name-2";
            stopName.textContent = stop.stopName;

            const flexContainer = document.createElement("div");
            flexContainer.className = "flex-container";

            const sectionImgs = document.createElement("section");
            stop.stopImgs.forEach((img, imgIndex) => {
                const image = document.createElement("img");
                image.src = img;
                image.alt = `${stop.stopName.toLowerCase()}${imgIndex + 1}`;
                sectionImgs.appendChild(image);
            });

            const stopDescription = document.createElement("p");
            stopDescription.innerHTML = stop.stopDescription;

            if (window.innerWidth >= 1024 && isEvenStop){
                flexContainer.appendChild(sectionImgs);
                flexContainer.appendChild(stopDescription);
            } else {
                flexContainer.appendChild(stopDescription);
                flexContainer.appendChild(sectionImgs);
            }

            stopContainer.appendChild(stopName);
            stopContainer.appendChild(flexContainer);
            routeDescription.appendChild(stopContainer);

            isEvenStop = !isEvenStop;
        });

        //APPEND CHILDS
        wallpaperContainer.appendChild(title1);
        wallpaperContainer.appendChild(title2);

        descriptionContainer.appendChild(descriptionText);
        descriptionContainer.appendChild(mapaImg);

        main.appendChild(wallpaperContainer);
        main.appendChild(descriptionContainer);
        main.appendChild(routeDescription);
    };

    const footer = document.querySelector("footer");

    const handleZoom = () => {
        footer.style.top = `${main.scrollHeight}px`;
    };
    
    const adjustFooterHeight = () => {
        setTimeout(() => {
            footer.style.top = `${main.scrollHeight}px`;
        }, 500);

        // Maneja el evento de zoom
        window.addEventListener('resize', handleZoom);
        window.addEventListener('zoom', handleZoom);

        // Elimina los event listeners al salir de la página (o recargar)
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('resize', handleZoom);
            window.removeEventListener('zoom', handleZoom);
        });
    };

    switch (window.location.pathname) {
        case "/pages/rutacostera.html":
            showContent(rutaCosteraInfo, 0);
            adjustFooterHeight();
            break;
        case "/pages/rutaminera.html":
            showContent(rutaMineraInfo, 1);
            adjustFooterHeight();
            break;
        case "/pages/rutaduranguesado.html":
            showContent(rutaDuranguesadoInfo, 2);
            adjustFooterHeight();
            break;
        case "/pages/rutabilbao.html":
            showContent(rutaBilbaoInfo, 3);
            adjustFooterHeight();
            break;
        case "/pages/rutagranbilbao.html":
            showContent(rutaGranBilbaoInfo, 4);
            adjustFooterHeight();
            break;
        case "/pages/tarifas.html":
            adjustFooterHeight();
            break;
        case "/pages/contacto.html":
            adjustFooterHeight();
            break;
    };

    window.addEventListener('pagehide', function() { //En cada recarga
        window.scrollTo(0, 0); //Posicionarse en la parte superior
    });
});