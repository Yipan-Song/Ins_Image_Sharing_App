"use strict";

// require our modules
var express = require("express");
var mysql = require("mysql");


// set up other config vars
var port = 8000;
var app = express();

// set up variables
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var session = require("express-session");




// configure middleware
app.use(session({secret: "ttgfhrwgedgnl7qtcoqtcg2uyaugyuegeuagu111",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000000000}}));
app.set("view-engine", "ejs");
app.set("views", "Yipan_Song-templates");
app.use(express.static("Yipan_Song-static"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.use(function(req, res, next) {
    console.log("Hi from middleware");
    console.log(req.url);
    next();
});

var m;
var n = false;
var register = false;
var wrong =false;
var likes = 0;
var maxid = 0;
var checkuser = false;
var theimageid = 0;
var plusid = false;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",  // Enter MySQL password
    database: "nodeMySQL_db" // Enter database name
});

// connect to the DB
con.connect( function(err) {
   if (err) {
       console.log("Error: "+err);
   } else {
       console.log("Successfully connected to DB");
   }
});

//render the homepage
app.get("/", function(req, res) {
    n = false;
    var text = req.session.username;
    if (text) { // check if the user has login in
        res.render("homepage.ejs", {"data": "Community", "link": "community", "register" :register});

    } else {
        res.render("homepage.ejs", {"data": "Login", "link": "login",  "register" :register});
    }
});


// render the login page
app.get("/login", function(req, res) {
    n = false;
    register = false;
    res.render("login.ejs", {"wrong": wrong});
});

// if user doesn't login
app.get("/notlogin", function(req, res) {
    n = false;
    register = false;
    var content = `SELECT * FROM images`;
    var users = `SELECT * FROM users`;
    console.log(content);
    con.query(content, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
                var comments = `SELECT * FROM comments`;
                con.query(comments, function(err, comments) {
                    if (err) {
                        res.send("A database error occurred: "+err);
                    } else {
                        con.query(users, function(err, user) {
                            if (err) {
                                res.send("A database error occurred: "+err);
                            } else {
                                res.render("notlogin.ejs", {"content" :results,  "comments": comments, "users": user});
                                console.log(results);
                            }
                        });
                 }
            });
         }
    });
});


// check if the username and password is right
app.post("/login", function(req, res) {
    var sql = `SELECT * FROM users`;
    m = false; //define a boolean variable
    var inputName = req.body.username;
    var password = req.body.password;
    wrong = false;
    con.query(sql, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            if (results.length >0) {
                for(var i in results){
                    if(inputName == results[i].username && password == results[i].password){ // judge if the username and password that users input are right
                        m = true;
                        req.session.username = inputName;
                    }
                }
                if(m) {
                    res.redirect("/community"); // if the user's input is right, then redirect to the '/profile' route
                } else
                {
                    wrong = true;
                    res.render("login.ejs", {"wrong": wrong});
                }
            } else {
                res.send("No results returned");
            }
        }
    });
});

// profile page
app.get("/myprofile", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        n = false;
        register = false;
        var users = ` SELECT * FROM users WHERE username = "${username}"`;
        var imageinfo = ` SELECT * FROM images WHERE username = "${username}"`;
        var comments = ` SELECT * FROM comments`;
        var checklike    = ` SELECT * FROM likesimage WHERE username = "${username}"`;
        con.query(users, function (err, results) {
            if (err) {
                return res.send("A database error occurred: " + err);
            } else {
                if (results.length > 0) {
                    con.query(imageinfo, function (err, content) {
                        if (err) {
                           return  res.send("A database error occurred: " + err);
                        } else {
                            con.query(checklike, function (err, likes) {
                                if (err) {
                                   return  res.send("A database error occurred: " + err);
                                } else {
                                    con.query(comments, function (err, commentsel) {
                                        if (err) {
                                           return  res.send("A database error occurred: " + err);
                                        } else {
                                            res.render("myprofile.ejs", {"users": results, "content":content, "checklikes": likes, "comments":commentsel});
                                            console.log(results);
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    return res.send("No results returned");
                }

            }
        });
    } else {
        res.redirect("/");
    }
});


// the information of photo
app.get("/images/:id", function(req, res) {
        var username = req.session.username;

        checkuser = false;

            var id = req.params.id;
            var sql = `SELECT * FROM images WHERE id = ${id}`;
            var users = `SELECT * FROM users`;
            var imageid = eval("id + 1");
            var comments = `SELECT * FROM comments`;
            con.query(sql, function (err, result) {
                console.log(result);
                if (err) {
                    res.send("1A database error occurred: " + err);
                } else {
                    con.query(users, function (err, user) {
                        console.log(result);
                        if (err) {
                            res.send("2A database error occurred: " + err);
                        } else {
                            con.query(comments, function (err, comment) {
                                console.log(result);
                                if (err) {
                                    res.send("3A database error occurred: " + err);
                                } else {
                                    if (username) {
                                        var likes = `SELECT * FROM likesimage WHERE username = "${username}"`;
                                        con.query(likes, function (err, check) {
                                            if (err) {
                                                res.send("4A database error occurred: " + err);
                                            } else {
                                                res.render("information.ejs", {
                                                    "content": result,
                                                    "users": user,
                                                    "comments": comment,
                                                    "checklikes": check,
                                                    "imageid": imageid
                                                });
                                            }
                                        });
                                    } else {
                                        res.render("notlogininfor.ejs", {
                                            "content": result,
                                            "users": user,
                                            "comments": comment,
                                            "imageid": imageid
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
});

//publisher profile
app.get("/profile/:publisher", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        var postername = req.params.publisher;
        var sql = `SELECT * FROM users WHERE username = "${postername}"`;
        var images = `SELECT * FROM images WHERE username = "${postername}"`;
        var userlike = ` SELECT * FROM likesimage WHERE username = "${postername}"`;
        var comments = `SELECT * FROM comments`;
        con.query(images, function (err, result) {
            console.log(result);
            if (err) {
                res.send("1A database error occurred: " + err);
            } else {
                con.query(sql, function (err, user) {
                    console.log(result);
                    if (err) {
                        res.send("2A database error occurred: " + err);
                    } else {
                        con.query(comments, function (err, comment) {
                            console.log(result);
                            if (err) {
                                res.send("3A database error occurred: " + err);
                            } else {
                                if (username) {
                                    var likes = `SELECT * FROM likesimage WHERE username = "${username}"`;
                                    con.query(userlike, function (err, check) {
                                        if (err) {
                                            res.send("4A database error occurred: " + err);
                                        } else {
                                            res.render("publisher.ejs", {
                                                "content": result,
                                                "users": user,
                                                "comments": comment,
                                                "checklikes": check,
                                                "publisher": postername
                                            });
                                        }
                                    });
                                } else {
                                    res.render("notlogininfor.ejs", {
                                        "content": result,
                                        "users": user,
                                        "comments": comment,
                                        "publisher": postername
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }  else {
        res.redirect("/");
    }
});
// change profile photo
app.get("/changephoto", function(req, res) {
    var username = req.session.username;
    if(username) {
        n = false;
        register = false;
        var users = ` SELECT * FROM users WHERE username = "${username}"`;
        con.query(users, function (err, results) {
            if (err) {
                res.send("A database error occurred: " + err);
            } else {
                if (results.length > 0) {
                    res.render("profilephoto.ejs", {"users": results});
                    console.log(results);
                } else {
                    res.send("No results returned");
                }

            }
        });
    }  else {
        res.redirect("/");
    }
});

// change password
app.get("/password", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        res.render("changepassword.ejs", {"username": username});
    }  else {
        res.redirect("/");
    }
});

// change password
app.post("/changepassword", function(req, res) {
    var username = req.session.username;
    var newpassword = req.body.newpassword;
    checkuser = false;
    if(username) {
        wrong = false;
        m = false; //define a boolean variable
        var newpass = `UPDATE users SET password = "${newpassword}" WHERE username = "${username}"`;
        con.query(newpass, function (err, results) {
            if (err) {
                res.send("A database error occurred: " + err);
            } else {
                res.redirect("/myprofile");
            }
        });
    }  else {
        res.redirect("/");
    }
});

// edit the profile
app.get("/edit", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        n = false;
        register = false;
        var users = ` SELECT * FROM users WHERE username = "${username}"`;
        con.query(users, function (err, results) {
            if (err) {
                res.send("A database error occurred: " + err);
            } else {
                if (results.length > 0) {
                    res.render("editprofile.ejs", {"users": results, "checkuser" :checkuser});
                    console.log(results);
                } else {
                    res.send("No results returned");
                }

            }
        });
    }  else {
        res.redirect("/");
    }
});

// edit the profile
app.post("/edit", function(req, res) {
    var username = req.session.username;
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var bio = req.body.bio;
    var phone = req.body.phone;
    checkuser = false;
    if(username) {
        wrong = false;
        m = false; //define a boolean variable
                if(email)
                {
                    var emailedit = `UPDATE users SET email = "${email}" WHERE username = "${username}"`;
                    con.query(emailedit, function (err, resultsfir) {
                        if (err) {
                            return res.send("1A database error occurred: " + err);
                        }
                    });

                }
                if (firstname) {
                    var firstnameedit = `UPDATE users SET firstname = "${firstname}" WHERE username = "${username}"`;
                    con.query(firstnameedit, function (err, resultsfsec) {
                        if (err) {
                            return res.send("2A database error occurred: " + err);
                        }
                    });

                }
                if (lastname) {
                    var lastnameedit = `UPDATE users SET surname = "${lastname}" WHERE username = "${username}"`;
                    con.query(lastnameedit, function (err, resultsthir) {
                        if (err) {
                            return res.send("3A database error occurred: " + err);
                        }
                    });

                }
                if (bio) {
                    var bioedit = `UPDATE users SET bio = "${bio}" WHERE username = "${username}"`;
                    con.query(bioedit, function (err, resultsfour) {
                        if (err) {
                            return res.send("4A database error occurred: " + err);
                        }
                    });

                }
                if (phone) {
                    var phoneedit = `UPDATE users SET phone = "${phone}" WHERE username = "${username}"`;
                    con.query(phoneedit, function (err, resultsfif) {
                        if (err) {
                            return res.send("5A database error occurred: " + err);
                        }
                    });

                }
                res.redirect("/myprofile");

    }  else {
        res.redirect("/");
    }
});

//change profile photo
app.post("/profilephoto", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        m = false; //define a boolean variable
        var photo = req.files.profilephoto;
        photo.mv("Yipan_Song-static/uploads/" + photo.name);
        var photoChange = `UPDATE users SET userphoto = "${photo.name}" WHERE username = "${username}"`;
        wrong = false;
        con.query(photoChange, function (err, results) {
            if (err) {
                res.send("A database error occurred: " + err);
            } else {
                res.redirect("/changephoto");
            }
        });
    }  else {
        res.redirect("/");
    }
});


//comment
app.post("/comment", function(req, res) {
    var comorder = 0;
    var maxorder = 0;
    var username = req.session.username;
    checkuser = false;
    if(username) {
        m = false; //define a boolean variable
        var newcomments = req.body.comments;
        var currentID = parseInt(req.body.imageID);
        wrong = false;
        var checkorder = `SELECT * FROM comments`;
        con.query(checkorder, function (err, check) {
            for (var i in check) {
                if (check[i].theorder > maxorder) {
                    maxorder = check[i].theorder;
                }

            }
            comorder = maxorder;
            comorder++;
            var add = `INSERT INTO comments (theorder, imageid, username, content) VALUES (${comorder}, ${currentID}, "${username}", "${newcomments}")`;
            console.log(add);
            con.query(add, function (err, results) {
                if (err) {
                    res.send("A database error occurred: " + err);
                } else {
                    var commentArr = [username, newcomments];
                    var newcom = commentArr.join(": ");
                    res.json(newcom);
                }
            });
        });
    }  else {
        res.redirect("/");
    }
});
// change the number of likes
app.post("/like", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        var iflike = false;
        var checkCondition = "plus";
        var username = req.session.username;
        var id = req.body.id;
        var userlike = `SELECT * FROM likesimage WHERE username = "${username}"`;
        var index = 0;
        var imageid = eval("id -1");
        con.query(userlike, function (err, likes) {
            if (err) {
                res.send("A database error occurred: " + err);
            } else {
                for (var i in likes) { // check if the user has already click the like
                    if (likes[i].imageid == id) {
                        iflike = true;
                        var order = likes[i].theorder;
                    }
                }
                if (iflike) { // if user have already like this post, then when he or she like again, he will cancel the like and delete this post like row from sql
                    checkCondition = "minus";
                    var currenttable = `DELETE FROM likesimage WHERE theorder = ${order}`;
                    con.query(currenttable, function (err, table) {
                        if (err) {
                            res.send("A database error occurred: " + err);
                        } else {
                            var sql = `UPDATE images SET likes = likes - 1 WHERE id= ${imageid}`;
                            con.query(sql, function (err, imagetable) {
                                if (err) {
                                    res.send("A database error occurred: " + err);
                                } else {
                                    checkCondition = "minus"; // let the number of the likes minus one
                                    res.json(checkCondition);
                                    console.log(checkCondition);
                                }
                            });
                        }
                    });
                } else { // if not, then add the like information into the likesimage table
                    var checklikes = `SELECT * FROM likesimage`;
                    con.query(checklikes, function (err, check) {
                        for (var j in check) {
                            if (check[j].theorder > index) {
                                index = check[j].theorder;
                            }
                        }
                        index++;
                        var currenttable = `INSERT INTO likesimage (theorder, username, imageid) VALUES (${index}, "${username}", ${id})`;
                        con.query(currenttable, function (err, table) {
                            if (err) {
                                res.send("A database error occurred: " + err);
                            } else {
                                var sql = `UPDATE images SET likes = likes + 1 WHERE id= ${imageid}`;
                                con.query(sql, function (err, imagetable) {
                                    if (err) {
                                        res.send("A database error occurred: " + err);
                                    } else {
                                        checkCondition = "plus"; // let the number of likes plus one
                                        res.json(checkCondition);
                                        console.log(checkCondition);
                                    }
                                });
                            }
                        });
                    });
                }
            }
        });
    }  else {
        res.redirect("/");
    }
});


// register page
app.get("/register", function(req, res) {
    n = false;
    register = false;
    res.render("register.ejs", {"n" :n});
});


app.post("/register", function(req, res) {
    var userphoto = req.files.profilePhoto;
    userphoto.mv("Yipan_Song-static/uploads/" + userphoto.name);
    var username = req.body.username;
    var firstname = req.body.firstname;
    var surname = req.body.lastname;
    var password = req.body.password;
    var email = req.body.email;
    var phone = req.body.phone;
    var bio = req.body.bio;
    n = false;
    register = false;
    var table = `SELECT * FROM users`;
    con.query(table, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            if (results.length > 0 ) {
                for (var j in results) {
                    if (username == results[j].username) { // judge if the username that the user register is repetitive with the username that the previous user has already registered
                        n = true;
                    }
                }
            }
                if(n) {
                    res.render("register.ejs", {"n" :n});
                }   else {
                    var sql = `INSERT INTO users (username, userphoto, firstname, surname, password, email, phone, bio) VALUES ("${username}", "${userphoto.name}", "${firstname}", "${surname}", "${password}", "${email}", "${phone}",  "${bio}")`;
                    con.query(sql, function(err, results) {
                    if (err) {
                        res.send("A database error occurred: "+err);
                    } else {
                        register = true;
                        res.redirect("/");
                        console.log(results);
                    }
                   });
                }
                console.log(results);
        }
        })
});
// upload multiple files
app.post("/data", function(req,res) {
    n = false;
    register = false;
    checkuser = false;
    var checkImages = 0;
    var caption = req.body.caption;
    var place = req.body.location;
    var formdata = req.files.image;
    var username = req.session.username;
    var userphoto = req.session.userphoto;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var time =year + '.' + month + '.' + date + '.' + ' '  + hour + ':' + minutes;
    var checkid = `SELECT * FROM images`;
    con.query(checkid, function(err, check) { // to get the max id, and add new id in it, to make the id to be different and have the right order
        for (var i in check) {
            if (check[i].id > maxid)
            {
                maxid = check[i].id;
            }

        }
            theimageid = maxid;
        if (!req.files)
        {res.json('No files were uploaded.');}
    else {

            theimageid = theimageid+1;
            console.log(formdata.length);
            var files = [];
            if (formdata instanceof Array) { // judge if numtifiles is an array
                checkImages = 1;
                formdata.forEach(function (ele, key) {
                    ele.mv("Yipan_Song-static/uploads/" + ele.name); // go through the images that user post at the same time one by one
                    files.push(ele.name);

                });
                var filesString = files.join(","); // to make the array to be the string, so that they can be stored into the sql table
            } else {
                formdata.mv("Yipan_Song-static/uploads/" + formdata.name);
                var filesString = formdata.name;
            }
        }
        var sql = `INSERT INTO images (username, id, image, caption,likes , time, place, checkImages) VALUES ("${username}", ${theimageid}, "${filesString}", "${caption}", "${likes}", "${time}", "${place}", "${checkImages}")`;
        con.query(sql, function(err, results) {
            if (err) {
                res.send("A database error occurred: "+err);
            } else {
                var msg = "Uploaded successfully! You can go back to the community to check!";
                plusid = false;
                res.json(msg);
                console.log(results);

            }
        });

    });

});

// community page
app.get("/community", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        n = false;
        register = false;
        var content = `SELECT * FROM images`;
        var users = `SELECT * FROM users`;
        var likes = `SELECT * FROM likesimage WHERE username = "${username}"`;
        console.log(content);
        con.query(content, function (err, results) {
            if (err) {
                res.send("A database error occurred: " + err);
            } else {
                con.query(users, function (err, userinfro) {
                    if (err) {
                        res.send("A database error occurred: " + err);
                    } else {
                        var comments = `SELECT * FROM comments`;
                        con.query(comments, function (err, comments) {
                            if (err) {
                                res.send("A database error occurred: " + err);
                            } else {
                                con.query(likes, function (err, checklikes) {
                                    if (err) {
                                        res.send("A database error occurred: " + err);
                                    } else {
                                        res.render("community.ejs", {
                                            "content": results,
                                            "users": userinfro,
                                            "comments": comments,
                                            "checklikes": checklikes,
                                            "username": username
                                        });
                                        console.log(results);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }  else {
        res.redirect("/");
    }
});


// render the upload page
app.get("/upload", function(req, res) {
    var username = req.session.username;
    checkuser = false;
    if(username) {
        n = false;
        register = false;
        res.render("upload.ejs");
    }
    else {
        res.redirect("/");
    }
});



// log out
app.get("/logout", function(req, res) {
    n = false;
    register = false;
    req.session.destroy();
    res.redirect("/");
});

app.listen(port);
console.log("Server running on http://localhost:"+port);
