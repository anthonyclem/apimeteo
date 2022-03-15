/** @format */

const APIKEY = "a00378036a71c3d046617e79ba9e92b8";
const sky = document.getElementById("sky");
const wind = document.getElementById("wind");
const nebul = document.getElementById("nebul");
const temp = document.getElementById("temp");
const humi = document.getElementById("humi");
const value = document.getElementById("value");
const form = document.getElementById("form");
const title = document.getElementById("title");
const titlecountry = document.getElementById("title-country");
const temptom = document.getElementById("temp-tom");
const skytom = document.getElementById("sky-tom");
const temp2d = document.getElementById("temp-2d");
const sky2d = document.getElementById("sky-2d");

function handleIcon(classe, param) {
  //->(getElementByID, chemin)
  if (param.weather[0].description === "ciel dégagé") {
    classe.classList = "fas fa-sun";
  } else if (
    param.weather[0].description === "partiellement nuageux" ||
    param.weather[0].description === "peu nuageux"
  ) {
    classe.classList = "fas fa-cloud-sun";
  } else if (
    param.weather[0].description === "couvert" ||
    param.weather[0].description === "nuageux"
  ) {
    classe.classList = "fas fa-cloud";
  } else if (
    param.weather[0].description === "légère pluie" ||
    param.weather[0].description === "pluie modérée"
  ) {
    classe.classList = "fas fa-cloud-sun-rain";
  } else if (data.weather[0].description === "pluie") {
    classe.classList = "fas fa-cloud-showers-heavy";
  } else {
    classe.classList = "fas fa-times";
  }
}

function apiCall(city) {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKEY +
    "&units=metric&lang=fr";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      handleIcon(sky, data); //(data.weather[0].description === "ciel dégagé")...
      let tempe = Math.round(data.main.temp);
      temp.textContent = tempe + "°C";

      wind.textContent = " " + data.wind.speed + " km/h";
      humi.textContent = " " + data.main.humidity + "%";
      nebul.textContent = " " + data.clouds.all + "%";
      titlecountry.textContent = " " + data.sys.country;

      lat = data.coord.lat;
      lon = data.coord.lon;

      let url2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=alerts&appid=" +
        APIKEY +
        "&units=metric&lang=fr";

      fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          handleIcon(skytom, data.daily[0]);
          handleIcon(sky2d, data.daily[1]);

          let tempetom = Math.round(data.daily[0].temp.day);
          temptom.textContent = tempetom + "°C";

          let tempe2d = Math.round(data.daily[1].temp.day);
          temp2d.textContent = tempe2d + "°C";
        });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (value.value !== "") {
    let vill = value.value;
    let ville = vill.charAt(0).toUpperCase() + vill.slice(1); //Met en MAJ la première lettre

    title.textContent = ville;
    value.value = "";
    apiCall(ville);
  }
});

apiCall("Paris");
