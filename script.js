const dependencias = {
  "Semiótica": ["Introducción a la Comunicación", "Taller de Texto"],
  "Opinión Pública": ["Introducción a la Comunicación"],
  "Creación Publicitaria II": ["Teoria y Tecnicas Publicitarias I", "Creación Publicitaria I"],
  "Teoría y Técnicas Publicitarias II": ["Teoria y Tecnicas Publicitarias I", "Creación Publicitaria II"],
  "Comunicación Profesional": ["Informatica", "Semiótica", "Creación Publicitaria II"],
  "Estrategia de Medios": ["Teoría y Técnicas Publicitarias II", "Taller Audiovisual"],
  "Planificación de Campañas Publicitarias": ["Taller Gráfico", "Taller de Radio", "Comunicación Profesional", "Taller Audiovisual", "Estrategia de Medios", "Sistema de Investigación de Mercados"],
  "Seminario": ["Planificación de Campañas Publicitarias", "Comunicación Profesional", "Sistema de Investigación de Mercados", "Estrategia de Medios", "Comunicación Institucional", "Estrategia Competitiva"],
  "Sistema de Investigación de Mercados": ["Inglés Técnico"],
  "Comunicación Institucional": ["Semiótica", "Inglés Técnico"],
  "Estrategia de Producto": ["Sistema de Investigación de Mercados"],
  "Recursos Humanos": ["Sociología", "Psicóloga Social"],
  "Tecnología de la Información": ["Tecnología Gráfica", "Tecnología Radial", "Tecnología Audiovisual"],
  "Comportamiento del Consumidor": ["Sociología"],
  "Estrategia Competitiva": ["Marketing"],
  "Historia del Arte y del Diseño II": ["Historia del Arte y del Diseño I"],
  "Taller de Radio": ["Tecnología Radial"],
  "Taller Audiovisual": ["Tecnología Audiovisual"]
};

const estado = localStorage.getItem("estadoRamos") ? JSON.parse(localStorage.getItem("estadoRamos")) : {};

function actualizarEstado() {
  for (const div of document.querySelectorAll(".ramo")) {
    const nombre = div.dataset.nombre;
    let bloqueado = false;
    for (const [ramo, prereqs] of Object.entries(dependencias)) {
      if (ramo === nombre) {
        for (const prereq of prereqs) {
          if (!estado[prereq]) {
            bloqueado = true;
            break;
          }
        }
      }
    }
    if (!bloqueado) {
      div.classList.remove("bloqueado");
    } else {
      div.classList.add("bloqueado");
    }

    if (estado[nombre]) {
      div.classList.add("aprobado");
    } else {
      div.classList.remove("aprobado");
    }
  }
}

function toggleRamo(nombre) {
  const div = document.querySelector(`[data-nombre="${nombre}"]`);
  if (div.classList.contains("bloqueado")) return;

  estado[nombre] = !estado[nombre];
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
  actualizarEstado();
}

document.querySelectorAll(".ramo").forEach(div => {
  div.addEventListener("click", () => toggleRamo(div.dataset.nombre));
});

// Inicial
actualizarEstado();
