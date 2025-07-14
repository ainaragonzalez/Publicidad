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
const estado = {}; // guarda qué ramos están aprobados

// Crear los cuadros
for (const ramo in ramos) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo;
  div.dataset.nombre = ramo;
  div.addEventListener("click", () => aprobarRamo(ramo));
  mallaDiv.appendChild(div);
  estado[ramo] = false; // al principio todo bloqueado
}

// Inicialmente desbloquear los que no tienen prerequisitos
for (const ramo in ramos) {
  let bloqueado = false;
  for (const prereqs in ramos) {
    if (ramos[prereqs].includes(ramo)) {
      bloqueado = true;
      break;
    }
  }
  if (!bloqueado) {
    document.querySelector(`[data-nombre="${ramo}"]`).classList.add("desbloqueado");
  }
}

function aprobarRamo(ramo) {
  const div = document.querySelector(`[data-nombre="${ramo}"]`);
  if (!div.classList.contains("desbloqueado") || estado[ramo]) return;

  div.classList.add("aprobado");
  estado[ramo] = true;

  // Desbloquear los ramos dependientes
  ramos[ramo].forEach(dep => {
    const depDiv = document.querySelector(`[data-nombre="${dep}"]`);
    if (!depDiv.classList.contains("desbloqueado")) {
      depDiv.classList.add("desbloqueado");
    }
  });
}

