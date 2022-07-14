
const ImageLoaderWorker = new Worker('/javascript/workers/image-loader.js');

const imgElements = document.querySelectorAll('img[data-src]')

ImageLoaderWorker.addEventListener('message', event => {
  // Grab the message data from the event
  const imageData = event.data

//   console.log('We got a message back!', imageData)

  const imageElement = document.querySelector(`img[data-src='${imageData.imageURL}']`)

  const objectURL = URL.createObjectURL(imageData.blob)
  
  imageElement.setAttribute('src', objectURL)
  imageElement.removeAttribute('data-src')
})

imgElements.forEach(imageElement => {
  const imageURL = imageElement.getAttribute('data-src')
  ImageLoaderWorker.postMessage(imageURL)
})

// ===========================================================
let cards = $(document.querySelectorAll(".card"));
let days = $(document.querySelectorAll(".giorno"));
let weatherIcons = $(document.querySelectorAll(".icona-meteo"));
let descriptions = $(document.querySelectorAll(".card-descrizione"));
let maxTemps = $(document.querySelectorAll(".card-maxTemp"));
let minTemps = $(document.querySelectorAll(".card-minTemp"));

async function getTempo(city){
  var str="http://api.openweathermap.org/geo/1.0/direct?q=Milano&appid=e06672eb3d022cf9dbdffb18d384e515";
  var response = await
  fetch(str,
  {
      method:"GET"
  });
  var jsonData = await response.json();
  var lat = jsonData[0].lat.toPrecision(5);
  var lon = jsonData[0].lon.toPrecision(5);
  var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=e06672eb3d022cf9dbdffb18d384e515";
  var response = await
  fetch (url,
  {
      method:"GET"
  });
  var jsonData = await response.json();
  console.log(jsonData);
  var temperaturaCelsius = jsonData.main.temp-273.15;
  //document.getElementById("tempo").innerText = temperaturaCelsius.toPrecision(2)+"°";
  console.log(temperaturaCelsius);
}

getTempo("Milano");

console.log(days[0].innerText);