import { useQuestionContext } from '../QuestionProvider';

export const checkAnswer = (userAnswer, queNo) => {
    // Perform any necessary validation or processing before checking the answer
    const { questionArray, updateQuestionArray } = useQuestionContext();

    const questionObj = questionArray.find((question) => question.queNo === queNo);

    console.log(questionObj);

    const correctAnswer = questionObj?.correctAnswer;

    if(typeof correctAnswer === 'object') {
        for(let i = 0; i < correctAnswer.length; i++) {
            if(correctAnswer[i] !== userAnswer[i]) {
                return  false;
            }
        }
        return true;
    }
    else{
        return correctAnswer === userAnswer;
    }
}