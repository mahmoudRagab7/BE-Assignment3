let form = document.getElementById("form1");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(document.getElementById('address').value)
  weatherFunction();
  form.reset();
});
const errorF = document.getElementById("error");
const locationF = document.getElementById("location");
const forecastF = document.getElementById("forecast");
const lat = document.getElementById("lat");
const lon = document.getElementById("lon");

// async --> function return promise
let weatherFunction = async () => {
  try {
    const address = document.getElementById("address").value;
    const res = await fetch("http://localhost:3000/weather?address=" + address);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorF.innerText = data.error;
      locationF.innerText = "";
      forecastF.innerText = "";
      lat.innerText = "";
      lon.innerText = "";
    } else {
      locationF.innerText = data.location;
      lat.style.visibility = "visible";
      lat.style.transitionDelay = "0.5s";
      lat.innerText = data.latitude;
      lon.style.visibility = "visible";
      lon.style.transitionDelay = "1s";
      lon.innerText = data.latitude;
      forecastF.style.visibility = "visible";
      forecastF.style.transitionDelay = "1.5s";
      forecastF.innerText = data.forecast;
      errorF.innerText = "";
    }
  } catch (e) {
    console.log(e);
  }
};

// 3
