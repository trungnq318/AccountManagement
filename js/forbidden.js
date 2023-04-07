$(function() {
    document.getElementById("statusCode").innerHTML = sessionStorage.getItem("STATUS");
    document.getElementById("error").innerHTML = sessionStorage.getItem("ERROR");
});