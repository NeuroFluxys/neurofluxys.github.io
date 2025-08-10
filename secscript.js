document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Tüm videoları durdur
  function pauseAllVideos() {
    document.querySelectorAll('video').forEach(video => {
      video.pause();
    });
  }
  
  // Slider'ı belirtilen slayta götür
  function goToSlide(slideIndex) {
    // Önce tüm videoları durdur
    pauseAllVideos();
    
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
    
    // Dots güncelleme
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Yeni slayttaki videoyu oynat (eğer video varsa)
    const currentVideo = slides[currentSlide].querySelector('video');
    if (currentVideo) {
      // Kullanıcı etkileşimi olmadan oynatmayı deneyelim
      const playPromise = currentVideo.play();
      
      // Eğer otomatik oynatma engellenirse
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Otomatik oynatma izni yoksa, sessiz oynatmayı dene
          currentVideo.muted = true;
          currentVideo.play();
        });
      }
    }
  }
  
  // Sonraki slayt
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
  }
  
  // Önceki slayt
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(currentSlide);
  }
  
  // Otomatik slayt geçişi
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Interval'i sıfırla
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  // Olay dinleyicileri
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      goToSlide(slideIndex);
      resetInterval();
    });
  });
  
  // Fare slayt üzerindeyken otomatik geçişi durdur
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    resetInterval();
  });
  
  // Video kontrollerini ayarla
  function setupVideoControls() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
      // Ses butonu oluştur
      const volumeBtn = document.createElement('button');
      volumeBtn.className = 'video-volume';
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      video.parentNode.appendChild(volumeBtn);
      
      // Varsayılan olarak sessiz
      video.muted = true;
      
      // Buton tıklama olayı
      volumeBtn.addEventListener('click', function() {
        video.muted = !video.muted;
        volumeBtn.innerHTML = video.muted 
          ? '<i class="fas fa-volume-mute"></i>' 
          : '<i class="fas fa-volume-up"></i>';
      });
    });
  }
  
  // Video kontrollerini başlat
  setupVideoControls();
  
  // İlk slayttaki videoyu başlat (eğer varsa)
  const firstVideo = slides[0].querySelector('video');
  if (firstVideo) {
    firstVideo.muted = true;
    firstVideo.play();
  }
});