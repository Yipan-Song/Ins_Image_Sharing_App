"use strict";

function on() {
    document.getElementById("registerForm").onsubmit = function () {
        return checkUsername() && checkPassword() &&checkEmail() && checkfirstname() &&checklastname() && checkphone();
    }

    document.getElementById("username").onblur = checkUsername;
    document.getElementById("password").onblur = checkPassword;
    document.getElementById("Email").onblur = checkEmail;
    document.getElementById("phone").onblur = checkphone;
    document.getElementById("firstname").onblur = checkfirstname;
    document.getElementById("lastname").onblur = checklastname;
}


function checkUsername() {
    var username = document.getElementById("username").value;
    var check_username = /^([a-zA-Z0-9_-])/;
    var check = check_username.test(username);
    var checkusername = document.getElementById("checkusername");
    if (check) {
        checkusername.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
    } else {
        checkusername.innerHTML = "Incorrect format!";
    }
    return check;
}
function checkfirstname() {
    var firstname = document.getElementById("firstname").value;
    var check_firstname = /^[a-zA-Z]/;
    var check = check_firstname.test(firstname);
    var checkfirstname = document.getElementById("checkfirstname");
    if (check) {
        checkfirstname.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
    } else {
        checkfirstname.innerHTML = "Incorrect format!";
    }
    return check;
}

function checklastname() {
    var lastname = document.getElementById("lastname").value;
    var check_lastname = /^[a-zA-Z]/;
    var check = check_lastname.test(lastname);
    var checklastname = document.getElementById("checklastname");
    if (check) {
        checklastname.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
    } else {
        checklastname.innerHTML = "Incorrect format!";
    }
    return check;
}

function checkPassword(){
    var password = document.getElementById("password").value;
    var check_passlength = /^\w{7,15}$/;
    var check_password = /^([a-zA-Z0-9_-])/;
    var checkfir = check_passlength.test(password);
    var checksec = check_password.test(password);
    if (checkfir && checksec){
        var check = true;
    } else {
        var check = false;
    }
    var checkpassword = document.getElementById("checkpassword");
    if(check){
        checkpassword.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
    }else{
        checkpassword.innerHTML = "Incorrect format!";
    }
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
    var check_phone = /^[0-9]+$/;
    var check = check_phone.test(phone);
    var checkphone = document.getElementById("checkphone");

    if(check){
        checkphone.innerHTML = "<img width='30' height='30' src='images/correct.png'/>";
    }else{
        checkphone.innerHTML = "Incorrect format!";
    }
    return check;
}

function preview(file) {
    var pre = document.getElementById('preview');
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            pre.innerHTML = '<img src="' + evt.target.result + '" />';
        }
        reader.readAsDataURL(file.files[0]);
    } else {
        pre.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
}