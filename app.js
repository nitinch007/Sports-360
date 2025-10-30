document.addEventListener('DOMContentLoaded', function() {

  //  Mobile Menu Toggle

  var menuBtn = document.querySelector('.nav-toggle');
  var menuLinks = document.querySelector('.nav-links');
  if (menuBtn && menuLinks) {
    menuBtn.addEventListener('click', function() {
      const isOpen = menuLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
  }


  //  Highlight Current Nav Link

  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href').includes(page)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  //  News Page Search

  var searchBox = document.getElementById('newsSearch');
  if (searchBox) {
    var newsItems = document.querySelectorAll('.news-item');
    var noResultMsg = document.createElement('p');
    noResultMsg.className = 'muted';
    noResultMsg.textContent = 'No news results found.';

    searchBox.addEventListener('input', function() {
      var searchText = searchBox.value.toLowerCase();
      var found = 0;
      newsItems.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(searchText)) {
          item.style.display = '';
          found++;
        } else {
          item.style.display = 'none';
        }
      });
      var parent = newsItems[0]?.parentElement;
      if (parent) {
        if (found === 0 && !parent.contains(noResultMsg)) parent.appendChild(noResultMsg);
        else if (found > 0 && parent.contains(noResultMsg)) parent.removeChild(noResultMsg);
      }
    });
  }


  //  Players Page Search

  var playerSearch = document.getElementById('playerSearch');
  if (playerSearch) {
    var playerCards = document.querySelectorAll('.player-card');
    var noPlayerMsg = document.createElement('p');
    noPlayerMsg.className = 'muted';
    noPlayerMsg.textContent = 'No players found.';

    playerSearch.addEventListener('input', function() {
      var term = playerSearch.value.toLowerCase();
      var found = 0;
      playerCards.forEach(function(card) {
        if (card.textContent.toLowerCase().includes(term)) {
          card.style.display = '';
          found++;
        } else {
          card.style.display = 'none';
        }
      });
      var parent = playerCards[0]?.parentElement;
      if (parent) {
        if (found === 0 && !parent.contains(noPlayerMsg)) parent.appendChild(noPlayerMsg);
        else if (found > 0 && parent.contains(noPlayerMsg)) parent.removeChild(noPlayerMsg);
      }
    });
  }


  //  Matches Page Filter

  var matchFilter = document.getElementById('matchSportFilter');
  if (matchFilter) {
    var rows = document.querySelectorAll('.table tbody tr');
    matchFilter.addEventListener('change', function() {
      var selected = matchFilter.value;
      rows.forEach(row => {
        var sport = row.dataset.sport;
        row.style.display = (selected === 'all' || sport === selected) ? '' : 'none';
      });
    });
  }


  //  Community Page Form

  var communityForm = document.getElementById('communityForm');
  if (communityForm) {
    var output = document.getElementById('formOutput');
    communityForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var sport = document.getElementById('sport').value;
      var event = document.getElementById('event').value;

      if (name && email) {
        output.textContent = `✅ Thank you, ${name}! You’re registered for the ${event} (${sport}).`;
        communityForm.reset();
      } else {
        output.textContent = '⚠️ Please fill out all required fields.';
      }
    });
  }

  //  Text-to-Speech Toggle

  const ttsButton = document.getElementById('tts-btn');
  if (ttsButton) {
    ttsButton.addEventListener('click', function() {
      // If it's already speaking, cancel it and reset the button
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        ttsButton.innerHTML = '🔊 Listen';
        ttsButton.setAttribute('aria-label', 'Listen to page content');
        return;
      }

      const content = document.querySelector('main.container')?.innerText;
      if (content) {
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.onend = () => { // Reset button when speech finishes
          ttsButton.innerHTML = '🔊 Listen';
          ttsButton.setAttribute('aria-label', 'Listen to page content');
        };
        window.speechSynthesis.speak(utterance);
        ttsButton.innerHTML = '⏹️ Stop';
        ttsButton.setAttribute('aria-label', 'Stop listening');
      }
    });
  }

  //  Slideshow on Home Page

  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    const prevBtn = slideshow.querySelector('.prev');
    const nextBtn = slideshow.querySelector('.next');
    let currentIndex = 0;
    let intervalId = null;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };
    
    const startSlideshow = () => {
      stopSlideshow(); // Ensure no multiple intervals are running
      intervalId = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    };

    const stopSlideshow = () => {
      clearInterval(intervalId);
    };

    nextBtn.addEventListener('click', () => {
      nextSlide();
      startSlideshow(); // Reset timer
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      startSlideshow(); // Reset timer
    });

    // Pause on hover for better user experience
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);

    startSlideshow(); // Start the slideshow automatically
  }
});
