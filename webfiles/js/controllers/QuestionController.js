class QuestionController {
    static getQuestionById(data){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('question/getByUser' , 'POST' , data , resolve);
        })
    }
    static deleteQuestion(id){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('question/delete','POST', {id}, resolve);
        })
    }

    static insert(data){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('question/insert','POST', data , resolve);
        })
    }

    static insertAnswerQuestion(data){
        return new Promise(resolve => {
            ConnectionServer.sendRequest('question/answer','POST', data , resolve);
        })
    }

}