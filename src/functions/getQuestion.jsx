import axios from 'axios';


export const getQuestion = async (quizId) => {
    try{
        const response = await axios.get('http://localhost:5000/api/quiz/read/que/all?id='+quizId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
            }
        });
        return response.data.questionArray;
    }
    catch(error){
        console.log(error);
    }
}