let total = sessionStorage.getItem("totalPrice");
const modal = document.querySelector("#modal")


function checkout(){
    //store all item for use
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let mail = document.getElementById("mail").value
    let city = document.getElementById("city").value
    let state = document.getElementById("state").value
    let pcode = document.getElementById("pCode").value
    let pay = document.getElementById("pay").value
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("mail", mail);
    sessionStorage.setItem("city", city);
    sessionStorage.setItem("state", state);
    sessionStorage.setItem("pcode", pcode);
    sessionStorage.setItem("pay", pay);

    return true
}