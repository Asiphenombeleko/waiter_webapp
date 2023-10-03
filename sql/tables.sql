CREATE TABLE weekdays (
    id SERIAL PRIMARY KEY,
    weekday_name VARCHAR(11) NOT NULL
);
CREATE TABLE user_data (
    id SERIAL PRIMARY KEY,
    username VARCHAR(12) NOT NULL
);
CREATE TABLE user_weekday (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    weekday_name VARCHAR(20) NOT NULL
);
