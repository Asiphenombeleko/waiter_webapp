CREATE TABLE weekdays (
    id SERIAL PRIMARY KEY,
    weekday_name VARCHAR(20) 
);
CREATE TABLE user_data (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) 
);
CREATE TABLE user_weekday (
    id SERIAL PRIMARY KEY,
    username_id INT ,
    weekday_id INT ,
    FOREIGN KEY (username_id) REFERENCES user_data(id),
    FOREIGN KEY (weekday_id) REFERENCES weekdays(id)
);
