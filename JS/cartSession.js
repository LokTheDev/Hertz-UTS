window.onload = setTimeout(function () {
  document.getElementById("loadingGif").remove();
  getSession();
}, 1500);

function getSession() {
  let getArray = JSON.parse(sessionStorage.getItem("cartArray"));
  //put Array into
  //if no storage
  if (!getArray) {
    alert("No car has been reserved");
    sessionStorage.clear();
    //redirect to page 1 ***********
    window.location.href = "Hertz-UTS/index.html";
    return;
  }
  //if remove all storage and reload..
  if (typeof(getArray[0]) != "number") {
    alert("No car has been reserved");
    sessionStorage.clear();
    //redirect to page 1 ***********
    window.location.href = "Hertz-UTS/index.html";
    return;
  }
  //assign HASH MAP
  let map = {};
  for (let i = 0; i < getArray.length; i++) {
    map[getArray[i]] = 1;
  }
  //get Object list from JSON using AJAX

  var object;
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "./JS/cars.json", true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      object = JSON.parse(xhttp.responseText);
      document.getElementsByClassName("cartCase")[0].innerHTML += `
      <div class="Content">                  
                  <div calss="contentCol"><h3>Image</h3></div>
                  <div calss="contentCol"><h3>Model</h3></div>
                  <div calss="contentCol"><h3>Description</h3></div>
                  <div calss="contentCol"><h3>Price/Day</h3></div>
                  <div calss="contentCol"><h3>Rental Days</h3></div>
                  <div calss="contentCol"><h3>Action</h3></div>

      </div>
      `
      for (let i = 0; i < object.length; i++) {
        //if item exist in map = selected -> create elements
        if (map[object[i].id] != undefined && object[i].Availability) {
          document.getElementsByClassName("cartCase")[0].innerHTML += `
              <div class="selected" value=${i}>
                  <img class="carImg" src="./images/${object[i].Model}.jpeg">
                  <div class="carInfo">
                  <div calss="cartItem">${object[i].ModelYear} -- ${object[i].Model}</div>
                  <div class="cartItem">${object[i].Description}</div>
                  <div class="cartItem price">${object[i].PricePerDay}</div>
                  <input type="number" min="0" class="amount">
                <button onClick="removeItem(${i}, ${object[i].id})">
                Remove
                </button>
                </div>
              </div>
              `;
        }
        //if JSON updated availablity -> remove not available item
        if(!object[i].Availability){
          removeItem(null, object[i].id)
        }
      }
    }
  };
  xhttp.send();
  document.getElementById("checkOutBtn").disabled = false
}

//This function can remove item from session storage and remov element in HTML
function removeItem(classValue, carID) {
  //use classValue to identify which class to delete
  let a = document.getElementsByClassName("selected");
  for (let i = 0; i < a.length; i++) {
    if (classValue == a[i].getAttribute("value")) {
      a[i].remove();
    }
  }
  //use carID to identify which carID to delete in session Array
  let newArray = JSON.parse(sessionStorage.getItem("cartArray"));
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] == carID) {
      newArray = newArray.filter(function (e) {
        return e !== carID;
      });
      sessionStorage.setItem("cartArray", JSON.stringify(newArray));
    }
  }
  //show no item
  if (newArray.length == 0) {
    document.getElementsByClassName("cartCase")[0].innerHTML =
      "No car has been reserved";
  }
}

//This function will cal the price of each car and store in the session.
function sumAmount() {
  let amount = document.getElementsByClassName("amount");
  //check amount > 0
  for (let i = 0; i < amount.length; i++) {
    if (amount[i].value == 0) {
      alert("Rental Days cannot be 0");
      return
    }
  }
  let price = document.getElementsByClassName("price");
  let sum = 0;
  for (let i = 0; i < amount.length; i++) {
    sum += eval(amount[i].value * price[i].innerHTML);
    sessionStorage.setItem("totalPrice", sum);
  }
  window.location.href = "Hertz-UTS/checkout.html";

}
