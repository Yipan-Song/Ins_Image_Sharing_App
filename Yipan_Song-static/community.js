"use strict";


function update() {
    // var comments = document.getElementById("comments__"+i).value;
    $.ajax( {
        url: "/commment",
        method: "POST",
        type: 'POST',
        // data : {comments: comments,
        //     index: i},
        cache: false,
        contentType: false,
        processData: false,
        success: function(respond) {
            console.log("Hi from ajax");
            console.log("11");
            // document.getElementById('time').value = respond;
            $("#time").text("asdsadasdsadsadsadsadsa");
            // document.getElementById( "comments_"+ i).value = respond;




        }
    });
}});
}