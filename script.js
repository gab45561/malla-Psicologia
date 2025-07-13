document.querySelectorAll('.materia').forEach(materia => {
  materia.addEventListener('click', () => {
    if (materia.classList.contains('habilitada')) {
      materia.classList.remove('habilitada');
      materia.classList.add('aprobada');
      desbloquearMaterias(parseInt(materia.dataset.id));
    }
  });
});

// Al inicio, marcar las materias sin correlativas como habilitadas
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.materia').forEach(materia => {
    if (materia.dataset.correlativas === "") {
      materia.classList.remove('bloqueada');
      materia.classList.add('habilitada');
    }
  });
});

function desbloquearMaterias(aprobadaId) {
  document.querySelectorAll('.materia').forEach(materia => {
    if (materia.classList.contains('bloqueada')) {
      const correlativas = materia.dataset.correlativas.split(';').map(Number);
      if (correlativas.includes(aprobadaId)) {
        // Verifica si todas sus correlativas están aprobadas
        const allAprobadas = correlativas.every(corId => {
          return document.querySelector(`.materia[data-id="${corId}"]`).classList.contains('aprobada');
        });
        if (allAprobadas) {
          materia.classList.remove('bloqueada');
          materia.classList.add('habilitada');
        }
      }
    }
  });
}
