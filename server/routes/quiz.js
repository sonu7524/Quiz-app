const express = require('express');
const quizRouter = express.Router();
const Quiz = require('../models/Quiz');
const authenticate = require('../middleware/authentication');


// Get all questions
quizRouter.get('/read/que/all', authenticate, async (req, res) => {
    const quizId = req.query.id;
    try {
        const quiz = await Quiz.findOne({ quizId: quizId });
        res.json({
            questionArray: quiz.questionArray
        });
    } catch (err) {
        res.json({ message: "Quiz not found" });
    }
});

quizRouter.post('/create', authenticate, async (req, res) => {
    const newQuiz = new Quiz({
        quizId: req.body.quizId,
        questionArray: req.body.questionArray
    });

    try {
        const savedQuiz = await newQuiz.save();
        res.json("Quiz created successfully");
    } catch (err) {
        res.json({ message: err });
    }
})


module.exports = quizRouter;