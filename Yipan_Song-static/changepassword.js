"use strict";

function changepassword() {
    document.getElementById("change").onsubmit = function () {
        return  checkPassword() &&checkInputagain();
    }

    document.getElementById("newpassword").onblur = checkPassword;
    document.getElementById("inputagain").onblur = checkInputagain;
}
var check = false;
var confirmPassword = false;
var checksec = false;
function checkPassword() {
    var password = document.getElementById("newpassword").value;
    var check_passlength = /^\w{7,15}$/;
    var check_password = /^([a-zA-Z0-9_-])/;
    var checkfir = check_passlength.test(password);
    var checksec = check_password.test(password);
    if (checkfir && checksec){
        check = true;
    } else {
         check = false;
    }
    var checkpassword = document.getElementById("checkpassword");
    if(check){
        checknew.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
    }else{
        checknew.innerHTML = "Incorrect format!";
    }
    return check;

}
function checkInputagain() {
    var inputagain = document.getElementById("inputagain").value;
    var password = document.getElementById("newpassword").value;
    if(inputagain == password)
    {
        confirmPassword = true
    }
    if(check && confirmPassword)
    {
        checkagain.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
        checksec = true;

    }
    if(inputagain != password)
    {checkagain.innerHTML = " Two inputs are not the same!";}

    return checksec;
}

