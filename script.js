function searchCharacter() {
  const characterName = document.getElementById('characterInput').value;
  if (characterName.trim() === '') {
      alert('Please enter a character name');
      return;
  }

  const apiUrl = `https://swapi.dev/api/people/?search=${characterName}`;
  
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          if (data.results.length > 0) {
              const character = data.results[0];
              displayCharacter(character);
              saveSearch(characterName);
          } else {  
              document.getElementById('result').innerHTML = 'Character not found';
          }
      })
      .catch(error => console.error('Error fetching data:', error));
}

function displayCharacter(character) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
      <h2>${character.name}</h2>
      <p>Height: ${character.height} cm</p>
      <p>Mass: ${character.mass} kg</p>
      <p>Hair Color: ${character.hair_color}</p>
  `;
}

let searchHistory = [];

function saveSearch(characterName) {
  if (!searchHistory.includes(characterName)) {
   searchHistory.push(characterName);
    updateSearchHistory();
  }
}

function updateSearchHistory() {
  const searchHistoryList = document.getElementById("searchHistory");
  searchHistoryList.innerHTML = "";

  searchHistory.forEach(searchTerm => {
    const listItem = document.createElement("li");
    listItem.textContent = searchTerm;
    listItem.addEventListener('click', () => {
      document.getElementById('characterInput').value = searchTerm;
      searchCharacter();
    });
    searchHistoryList.appendChild(listItem);
  });
}
