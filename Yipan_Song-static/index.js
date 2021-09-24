"use strict";


function update(){
    var checkCap= document.getElementById('caption').value;
    var checkFile= document.getElementById('caption').value;
    var data = new FormData();
    $.each($('#file')[0].files, function (i, file) {
        data.append('image', file);
    });
    data.append('location', $("#location").val());
    data.append('caption', $("#caption").val());
    $.ajax({
        url: "/data",
        data:data,
        method: 'POST',
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,

        success: function (result) {
            $("#contented").text(result);
            console.log(result);
        }
    });
}
//
function sub(i) {
    var comments = document.getElementById("comments__"+i).value;
    var imageID = eval("parseInt(i)+1");
    if(comments) {
        $.ajax({
            url: "/comment",
            method: "POST",
            type: 'POST',
            data:
                {
                    comments: comments,
                    imageID: imageID
                },
            success: function (respond) {
                console.log("Hi from ajax");
                document.getElementById("comments__" + i).value = null;
                var com = document.getElementById("comments_" + i);
                var tag = document.createElement("p");
                tag.innerHTML = respond;
                com.appendChild(tag);
            }
        });
    }
}

function like(j) {
    var currentLike = document.getElementById("like_num_" + j).innerHTML;
    currentLike = parseInt(currentLike);
    var id = eval("j + 1");
    $.ajax( {
        url: "/like",
        method: "POST",
        type: 'POST',
        data : {id : id},
        success: function(respond) {
            console.log("Hi from ajax");
            if (respond == "minus") {
                var uploadLike = eval("currentLike - 1");
                document.getElementById("like_num_" + j).innerHTML = uploadLike;
                document.getElementById("like_" + j).src = "/images/like.png";
            } else {
                var uploadLike = eval("currentLike + 1");
                document.getElementById("like_num_" + j).innerHTML = uploadLike;
                document.getElementById("like_" + j).src = "/images/heart.png";
            }
        }
    });
}
