async function fetchNewestAnime() {
  try {
      const response = await fetch('https://api.jikan.moe/v4/seasons/now');
      const data = await response.json();
      const animeContainer = document.getElementById('newest-anime');
      animeContainer.innerHTML = data.data.slice(0, 8).map(anime => `
          <div class="anime-card">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
              <h4>${anime.title}</h4>
              <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : ''}</p>
          </div>
      `).join('');
  } catch (error) {
      console.error('Error fetching newest anime:', error);
  }
}

async function searchAnime() {
  const query = document.getElementById('search-query').value;
  try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=8`);
      const data = await response.json();
      const searchResults = document.getElementById('search-results');
      searchResults.innerHTML = data.data.map(anime => `
          <div class="anime-card">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
              <h4>${anime.title}</h4>
              <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : ''}</p>
          </div>
      `).join('');
  } catch (error) {
      console.error('Error searching anime:', error);
  }
}

async function fetchPopularAnime() {
  try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime');
      const data = await response.json();
      const animeContainer = document.getElementById('popular-anime');
      animeContainer.innerHTML = data.data.slice(0, 8).map(anime => `
          <div class="anime-card">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
              <h4>${anime.title}</h4>
              <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : ''}</p>
          </div>
      `).join('');
  } catch (error) {
      console.error('Error fetching popular anime:', error);
  }
}

async function fetchUpcomingAnime() {
  try {
      const response = await fetch('https://api.jikan.moe/v4/seasons/upcoming');
      const data = await response.json();
      const animeContainer = document.getElementById('upcoming-anime');
      animeContainer.innerHTML = data.data.slice(0, 8).map(anime => `
          <div class="anime-card">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
              <h4>${anime.title}</h4>
              <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : ''}</p>
          </div>
      `).join('');
  } catch (error) {
      console.error('Error fetching upcoming anime:', error);
  }
}

document.getElementById('signup-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;

  if (localStorage.getItem(username)) {
      document.getElementById('signup-error-message').textContent = "Username already exists. Please choose another.";
  } else {
      localStorage.setItem(username, password);
      alert('Sign up successful! You can now log in.');
      window.location.href = 'login.html';
  }
});

document.getElementById('login-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedPassword = localStorage.getItem(username);

  if (!storedPassword) {
      document.getElementById('error-message').textContent = "No such user. Please sign up first.";
      setTimeout(() => {
          window.location.href = 'signup.html';
      }, 2000);
  } else if (storedPassword === password) {
      alert('Login successful!');
      window.location.href = 'index.html';
  } else {
      document.getElementById('error-message').textContent = "Incorrect password. Please try again.";
  }
}); 

if (document.getElementById('newest-anime')) {
  fetchNewestAnime();
}

if (document.getElementById('popular-anime')) {
  fetchPopularAnime();
}

if (document.getElementById('upcoming-anime')) {
  fetchUpcomingAnime();
}