const ramos = {
  "Fundamentos de Administración": [],
  "Introducción a la Comunicación": ["Semiótica", "Opinión Pública"],
  "Teoria y Tecnicas Publicitarias I": ["Creación Publicitaria II", "Teoria y Tecnicas Publicitarias II"],
  "Marketing": ["Comportamiento del Consumidor", "Estrategia Competitiva"],
  "Sociología": ["Comportamiento del Consumidor", "Recursos Humanos"],
  "Creación Publicitaria I": ["Creación Publicitaria II"],
  "Taller de Texto": ["Semiótica"],
  "Historia del Arte y del Diseño I": ["Historia del Arte y del Diseño II"],
  "Tecnología Gráfica": ["Taller Grafico", "Tecnología de la Información"],
  "Creación Publicitaria II": ["Teoria y Tecnicas Publicitarias II", "Comunicación Profesional"],
  "Informatica": ["Comunicación Profesional"],
  "Historia del Arte y del Diseño II": [],
  "Tecnología Radial": ["Taller de Radio", "Tecnología de la Información"],
  "Taller Grafico": ["Planificación de Campañas Publicitarias"],
  "Semiotica": ["Comunicación Profesional", "Comunicación Institucional"],
  "Teoría y Técnicas Publicitarias II": ["Estrategia de Medios"],
  "Tecnología Audiovisual": ["Taller Audiovisual", "Tecnología de la Información"],
  "Taller de Radio": ["Planificación de Campañas Publicitarias"],
  "Comunicación Profesional": ["Planificación de Campañas Publicitarias", "Seminario"],
  "Taller Audiovisual": ["Estrategia de Medios", "Planificación de Campañas Publicitarias"],
  "Estadística": ["Comportamiento del Consumidor"],
  "Principios de Economía": [],
  "Comportamiento del Consumidor": [],
  "Sistema de Investigación de Mercados": ["Estrategia de Producto", "Planificación de Campañas Publicitarias", "Seminario"],
  "Psicóloga Social": ["Tecnicas de Negociación", "Recursos Humanos"],
  "Estrategia de Medios": ["Planificación de Campañas Publicitarias", "Seminario"],
  "Estrategia Competitiva": ["Seminario"],
  "Inglés Técnico": ["Sistema de Investigación de Mercados", "Comunicación Institucional"],
  "Técnicas de Negociación": [],
  "Derecho": [],
  "Estrategia de Producto": [],
  "Planificación de Campañas Publicitarias": ["Seminario"],
  "Comunicación Institucional": ["Seminario"],
  "Opinión Pública": [],
  "Seminario": [],
  "Recursos Humanos": [],
  "Tecnología de la Información": [],
  "Agenda Internacional": []
};

const mallaDiv = document.getElementById("malla");
let estado = {}; // Guarda el estado de cada ramo

// Recuperar del localStorage si existe
if (localStorage.getItem("estadoRamos")) {
  estado = JSON.parse(localStorage.getItem("estadoRamos"));
} else {
  for (const ramo in ramos) {
    estado[ramo] = false;
  }
}

// Crear los cuadros
for (const ramo in ramos) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo;
  div.dataset.nombre = ramo;
  div.addEventListener("click", () => toggleRamo(ramo));
  mallaDiv.appendChild(div);
}

// Actualizar desbloqueos
function actualizarDesbloqueados() {
  for (const ramo in ramos) {
    const div = document.querySelector(`[data-nombre="${ramo}"]`);
    let bloqueado = false;
    for (const prereqs in ramos) {
      if (ramos[prereqs].includes(ramo) && !estado[prereqs]) {
        bloqueado = true;
        break;
      }
    }
    if (!bloqueado) {
      div.classList.add("desbloqueado");
    } else {
      div.classList.remove("desbloqueado");
    }

    // Visual
    if (estado[ramo]) {
      div.classList.add("aprobado");
    } else {
      div.classList.remove("aprobado");
    }
  }
}

// Alternar aprobar/desaprobar
function toggleRamo(ramo) {
  const div = document.querySelector(`[data-nombre="${ramo}"]`);
  if (!div.classList.contains("desbloqueado") && !estado[ramo]) return;

  estado[ramo] = !estado[ramo]; // Cambiar estado

  // Guardar
  localStorage.setItem("estadoRamos", JSON.stringify(estado));

  // Actualizar desbloqueos y visual
  actualizarDesbloqueados();
}

// Inicial
actualizarDesbloqueados();
