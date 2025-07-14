const ramos = {
  "Fundamentos de Administración": [],
  "Introducción a la Comunicación": ["Semiótica", "Opinión Pública"],
  "Teoria y Tecnicas Publicitarias I": ["Creación Publicitaria II", "Teoria y Tecnicas Publicitarias II"],
  "Marketing": ["Comportamiento del Consumidor", "Estrategia Competitiva"],
  "Sociología": ["Comportamiento del Consumidor", "Recursos Humanos"],
  "Creación Publicitaria I": ["Creación Publicitaria II"],
  "Taller de Texto": ["Semiótica"],
  "Historia del Arte y del Diseño I": ["Historia del Arte y del Diseño II"],
  "Tecnología Gráfica": ["Taller Gráfico", "Tecnología de la Información"],
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
let estado = {}; // almacena el progreso

// Recuperar progreso desde localStorage si existe
if (localStorage.getItem("estadoRamos")) {
  estado = JSON.parse(localStorage.getItem("estadoRamos"));
} else {
  // Inicializar en falso
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
  div.addEventListener("click", () => aprobarRamo(ramo));
  mallaDiv.appendChild(div);

  // Marcar como aprobado si estaba guardado
  if (estado[ramo]) {
    div.classList.add("aprobado");
  }
}

// Desbloquear ramos según estado
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
  }
}

function aprobarRamo(ramo) {
  const div = document.querySelector(`[data-nombre="${ramo}"]`);
  if (!div.classList.contains("desbloqueado") || estado[ramo]) return;

  div.classList.add("aprobado");
  estado[ramo] = true;

  // Guardar en localStorage
  localStorage.setItem("estadoRamos", JSON.stringify(estado));

  // Desbloquear siguientes
  actualizarDesbloqueados();
}

// Inicializar desbloqueos al cargar
actualizarDesbloqueados();
