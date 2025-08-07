require('dotenv').config();
const apiKey = process.env.OMDB_API_KEY;
const searchBtn = document.getElementById('searchBtn');
const queryInput = document.getElementById('query');
const moviesContainer = document.getElementById('movies');

searchBtn.addEventListener('click', () => {
  const query = queryInput.value.trim();
  if (query !== '') {
    fetchMovies(query);
  }
});

async function fetchMovies(searchTerm) {
  const apiKey = 'YOUR_API_KEY'; // ← Replace with your actual OMDb API key
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    moviesContainer.innerHTML = '';

    if (data.Response === 'True') {
      data.Search.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=N/A";

        card.innerHTML = `
          <img src="${poster}" alt="${movie.Title}" />
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        `;

        moviesContainer.appendChild(card);
      });
    } else {
      moviesContainer.innerHTML = `<p>No movies found.</p>`;
    }
  } catch (error) {
    moviesContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    console.error(error);
  }
}
