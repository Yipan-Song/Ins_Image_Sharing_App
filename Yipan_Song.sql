/*
-- Query: SELECT * FROM nodeMySQL_db.comments
LIMIT 0, 1000

-- Date: 2021-05-02 22:57
*/
DROP TABLE comments;
CREATE TABLE IF NOT EXISTS `comments` (
`theorder` int(11) DEFAULT NULL,
  `imageid` int(11) DEFAULT NULL,
  `username`  varchar(30) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL
);


INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (1,2,'Boolean','Wow, amazing! Have a nice week!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (2,2,'Boolean','Love the photos you post!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (3,3,'Happy','Wow, they looks so cute and the scenery photo you took is so beautiful!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (4,2,'Happy','Amazing! Hope you have a good time my dear!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (5,3,'user01','How a warm family, and by the way, I think the pink heart image means you love them! Hahaha, it looks so warm!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (6,3,'user01','Give you a big hug!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (7,4,'user01','Yep, it\'s pretty cool!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (8,4,'user01','When I was a child, I dreamed of becoming an astronaut hahaha');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (9,4,'Boolean','SO nice, love the photos! ');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (10,2,'Lucky','Oh I like Ireland too!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (11,2,'Lucky','The weather is really suitable for me and the people here is really kind!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (12,3,'Lucky','So warm and sweet! Like a big family!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (13,4,'Lucky','Yeah, pretty beautiful!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (14,5,'user01','OMG Zelda, my childhood!!!!! ');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (15,5,'user01','Oh the scenery shot  is also nice!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (16,5,'Boolean','Zelda is my childhood too!! I love the characters!');
INSERT INTO `comments` (`theorder`,`imageid`,`username`,`content`) VALUES (17,5,'Boolean','Nice images!');
DROP TABLE likesimage;
CREATE TABLE IF NOT EXISTS `likesimage` (
 `theorder`  int(11) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `imageid`  int(11) DEFAULT NULL
);

INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (1,'user01',2);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (2,'Boolean',2);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (3,'Boolean',3);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (4,'Happy',3);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (5,'Happy',2);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (6,'user01',3);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (7,'user01',4);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (8,'Boolean',4);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (9,'Lucky',2);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (10,'Lucky',3);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (11,'Lucky',4);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (12,'user01',5);
INSERT INTO `likesimage` (`theorder`,`username`,`imageid`) VALUES (13,'Boolean',5);
DROP TABLE users;
CREATE TABLE IF NOT EXISTS `users` (
`username` varchar(30) DEFAULT NULL,
`userphoto` varchar(500) DEFAULT NULL,
`firstname` varchar(30) DEFAULT NULL,
`surname` varchar(30) DEFAULT NULL,
`password` varchar(30) DEFAULT NULL,
`email` varchar(30) DEFAULT NULL,
`phone` varchar(30) DEFAULT NULL,
`bio` varchar(300) DEFAULT NULL
);

INSERT INTO `users` (`username`,`userphoto`,`firstname`,`surname`,`password`,`email`,`phone`,`bio`) VALUES ('user01','drinkbob.jpeg','yipan','song','1234567a','12121212@aa.com','1313178','Hello guys, nice to meet you! I\'m very glad to be your friend!');
INSERT INTO `users` (`username`,`userphoto`,`firstname`,`surname`,`password`,`email`,`phone`,`bio`) VALUES ('Boolean','drinkbob.jpg','Pan','Aisin Gioro','12345678b','13123452@bb.com','132313341','Hello! I\'m a dog lover, I love doggies so much! They are so cute!');
INSERT INTO `users` (`username`,`userphoto`,`firstname`,`surname`,`password`,`email`,`phone`,`bio`) VALUES ('Happy','eatnoodle2.jpeg','Fei','Xin','123456789c','7124311@cc.com','121423421','Heya,I\'m Fei,you can also call me Feifei, hope everything goes well guys!');
INSERT INTO `users` (`username`,`userphoto`,`firstname`,`surname`,`password`,`email`,`phone`,`bio`) VALUES ('Lucky','sleep2.png','Mei','Mei','1234567890d','121413231@dd.com','231413232','Hello guys, I\'m a bubble tea and cheese lover!');
DROP TABLE images;
CREATE TABLE IF NOT EXISTS `images` (
`username` varchar(30) DEFAULT NULL,
`id` int(11) DEFAULT NULL,
`image` varchar(800) DEFAULT NULL,
`caption` varchar(500) DEFAULT NULL,
`likes` int(11) DEFAULT NULL,
`time` varchar(20) DEFAULT NULL,
`place` varchar(50) DEFAULT NULL,
`checkImages` int(11) DEFAULT NULL
);
INSERT INTO `images` (`username`,`id`,`image`,`caption`,`likes`,`time`,`place`,`checkImages`) VALUES ('user01',1,'Dublin.jpeg,pexels-adi-kavazovic-3222255 (1).jpg,WechatIMG1115.jpeg','I love there very much! Everything is so nice!',4,'2021.5.2. 22:31','Dublin.Ireland',1);
INSERT INTO `images` (`username`,`id`,`image`,`caption`,`likes`,`time`,`place`,`checkImages`) VALUES ('Boolean',2,'giftpink.jpeg,pexels-james-wheeler-1486974.jpg,Screenshot 2021-04-22 at 12.38.13.png','These are my dear classmates and professors, I love them, they are so kind. And the scenery of the lake is also fantastic!',4,'2021.5.2. 22:36','TCD.D2',1);
INSERT INTO `images` (`username`,`id`,`image`,`caption`,`likes`,`time`,`place`,`checkImages`) VALUES ('Happy',3,'galaxy.jpeg,galaxy.jpg,galaxy2.jpg,galaxy3.jpg','The galaxy is so beautiful , I love it, it makes me fell relieved! I always watch the sky at night for a long time!',3,'2021.5.2. 22:42','Beijing.China',1);
INSERT INTO `images` (`username`,`id`,`image`,`caption`,`likes`,`time`,`place`,`checkImages`) VALUES ('Lucky',4,'zeldaFour.jpeg,zeldaSec2.png,zeldathir.png,newgrange.jpg,newgrange3.png,newgrange4.png','I play zelda game these days and I also want to post the photos of the scenery shot that I went a week ago.',2,'2021.5.2. 22:55','Cork.Ireland',1);
