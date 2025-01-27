document.addEventListener('DOMContentLoaded', function() {

const data = [
    {
        place:'Mar',
        title:'RUTA',
        title2:'COSTERA',
        description:'Recorrido por la costa de Bizkaia, llena de lugares emblemáticos en la historia de esta tierra.',
        image:'/utils/img-index/gaztelugatxe.jpg'
    },
    {
        place:'Minería',
        title:'RUTA',
        title2:'MINERA',
        description: 'La minería de hierro supuso una revolución económica y social en todo el territorio.',
        image:'/utils/img-index/balmaseda.jpeg'
    },
    {
        place:'Naturaleza',
        title:'RUTA',
        title2:'DURANGUESADO',
        description:'Para amantes de la naturaleza, de los paisajes espectaculares y de los pueblos entrañables.',
        image:'/utils/img-index/hayedo-otzarreta.png'
    },
    {
        place:'Cultura',
        title:'RUTA',
        title2:'BILBAO',
        description:'Visita a la Villa de Bilbao, fundada en 1300. Recientemente premiada como mejor ciudad europea.',
        image:'/utils/img-index/bilbao.jpg'
    },
    {
        place:'Alrededores',
        title:'RUTA',
        title2:'GRAN BILBAO',
        description:'Visita al conjunto de municipios que rodean la villa de Bilbao, y la acompañan en su camino hacia el mar.',
        image:'/utils/img-index/puente-colgante.png'
    },
];

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`).join('');

const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')

const slideNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')
_('demo').innerHTML =  cards + cardContents
_('slide-numbers').innerHTML =  slideNumbers


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4];
let detailsEven = true;

let currentPage = null;
const discoverBtn = document.querySelector(".discover");
discoverBtn.addEventListener("click", () => {
  switch (currentPage) {
    case null:
    case 0:
      window.location.href = "../pages/rutacostera.html";
      break;
    case 1:
      window.location.href = "../pages/rutaminera.html";
      break;
    case 2:
      window.location.href = "../pages/rutaduranguesado.html";
      break;
    case 3:
      window.location.href = "../pages/rutabilbao.html";
      break;
    case 4:
      window.location.href = "../pages/rutagranbilbao.html";
      break;
  }
});

let offsetTop, offsetLeft, cardWidth, cardHeight, gap, numberSize;

if (window.innerWidth <= 1380 && window.innerHeight <= 1023) { // Condición para móviles
  offsetTop = 0;
  offsetLeft = 0;
  cardWidth = 0;
  cardHeight = 0;
  gap = 0;
  numberSize = 0;
} else { // Condición para escritorio
  offsetTop = 200;
  offsetLeft = 700;
  cardWidth = 200;
  cardHeight = 300;
  gap = 40;
  numberSize = 50;
}

const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;

  offsetTop = height - 430;
  offsetLeft = width - 830;

  // Crear elementos necesarios si no existen
  ['details-even', 'details-odd'].forEach(id => {
    if (!document.getElementById(id)) {
      const detailsDiv = document.createElement('div');
      detailsDiv.id = id;
      ['place-box', 'text', 'title-1', 'title-2', 'desc', 'cta'].forEach(cls => {
        const elem = document.createElement('div');
        if (cls === 'place-box') {
          const placeBox = document.createElement('div');
          placeBox.className = cls;
          ['text', 'title-1', 'title-2', 'desc', 'cta'].forEach(subCls => {
            const subElem = document.createElement('div');
            subElem.className = subCls;
            placeBox.appendChild(subElem);
          });
          elem.appendChild(placeBox);
        } else {
          elem.className = cls;
        }
        detailsDiv.appendChild(elem);
      });
      document.body.appendChild(detailsDiv);
    }
  });

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });

  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 100 * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });

  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });

  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}
  
async function step() {
    return new Promise((resolve) => {
        order.push(order.shift()); //Mueve el primer elemento del array al final

        currentPage = order[0]; //Primer elemento del nuevo array resultante

        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        const activePlaceBox = document.querySelector(`${detailsActive} .place-box`);
        const activePlace = document.querySelector(`${detailsActive} .text`);
        const activeTitle1 = document.querySelector(`${detailsActive} .title-1`);
        const activeTitle2 = document.querySelector(`${detailsActive} .title-2`);
        const activeDesc = document.querySelector(`${detailsActive} .desc`);

        if (activePlaceBox && activePlace) {
            activePlace.textContent = data[order[0]].place;
        }
        if (activeTitle1) {
            activeTitle1.textContent = data[order[0]].title;
        }
        if (activeTitle2) {
            activeTitle2.textContent = data[order[0]].title2;
        }
        if (activeDesc) {
            activeDesc.textContent = data[order[0]].description;
        }

        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });

        gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
        gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.35, duration: 0.4, onComplete: resolve, ease });

        gsap.set(detailsInactive, { zIndex: 12 });

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(getCard(prv), { zIndex: 10 });
        gsap.set(getCard(active), { zIndex: 20 });
        gsap.to(getCard(prv), { scale: 1.5, ease });

        gsap.to(getCardContent(active), {
        y: offsetTop + cardHeight - 10,
        opacity: 0,
        duration: 0.3,
        ease,
        });
        gsap.to(getSliderItem(active), { x: 0, ease });
        gsap.to(getSliderItem(prv), { x: -numberSize, ease });
        gsap.to(".progress-sub-foreground", {
        width: 500 * (1 / order.length) * (active + 1),
        ease,
        });

        gsap.to(getCard(active), {
        x: 0,
        y: 0,
        ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
            const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
            gsap.set(getCard(prv), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
            });

            gsap.set(getCardContent(prv), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            });
            gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

            gsap.set(detailsInactive, { opacity: 0 });
            gsap.set(`${detailsInactive} .text`, { y: 100 });
            gsap.set(`${detailsInactive} .title-1`, { y: 100 });
            gsap.set(`${detailsInactive} .title-2`, { y: 100 });
            gsap.set(`${detailsInactive} .desc`, { y: 50 });
            gsap.set(`${detailsInactive} .cta`, { y: 60 });

            clicks -= 1;
            if (clicks > 0) {
            step();
            }
        },
        });

        rest.forEach((i, index) => {
        if (i !== prv) {
            const xNew = offsetLeft + index * (cardWidth + gap);
            gsap.set(getCard(i), { zIndex: 30 });
            gsap.to(getCard(i), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1),
            });

            gsap.to(getCardContent(i), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1),
            });
            gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
        }
        });
    });
}

let clicks = 0;

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

start()
});