// 🚀 MALLA INTERACTIVA DE PSICOLOGÍA
// Lógica para habilitar materias y desbloquear correlativas especiales

// 1️⃣ Al cargar la página: habilita materias sin correlativas y configura clics
document.querySelectorAll('.materia').forEach(materia => {
  // Si no tiene correlativas => habilitada
  if (materia.dataset.correlativas.trim() === "") {
    materia.classList.remove('bloqueada');
    materia.classList.add('habilitada');
  }

  // Cada materia escucha clic
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

// 2️⃣ Función que desbloquea materias dependientes y casos especiales
function desbloquearMaterias(aprobadaId) {
  document.querySelectorAll('.materia').forEach(materia => {
    if (materia.classList.contains('bloqueada')) {
      let correlativas = materia.dataset.correlativas
        .split(';')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

      const materiaId = materia.dataset.id;

      // ✅ CASO GENERAL: materias normales
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
      // ✅ CASO ESPECIAL: materias 36, 37, 38 (Prácticas + Taller)
      else {
        let requisitos = true;

        // 1° a 3° año completo (id 1 a 26)
        for (let id = 1; id <= 26; id++) {
          const mat = document.querySelector(`.materia[data-id="${id}"]`);
          if (!mat || !mat.classList.contains('aprobada')) {
            requisitos = false;
            break;
          }
        }

        // Materias adicionales obligatorias
        if (materiaId === "36") {
          [27, 28].forEach(id => {
            const mat = document.querySelector(`.materia[data-id="${id}"]`);
            if (!mat || !mat.classList.contains('aprobada')) requisitos = false;
          });
        }

        if (materiaId === "37" || materiaId === "38") {
          [27, 28, 34, 35].forEach(id => {
            const mat = document.querySelector(`.materia[data-id="${id}"]`);
            if (!mat || !mat.classList.contains('aprobada')) requisitos = false;
          });
        }

        // Al menos una orientación aprobada: 30 o 32 o 33
        const orientacionOk = [30, 32, 33].some(id => {
          const mat = document.querySelector(`.materia[data-id="${id}"]`);
          return mat && mat.classList.contains('aprobada');
        });

        if (!orientacionOk) requisitos = false;

        // Si todo cumple, habilita
        if (requisitos) {
          materia.classList.remove('bloqueada');
          materia.classList.add('habilitada');
        }
      }
    }
  });
}
