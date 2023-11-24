const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quizId: String,
    questionArray: Array
});

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = Quiz;