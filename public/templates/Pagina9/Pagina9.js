document.addEventListener('DOMContentLoaded', function() {
    const detalleModal = document.getElementById('detalleModal');
    const closeBtn = document.querySelector('.close');
  
    const juegos = {
      1: {
        titulo: 'Aventura Épica',
        descripcion: 'Un juego de rol y aventura en un mundo de fantasía lleno de desafíos.',
        trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        fotos: [
          'https://via.placeholder.com/100x100?text=Aventura+1',
          'https://via.placeholder.com/100x100?text=Aventura+2'
        ],
        estrellas: 4,
        resenas: ['Muy entretenido', 'Excelentes gráficos', 'Historia envolvente']
      },
      2: {
        titulo: 'Carrera Extrema',
        descripcion: 'Velocidad al máximo en pistas extremas alrededor del mundo.',
        trailer: 'https://www.youtube.com/embed/3GwjfUFyY6M',
        fotos: [
          'https://via.placeholder.com/100x100?text=Carrera+1',
          'https://via.placeholder.com/100x100?text=Carrera+2'
        ],
        estrellas: 5,
        resenas: ['Adictivo!', 'La mejor experiencia de carreras', 'Muy realista']
      }
    };
  
    document.querySelectorAll('.btn-detalle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const gameId = this.parentElement.getAttribute('data-id');
        mostrarDetalle(juegos[gameId]);
      });
    });
  
    closeBtn.addEventListener('click', function() {
      detalleModal.style.display = 'none';
    });
  
    window.onclick = function(event) {
      if (event.target == detalleModal) {
        detalleModal.style.display = 'none';
      }
    };
  
    function mostrarDetalle(juego) {
      document.getElementById('detalle-titulo').textContent = juego.titulo;
      document.getElementById('detalle-descripcion').textContent = juego.descripcion;
      document.getElementById('detalle-trailer').src = juego.trailer;
  
      // Fotos
      const fotosDiv = document.getElementById('detalle-fotos');
      fotosDiv.innerHTML = '';
      juego.fotos.forEach(function(url) {
        const img = document.createElement('img');
        img.src = url;
        fotosDiv.appendChild(img);
      });
  
      // Estrellas
      const estrellasDiv = document.getElementById('detalle-estrellas');
      estrellasDiv.innerHTML = '';
      for (let i = 0; i < juego.estrellas; i++) {
        estrellasDiv.innerHTML += '<span class="star">★</span>';
      }
  
      // Reseñas
      const resenasDiv = document.getElementById('detalle-resenas');
      resenasDiv.innerHTML = '<h3>Reseñas:</h3><ul>' + juego.resenas.map(r => `<li>${r}</li>`).join('') + '</ul>';
  
      detalleModal.style.display = 'block';
    }
  });
  