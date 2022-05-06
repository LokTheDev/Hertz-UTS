//Cart Item Count
let count = 0


function checkAvailavility(carID) {
    var object;
    var xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType("application/json");
    xhttp.open("GET", "./JS/cars.json", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        object = JSON.parse(xhttp.responseText);

        //loop through item and look for same carID and check Availability
        for(let i = 0; i < object.length;i++){
            if(object[i].id == carID){
                if(object[i].Availability){
                    count++
                    document.getElementById("cartNum").innerHTML = count
                    addCart(object[i].id)
                    alert("Add to the cart sucessfully")
                }else{
                    alert("Sorry,  the  car  is  not available now. Please try other cars")
                }
            }
            
        }
  
      }
    };
    xhttp.send();
  }

  let cartArray = [];
  function addCart(carID){
    cartArray.push(carID)
    sessionStorage.setItem("cartArray", JSON.stringify(cartArray));
  }