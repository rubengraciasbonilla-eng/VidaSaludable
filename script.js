/*********************************************************
  SISTEMA DE MENÚS Y MODALES (TU CÓDIGO ORIGINAL)
*********************************************************/

let currentOpen = null;
let currentSubOpen = null;

function mostrarInfo(id) {
  const secciones = document.querySelectorAll('.info');

  if (currentOpen === id) {
    secciones.forEach(sec => sec.style.display = 'none');

    let subMenuId = null;
    if (id === 'alimentacion') subMenuId = 'subMenuAlimentacion';
    else if (id === 'sedentarismo') subMenuId = 'subMenuSedentarismo';
    else if (id === 'mente') subMenuId = 'subMenuMente';

    if (subMenuId) {
      document.getElementById(subMenuId).style.display = 'none';
    }

    const subInfos = document.querySelectorAll('.sub-info');
    subInfos.forEach(sub => sub.style.display = 'none');

    currentSubOpen = null;
    currentOpen = null;
  } else {
    secciones.forEach(sec => sec.style.display = 'none');

    const seccionSeleccionada = document.getElementById(id);
    seccionSeleccionada.style.display = 'block';

    let resId;
    if (id === 'alimentacion') {
      resId = 'recursosAlimentacion';
      document.getElementById('subMenuAlimentacion').style.display = 'flex';
    }
    else if (id === 'sedentarismo') {
      resId = 'recursosSedentarismo';
      document.getElementById('subMenuSedentarismo').style.display = 'flex';
    }
    else if (id === 'mente') {
      resId = 'recursosMente';
      document.getElementById('subMenuMente').style.display = 'flex';
    }

    if (resId) {
      document.getElementById(resId).style.display = 'flex';
    }

    currentOpen = id;
  }
}

function mostrarSubInfo(subId) {
  const subInfos = document.querySelectorAll('.sub-info');

  if (currentSubOpen === subId) {
    subInfos.forEach(sub => sub.style.display = 'none');
    currentSubOpen = null;
  } else {
    subInfos.forEach(sub => sub.style.display = 'none');
    document.getElementById(subId).style.display = 'block';
    currentSubOpen = subId;
  }
}

function abrirVideo(url) {
  const modal = document.getElementById('modalVideo');
  const iframe = document.getElementById('videoFrame');
  iframe.src = url + "?autoplay=1";
  modal.style.display = 'flex';
}
function cerrarVideo() {
  const modal = document.getElementById('modalVideo');
  const iframe = document.getElementById('videoFrame');
  iframe.src = "";
  modal.style.display = 'none';
}

function abrirImagen(src) {
  const modal = document.getElementById('modalImagen');
  const img = document.getElementById('imagenFrame');
  img.src = src;
  modal.style.display = 'flex';
}
function cerrarImagen() {
  const modal = document.getElementById('modalImagen');
  modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  const secciones = document.querySelectorAll('.info');
  secciones.forEach(sec => sec.style.display = 'none');

  document.getElementById('subMenuAlimentacion').style.display = 'none';
  document.getElementById('subMenuSedentarismo').style.display = 'none';
  document.getElementById('subMenuMente').style.display = 'none';

  const subInfos = document.querySelectorAll('.sub-info');
  subInfos.forEach(sub => sub.style.display = 'none');
});


/*********************************************************
  SISTEMA MULTICARRUSEL — AUTOPLAY INDEPENDIENTE
*********************************************************/

const carruseles = {
  alimentacion: {
    slides: "slidesAlimentacion",
    dots: "dotsAlimentacion",
    index: 0,
    interval: null,
    delay: 5000 // 5 segundos
  },
  actividad: {
    slides: "slidesActividad",
    dots: "dotsActividad",
    index: 0,
    interval: null,
    delay: 5000
  },
  mente: {
    slides: "slidesMente",
    dots: "dotsMente",
    index: 0,
    interval: null,
    delay: 5000
  }
};


document.addEventListener("DOMContentLoaded", () => {
  Object.keys(carruseles).forEach(key => {
    iniciarCarrusel(key);
  });
});


/*********************************************************
  INICIAR CARRUSEL
*********************************************************/
function iniciarCarrusel(nombre) {
  const car = carruseles[nombre];

  car.container = document.getElementById(car.slides);
  car.slidesList = [...document.querySelectorAll(`#${car.slides} .slide`)];
  car.total = car.slidesList.length;
  car.dotsContainer = document.getElementById(car.dots);

  car.dotsContainer.innerHTML = "";
  car.slidesList.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(nombre, i);
    car.dotsContainer.appendChild(dot);
  });

  car.dotsList = [...car.dotsContainer.querySelectorAll(".dot")];

  actualizarCarrusel(nombre);

  car.interval = setInterval(() => moverSlide(nombre, 1), car.delay);
}


/*********************************************************
  ACTUALIZAR CARRUSEL
*********************************************************/
function actualizarCarrusel(nombre) {
  const car = carruseles[nombre];

  car.slidesList.forEach(s => s.classList.remove("active", "prev", "next"));
  car.dotsList.forEach(d => d.classList.remove("active"));

  car.slidesList[car.index].classList.add("active");
  car.dotsList[car.index].classList.add("active");

  let prev = (car.index - 1 + car.total) % car.total;
  let next = (car.index + 1) % car.total;

  car.slidesList[prev].classList.add("prev");
  car.slidesList[next].classList.add("next");

  const offset = -car.index * 300 + (900 - 300) / 2;
  car.container.style.transform = `translateX(${offset}px)`;
}


/*********************************************************
  IR A UNA DIAPOSITIVA
*********************************************************/
function goToSlide(nombre, index) {
  carruseles[nombre].index = index;
  actualizarCarrusel(nombre);
}


/*********************************************************
  MOVER SLIDE CON FLECHAS
*********************************************************/
function moverSlide(nombre, step) {
  const car = carruseles[nombre];

  car.index = (car.index + step + car.total) % car.total;
  actualizarCarrusel(nombre);
}


/*********************************************************
  PAUSAR AUTOPLAY AL PASAR MOUSE
*********************************************************/
document.addEventListener("mouseover", e => {
  const carName = e.target.closest(".carousel")?.dataset.car;
  if (carName && carruseles[carName]) {
    clearInterval(carruseles[carName].interval);
  }
});

document.addEventListener("mouseout", e => {
  const carName = e.target.closest(".carousel")?.dataset.car;
  if (carName && carruseles[carName]) {
    const car = carruseles[carName];
    car.interval = setInterval(() => moverSlide(carName, 1), car.delay);
  }
});
