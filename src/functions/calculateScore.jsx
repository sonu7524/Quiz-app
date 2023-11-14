
export const calculateScore= (questionArray, userResponse) => {
    console.log(questionArray, userResponse);
    let totalScore = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let totalQuestions = questionArray.length;
    if (!userResponse || !Array.isArray(userResponse) || !questionArray || !Array.isArray(questionArray)) {
        console.error("Invalid userResponse or questionArray");
        return 0; // or handle the error in a way that makes sense for your application
    }
    
    for (let i = 0; i < userResponse.length; i++) {
        const question = questionArray.find(q => q?.questionNumber === userResponse[i]?.questionId);
    
        if (question) {
            const userAnswer = userResponse[i]?.answer;
            const correctAnswer = question?.correctAnswer;
    
            if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
                // For multiple-choice questions
                const isCorrect = JSON.stringify(userAnswer.map(ans => ans.toLowerCase()).sort()) === JSON.stringify(correctAnswer.map(ans => ans.toLowerCase()).sort());
                totalScore += isCorrect ? 4 : -1;
                correctAnswers += isCorrect ? 1 : 0;
                incorrectAnswers += isCorrect ? 0 : 1;
            } else {
                // For single-choice questions
                const isCorrect = JSON.stringify(userAnswer).toLowerCase() === JSON.stringify(correctAnswer).toLowerCase();
                totalScore += isCorrect ? 4 : -1;
                correctAnswers += isCorrect ? 1 : 0;
                incorrectAnswers += isCorrect ? 0 : 1;
            }
        }
    }
    

    const answers = {
        totalScore,
        correctAnswers,
        incorrectAnswers,
        totalQuestions
    }
    return answers;
}