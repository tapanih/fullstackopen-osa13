CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Dan Abramov', 'https://overreacted.io/', 'Overreacted');
INSERT INTO blogs (author, url, title) VALUES ('Joshua Comeau', 'https://www.joshwcomeau.com/', 'Josh W. Comeau');