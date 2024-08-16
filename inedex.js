const API = "https://restcountries.com/v3.1/all";
let container = document.getElementById("container");
let searchForm = document.querySelector("form");
const total=document.getElementById("total");;
const result=document.getElementById("result")
let fetchedData = [];
asyncFetch();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchParams = searchForm.search.value;

  let filtered = fetchedData.filter((element) => {
    if (
      element.continent.includes(searchParams) ===
      true
    ) {
      return Display;
    } else {
      return false;
    }
  });
  result.innerText=`Result:- ${filtered.length}`
  Display(filtered);
});

function thenFetch() {
  fetch(API)
    .then((request) => {
      return request.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function asyncFetch() {
  try {
    let request = await fetch(API);
    let data = await request.json();
    fetchedData = data.map(function (element) {
      return {
        name: element.name.official,
        population: element.population,
        continent: element.continents[0],
        flag: element.flags.png,
      };
    });
    total.innerText = `Total Flags ${fetchedData.length}`
    console.log(fetchedData);
    Display(fetchedData);
  } catch (error) {
    console.log(error);
  }
}
function Display(data) {
  container.innerHTML = null
  data.forEach(element => {
    let card = document.createElement("div");

    let img = document.createElement("img");
    img.setAttribute("src", element.flag);

    let name = document.createElement("h2");
    name.innerText = element.name;

    let population = document.createElement("p");
    population.textContent = element.population;

    let continent = document.createElement("p");
    continent.innerText = element.continent;

    card.append(img, name, population, continent);
    container.append(card);
  });
}

console.log(data)