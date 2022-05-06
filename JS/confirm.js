let area = document.getElementById("final")

let lname = sessionStorage.getItem("name");
let lemail = sessionStorage.getItem("email");
let lmail = sessionStorage.getItem("mail");
let lcity = sessionStorage.getItem("city");
let lstate = sessionStorage.getItem("state");
let lpcode = sessionStorage.getItem("pcode");
let lpay = sessionStorage.getItem("pay");
let lprice= sessionStorage.getItem("totalPrice")

area.innerHTML = `
    <h1>Thank You for Renting With Us ${lname}</h1> <br>
    <h2>Your Total is : ${lprice}, payment method: ${lpay}</h2><br>
    <h2>Reciept sent to ${lemail}</h2><br>
    <h2>all important infomation will be sent to ${lmail}</h2><br>
    <h2>${lcity}, ${lstate}, ${lpcode}</h2><br>
    <button onclick="reset()"> Finish and Go Back to Home Page</button>
`


function reset(){
    sessionStorage.clear();
    window.location.href = "Hertz-UTS/index.html";
}