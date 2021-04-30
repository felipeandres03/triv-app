import Controller from './controller/controller.js';
import Score from './utils/score.js';

const btnResults = document.getElementById("aceptar")
const container_categories = document.getElementById('categorias');
const btnScore = document.getElementById('score');

const controller = new Controller();


window.onload = () => {
    controller.getCategories(container_categories);
}

controller.getQuestions(btnResults)
    .then(async ([question, container_cards]) =>  {

            const score = new Score();
            let arrayCorrectAnswers = await score.getAnswer(question.results);
            let total = await controller.getScore(btnScore, container_cards, arrayCorrectAnswers);
            if(total){
                alert(`obtuvimos ${total}/${arrayCorrectAnswers.length} 🤓`);
            }
})
.catch((err) => console.log(err))            

        
