
export default class Score {

    constructor(){

    }
    
    // esto obtiene las respuestas correctas 
    getAnswer(array){
        return new Promise ((resolve, reject) =>{
            
            let answresGod = [];

            array.forEach(answer => {
                answresGod.push(answer.correct_answer)
            });

            if(answresGod){
                resolve(answresGod);
            }else{

                reject('[Score:getanswer] => error interno');
            }
        })
    }

}

