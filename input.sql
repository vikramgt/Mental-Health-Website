CREATE TABLE myapp_quizresponse (
    user_id_id INTEGER PRIMARY KEY REFERENCES myapp_user_id(id) ON DELETE CASCADE,
    answers TEXT
);
