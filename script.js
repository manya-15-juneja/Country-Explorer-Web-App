let allCountries = [];

async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags");
  const data = await response.json();
  allCountries = data;
  displayData(data);
}

fetchCountries();

// Display all Countries
function displayData(countries) {
  const container = document.getElementById("countries");
  container.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");

    card.innerHTML = `
      <img src="${country.flags.png}" width="100">
      <h3>${country.name.common}</h3>
      <p>Capital: ${country.capital?.[0] || "N/A"}</p>
      <p>Population: ${country.population}</p>
      <p>Region: ${country.region}</p>
    `;

    container.appendChild(card);
  });
}