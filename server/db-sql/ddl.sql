use project;

CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    image VARCHAR(100),
    name VARCHAR(50),
    password VARCHAR(128) NOT NULL,
    birthday DATE,
    mail VARCHAR (50) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT'user',
    description VARCHAR (300)
);

CREATE TABLE articles (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(4000),
    visible BOOLEAN NOT NULL,
    image VARCHAR(200)
    topic_id INT UNSIGNED,
    FOREIGN KEY (topic_id) REFERENCES topics(id),
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE topics ( 
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(60),
image VARCHAR(50),
description VARCHAR(100),
tag VARCHAR(100)
);

CREATE TABLE users_and_topics (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
topic_id INT UNSIGNED,
FOREIGN KEY (topic_id) REFERENCES topics (id),
user_id INT UNSIGNED,
FOREIGN KEY (user_id) REFERENCES users(id)
);


-- a implementar como extra si me queda tiempo
CREATE TABLE comments (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
text VARCHAR(200),
liked BOOLEAN,
article_id INT UNSIGNED,
FOREIGN KEY (article_id) REFERENCES articles(id),
user_id INT UNSIGNED,
FOREIGN KEY (user_id) REFERENCES users (id),
root_comment_id INT UNSIGNED,
FOREIGN KEY (root_comment_id) REFERENCES comments (id)
);


