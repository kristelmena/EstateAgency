/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function(e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function(e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

// Función para guardar los datos en localStorage
function guardarDatosEnLocalStorage() {
  localStorage.setItem("email", document.getElementById("email").value);
  localStorage.setItem("nombre", document.getElementById("nombre").value);
  localStorage.setItem("fechaNacimiento", document.getElementById("fechaNacimiento").value);
  localStorage.setItem("salario", document.getElementById("salario").value);
  localStorage.setItem("valorVivienda", document.getElementById("valorvivienda").value);
  localStorage.setItem("montoSolicitar", document.getElementById("montoSolicitar").value);
  localStorage.setItem("plazo", document.getElementById("plazo").value);
}

// Función para cargar los datos desde localStorage
function cargarDatosDesdeLocalStorage() {
  if (localStorage.getItem("email")) {
    document.getElementById("email").value = localStorage.getItem("email");
    document.getElementById("nombre").value = localStorage.getItem("nombre");
    document.getElementById("fechaNacimiento").value = localStorage.getItem("fechaNacimiento");
    document.getElementById("salario").value = localStorage.getItem("salario");
    document.getElementById("valorvivienda").value = localStorage.getItem("valorVivienda");
    document.getElementById("montoSolicitar").value = localStorage.getItem("montoSolicitar");
    document.getElementById("plazo").value = localStorage.getItem("plazo");
    document.getElementById("plazoValue").textContent = localStorage.getItem("plazo");
  }
}

function calcularCredito() {
  let email = document.getElementById("email").value;
  let nombre = document.getElementById("nombre").value;
  let fechaNacimiento = document.getElementById("fechaNacimiento").value;
  let salario = parseFloat(document.getElementById("salario").value);
  let valorVivienda = parseFloat(document.getElementById("valorvivienda").value);
  let montoSolicitado = parseFloat(document.getElementById("montoSolicitar").value);
  let tasaInteresAnual = parseFloat(document.getElementById("tasaInteres").value) || 7.10;
  let plazoAnios = parseInt(document.getElementById("plazo").value);
  const plazoMeses = plazoAnios * 12;

  // Validar que el monto a solicitar no supere el 80% del valor de la vivienda
  const maxMontoSolicitar = valorVivienda * 0.8;
  if (montoSolicitado > maxMontoSolicitar) {
    alert("El monto a solicitar no puede exceder el 80% del valor de la vivienda.");
    document.getElementById("montoSolicitar").value = maxMontoSolicitar;
    return;
  }

  // Convertir la tasa de interés anual a tasa mensual
  const tasaInteresMensual = tasaInteresAnual / 12;

  // Calcular el pago mensual usando la fórmula
  let factor = Math.pow(1 + tasaInteresMensual / 100, plazoMeses);
  let pagoMensual = (montoSolicitado * (tasaInteresMensual / 100) * factor) / (factor - 1);

  // Calcular el salario mínimo requerido (cuota mensual / 0.40)
  let salarioMinimoRequerido = pagoMensual / 0.40;

  // Evaluaciones
  let edad = new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
  let evaluacionSalario = salario >= salarioMinimoRequerido ? "Monto de salario suficiente para el crédito" : "Monto de salario insuficiente";
  let evaluacionEdad = (edad > 22 && edad < 55) ? "Cliente con edad suficiente para crédito" : "Cliente no califica para crédito por edad";
  let porcentajeFinanciar = ((montoSolicitado / valorVivienda) * 100).toFixed(2) + "%";

  // Guardar datos en localStorage
  guardarDatosEnLocalStorage();

  // Mostrar resultados en la tabla
  document.getElementById("resultadoEmail").innerText = email;
  document.getElementById("resultadoNombre").innerText = nombre;
  document.getElementById("resultadoFechaNacimiento").innerText = fechaNacimiento;
  document.getElementById("resultadoSalarioNeto").innerText = salario.toLocaleString('en-US', { minimumFractionDigits: 2 });
  document.getElementById("resultadoValorVivienda").innerText = valorVivienda.toLocaleString('en-US', { minimumFractionDigits: 2 });
  document.getElementById("resultadoMontoSolicitar").innerText = montoSolicitado.toLocaleString('en-US', { minimumFractionDigits: 2 });
  document.getElementById("resultadoPlazo").innerText = plazoAnios;
  document.getElementById("resultadoTasaInteres").innerText = tasaInteresAnual.toFixed(2) + "%";
  document.getElementById("montoPagoMensual").innerText = pagoMensual.toLocaleString('en-US', { minimumFractionDigits: 2 });
  document.getElementById("salarioMinimoRequerido").innerText = salarioMinimoRequerido.toLocaleString('en-US', { minimumFractionDigits: 2 });
  document.getElementById("porcentajeFinanciar").innerText = porcentajeFinanciar;
  document.getElementById("evaluacionSalario").innerText = evaluacionSalario;
  document.getElementById("evaluacionEdad").innerText = evaluacionEdad;

  // Mostrar contenedor de resultados
  document.getElementById("resultados").style.display = "block";
}
// Cargar los datos cuando la página se carga
window.addEventListener("load", cargarDatosDesdeLocalStorage);

// Evento para el botón de cálculo
document.getElementById("calcularBtn").addEventListener("click", calcularCredito);

function calcularPagoMensual(monto, tasaInteresAnual, plazoMeses) {
  const tasaMensual = tasaInteresAnual / 12 / 100;
  return (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));
}

function interes(tasaMensual, mes, pagoMensual, montoSolicitado) {
  let vInteres = 0;
  let amortiza = montoSolicitado;

  for (let i = 1; i <= mes; i++) {
    vInteres = amortiza * (tasaMensual / 100);
    amortiza -= (pagoMensual - vInteres);
  }

  return vInteres;
}

// Evento para el botón "Mostrar Proyección"
document.getElementById("MostrarProyecciónBtn").addEventListener("click", () => {
  // Obtener valores del formulario
  let montoSolicitado = parseFloat(document.getElementById("montoSolicitar").value);
  let tasaInteresAnual = parseFloat(document.getElementById("tasaInteres").value) || 7.10;
  let plazoAnios = parseInt(document.getElementById("plazo").value);

  // Validaciones básicas
  if (isNaN(montoSolicitado) || montoSolicitado <= 0) {
    alert("Por favor ingrese un monto solicitado válido.");
    return;
  }
  if (isNaN(tasaInteresAnual) || tasaInteresAnual <= 0) {
    alert("Por favor ingrese una tasa de interés válida.");
    return;
  }
  if (isNaN(plazoAnios) || plazoAnios <= 0) {
    alert("Por favor ingrese un plazo en años válido.");
    return;
  }

  const plazoMeses = plazoAnios * 12; // Convertir años a meses

  // Llamar a la función con los valores obtenidos
  generarProyeccionCredito(montoSolicitado, tasaInteresAnual, plazoMeses);
});

function generarProyeccionCredito(montoSolicitado, tasaInteresAnual, plazoMeses) {
  const tasaMensual = tasaInteresAnual / 12;
  const pagoMensual = calcularPagoMensual(montoSolicitado, tasaInteresAnual, plazoMeses);
  let saldo = montoSolicitado;

  // Mostrar la tabla de proyección
  document.getElementById("proyeccionCredito").style.display = "block";
  
  // Limpiar el contenido previo
  const tablaBody = document.getElementById("tablaProyeccionBody");
  tablaBody.innerHTML = "";

  for (let mes = 1; mes <= plazoMeses; mes++) {
    const vInteres = interes(tasaMensual, mes, pagoMensual, saldo);
    const amortizacion = pagoMensual - vInteres;
    saldo -= amortizacion;

    // Formatear los números a dos decimales y con separadores de miles
    const pagoMensualFormateado = pagoMensual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const interesesFormateado = vInteres.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const amortizacionFormateado = amortizacion.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const saldoFormateado = saldo > 0 ? saldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00";

    // Crear una nueva fila en la tabla
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${mes}</td>
      <td>${pagoMensualFormateado}</td>
      <td>${interesesFormateado}</td>
      <td>${amortizacionFormateado}</td>
      <td>${saldoFormateado}</td>
    `;

    // Añadir la fila al cuerpo de la tabla
    tablaBody.appendChild(fila);

    // Romper el bucle después de 8 meses para coincidir con el ejemplo de la imagen
    if (mes === 8) break;
  }
}
