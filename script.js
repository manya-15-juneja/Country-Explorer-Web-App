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


function applyFilters(){
  let result=[...allCountries];
  const searchValue=document.getElementById("search").value.toLowerCase();
  const regionValue=document.getElementById("regionFilter").value;
  const sortValue=document.getElementById("sort").value;

  //Search

  result=result.filter(c=>c.name.common.toLowerCase().includes(searchValue));

  //Filter

  if (regionValue){
    result = result.filter(c=>c.region===regionValue);

  }

  //sort

  if (sortValue ==="population"){
    result.sort((a,b)=>a.population - b.population);

  }else if(sortValue ==="name"){
    result.sort((a,b)=>a.name.common.localeCompare(b.name.common));
  }

  displayData(result);


}

document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("regionFilter").addEventListener("change", applyFilters);
document.getElementById("sort").addEventListener("change", applyFilters);

