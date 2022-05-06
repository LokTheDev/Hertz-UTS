//auto request Ajax after 3 second
window.onload = setTimeout(function () {
  loadDoc();
  document.getElementById("loadingGif").remove();
}, 1500);

//this function will get the data from cars.Json
function loadDoc() {
  var object;
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "./JS/cars.json", true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //get the CarSlider Show Case element
      const carSlider = document.getElementById("carSlider");
      //Parse xhttp.responseText to JSON instead of text
      object = JSON.parse(xhttp.responseText);

      object.forEach((car) => {
        carSlider.innerHTML += `
          <div class="carCard">
              <img class="carImg" src="./images/${car.Model}.jpeg">
              <div class="carDes">
              <div class=""><h3>${car.ModelYear}-${car.Model} - ${car.Brand}</h3></div>
              <div class="">Type: ${car.Category}</div>              
              <div class="">Mileage: ${car.Mileage}</div>
              <div class="">Fuel: ${car.FuelType}</div>
              <div class="">Seats: ${car.Seats}</div>
              <div class="">Price(Day): ${car.PricePerDay}</div>
              <div class="">Description: ${car.Description}</div>
            </div>
                          
            <button class="cardBtn" onClick="checkAvailavility(${car.id})" style=" background-color: ${checkColor(car.Availability)};
            ">
            Reserve
            </button>
          </div>
          `;
      });
    }
  };
  xhttp.send();
}

//Reservation Btn
let cartItem = 0

//change btn color base on availability
function checkColor(bool){
  if(!bool){
    return "red"
  }else{
    return "green"
  }
}