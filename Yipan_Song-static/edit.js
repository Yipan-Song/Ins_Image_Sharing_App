"use strict";

function editprofile() {
    document.getElementById("edit").onsubmit = function () {
        return checkEmail() && checkfirstname() &&checklastname() && checkphone();
    }
    document.getElementById("Email").onblur = checkEmail;
    document.getElementById("phone").onblur = checkphone;
    document.getElementById("firstname").onblur = checkfirstname;
    document.getElementById("lastname").onblur = checklastname;
}


function checkfirstname() {
    var firstname = document.getElementById("firstname").value;
    if (firstname){
    var check_firstname = /^[a-zA-Z]/;
    var check = check_firstname.test(firstname);
    var checkfirstname = document.getElementById("checkfirstname");
    if (check) {
        checkfirstname.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
    } else {
        checkfirstname.innerHTML = "Incorrect format!";
    }
    }
    else{var check = true;}
    return check;
}

function checklastname() {
    var lastname = document.getElementById("lastname").value;
    if (lastname) {
        var check_lastname = /^[a-zA-Z]/;
        var check = check_lastname.test(lastname);
        var checklastname = document.getElementById("checklastname");
        if (check) {
            checklastname.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
        } else {
            checklastname.innerHTML = "Incorrect format!";
        }
    }
    else {var check = true;}
    return check;
}

function checkPassword(){
    var password = document.getElementById("password").value;
    if (password) {
        var check_passlength = /^\w{7,15}$/;
        var check_password = /^([a-zA-Z0-9_-])/;
        var checkfir = check_passlength.test(password);
        var checksec = check_password.test(password);
        if (checkfir && checksec) {
            var check = true;
        } else {
            var check = false;
        }
        var checkpassword = document.getElementById("checkpassword");
        if (check) {
            checkpassword.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
        } else {
            checkpassword.innerHTML = "Incorrect format!";
        }
    }
    else {var check = true;}
    return check;
}

function checkEmail(){
    var email = document.getElementById("Email").value;
    if (email.length == 0){
        var check = true;
    }
    else {
        var check_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        var check = check_email.test(email);
        var checkemail = document.getElementById("checkemail");
        if (check) {
            checkemail.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
        } else {
            checkemail.innerHTML = "Incorrect format!";
        }
    }
    return check;
}

function checkphone(){
    var phone = document.getElementById("phone").value;
    if(phone) {
        var check_phone = /^[0-9]+$/;
        var check = check_phone.test(phone);
        var checkphone = document.getElementById("checkphone");

        if (check) {
            checkphone.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
        } else {
            checkphone.innerHTML = "Incorrect format!";
        }
    }
    else {var check = true;}
    return check;
}