
export const calculateScore= (questionArray, userResponse) => {
    console.log(questionArray, userResponse);
    let totalScore = 0;
    if (!userResponse || !Array.isArray(userResponse) || !questionArray || !Array.isArray(questionArray)) {
        console.error("Invalid userResponse or questionArray");
        return 0; // or handle the error in a way that makes sense for your application
    }
    
    for(let i=0; i<userResponse.length; i++){
        const question = questionArray.find(q => q?.questionNumber === userResponse[i]?.questionId);
        console.log(question);
        if (question) {
            if (Array.isArray(userResponse[i]?.answer)) {
                // For multiple-choice questions
                const isCorrect = JSON.stringify(userResponse[i]?.answer.sort()) === JSON.stringify(question.correctAnswer.sort());
                totalScore += isCorrect ? 4 : -1;
            } else {
                // For single-choice questions
                const isCorrect = userResponse[i]?.answer === question?.correctAnswer;
                totalScore += isCorrect ? 4 : -1;
            }
        }
    }

    return totalScore;
}