// 🚀 MALLA INTERACTIVA DE PSICOLOGÍA
// Lógica general + verificación especial de 5° año

// 1️⃣ Habilitar materias sin correlativas
document.querySelectorAll('.materia').forEach(materia => {
  if (materia.dataset.correlativas.trim() === "") {
    materia.classList.remove('bloqueada');
    materia.classList.add('habilitada');
  }

  // Escucha clics para aprobar
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

// 2️⃣ Verificar correlativas normales + especiales
function desbloquearMaterias(aprobadaId) {
  document.querySelectorAll('.materia').forEach(materia => {
    if (materia.classList.contains('bloqueada')) {
      let correlativas = materia.dataset.correlativas
        .split(';')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

      const materiaId = materia.dataset.id;

      // CASO GENERAL
      if (materiaId !== "36" && materiaId !== "37" && materiaId !== "38") {
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
    }
  });

  // Verifica prácticas de 5° cada vez
  verificarPracticas();
}

// 3️⃣ Función para verificar prácticas de 5°
function verificarPracticas() {
  [36, 37, 38].forEach(practicaId => {
    const practica = document.querySelector(`.materia[data-id="${practicaId}"]`);
    if (practica) {
      let requisitos = true;

      // 1° a 3° año aprobado (1-26)
      for (let id = 1; id <= 26; id++) {
        const mat = document.querySelector(`.materia[data-id="${id}"]`);
        if (!mat || !mat.classList.contains('aprobada')) {
          requisitos = false;
          break;
        }
      }

      // Materias extra según práctica
      if (practicaId === 36) {
        [27, 28].forEach(id => {
          const mat = document.querySelector(`.materia[data-id="${id}"]`);
          if (!mat || !mat.classList.contains('aprobada')) requisitos = false;
        });
      }
      if (practicaId === 37 || practicaId === 38) {
        [27, 28, 34, 35].forEach(id => {
          const mat = document.querySelector(`.materia[data-id="${id}"]`);
          if (!mat || !mat.classList.contains('aprobada')) requisitos = false;
        });
      }

      // Al menos una orientación: 30, 32 o 33
      const orientacionOk = [30, 32, 33].some(id => {
        const mat = document.querySelector(`.materia[data-id="${id}"]`);
        return mat && mat.classList.contains('aprobada');
      });

      if (!orientacionOk) requisitos = false;

      // Aplica
      if (requisitos) {
        practica.classList.remove('bloqueada');
        practica.classList.add('habilitada');
      } else {
        practica.classList.remove('habilitada');
        practica.classList.add('bloqueada');
      }
    }
  });
}

