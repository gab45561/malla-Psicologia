document.addEventListener('DOMContentLoaded', () => {
  // Habilitar materias sin correlativas
  document.querySelectorAll('.materia').forEach(materia => {
    if (materia.dataset.correlativas.trim() === "") {
      materia.classList.remove('bloqueada');
      materia.classList.add('habilitada');
    }
  });

  // Click para aprobar materias
  document.querySelectorAll('.materia').forEach(materia => {
    materia.addEventListener('click', () => {
      if (materia.classList.contains('habilitada')) {
        materia.classList.remove('habilitada');
        materia.classList.add('aprobada');
        desbloquearMaterias(parseInt(materia.dataset.id));
      } else if (materia.classList.contains('bloqueada')) {
        alert("Esta materia aún está bloqueada.");
      }
    });
  });
});

function desbloquearMaterias(aprobadaId) {
  document.querySelectorAll('.materia').forEach(materia => {
    if (materia.classList.contains('bloqueada')) {
      const correlativas = materia.dataset.correlativas
        .split(';')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

      if (correlativas.includes(aprobadaId)) {
        const allAprobadas = correlativas.every(corId => {
          const corMateria = document.querySelector(`.materia[data-id="${corId}"]`);
          return corMateria && corMateria.classList.contains('aprobada');
        });

        if (allAprobadas) {
          materia.classList.remove('bloqueada');
          materia.classList.add('habilitada');
        }
      }
    }
  });
}
