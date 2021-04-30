import Question from '../model/questions.js';
import UI from '../view/UI.js';

export default class Controller{

    constructor(){
        this.ui = new UI();
    }

    getQuestions(button) {

        return new Promise((resolve, reject) =>{
            
            button.addEventListener(("click") , ()=>{
            
                const quantity = document.getElementById("quantity").value;
                const category = document.getElementById("categorias").value;
                const dificulty = document.getElementById("dificultad").value;
                const type = document.getElementById("tipo").value; 
                const container_cards = document.getElementById("container");
                const section = document.getElementById("section");
               
                 
                let question = new Question(quantity, category, dificulty, type);

                
    
                question.getQuestions()
                .then( async (data) => {
                await this.ui.printCards(data.results, container_cards);
                section.classList.remove("d-none");

                resolve([data, container_cards])
                })
                .catch((e) => reject(e));
    
            });  
        })    
    }

    getCategories(container){
    
    const questions = new Question();
    questions.getCategories()
    .then(async (data) => {
        try {
            await this.ui.print_categories(data.trivia_categories, container);   
        } catch (error) {
            console.log(error);
        }
    })
    .catch((err) => console.error(err));
    }

    getScore(button, container_cards, arrayCorrectAnswers){

        return new Promise ((resolve, reject) => {

            button.addEventListener(("click"), async ()=>{
                let answerCards = this.ui.userAnswer(container_cards)
                let total = await this.result(arrayCorrectAnswers, answerCards)
                resolve([total])
                setTimeout(() => window.location.reload(), 3000);
            })
        })
    }

    result(answersCorrects, userAnswer){

        return new Promise((resolve, reject) =>{
            let score = 0;

            for(let i=0; i<answersCorrects.length; i++){
                
                if(answersCorrects[i] === userAnswer[i]){

                    score++
                }
            }

         resolve(score);
        
        })
       
    }

}







