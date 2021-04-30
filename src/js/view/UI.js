

export default class UI {


    print_categories(categories, container){
        return new Promise((resolve, reject) =>{
        
        categories.forEach((category) =>{
            const htmlcontainer = `<option value="${category.id}">${category.name}</option>`;
            container.innerHTML += htmlcontainer;
        });

        if(container != ""){
            resolve(container);
        }else{
            reject("tal vez sea error de internet!")
        }
        });      
    }

    printCards(question, container){
        return new Promise((resolve, reject) => {
            container.innerHTML = '';
            question.forEach((question, index) => {
                question.id = index;
                const card = this.returnCard(question);
                container.innerHTML += card;
            });
            if(container !== ''){
                resolve(container);
            }else{
                reject('[UI:PrintCards]=>Error interno');
            }
        });
    }

    returnAnswersHTML(corrects, incorrects, ids){

        incorrects.push(corrects);
        let incorrectHTMLContainer = '';

        for(let i = 0; i<incorrects.length; i++){

            incorrectHTMLContainer += 
                `<div class="form-check">
                <input class="form-check-input" type="radio" name="answer ${ids}" id="${ids}-${i}" value="${incorrects[i]}" required>
                <label class="form-check-label" for="${ids}-${i}">
                ${incorrects[i]}
                </label>
                </div>`;
            
        }

        return incorrectHTMLContainer;
    }

    returnCard(question) {
        const card = ` <div class="col-lg-4 col-md-4 col-sm-4 mb-5">
                            <div class="card h-100">
                                <div class="card-body color-1">
                                <h4 class="card-title text-muted">${question.category}</h4>
                                <h5 class="card-subtitle mb-2">${question.question}</h5>
                                <form name="formulario" id="answer ${question.id}" action="" method="POST">
                                ${this.returnAnswersHTML(
                                                question.correct_answer,
                                                question.incorrect_answers,
                                                question.id
                                            )}
                                    </form>   
                                </div>
                            </div>
                        </div>`;
        return card;
    }

    userAnswer(idcontainer){
        if (idcontainer){
            const userAnswer = document.querySelectorAll(".form-check-input");
            let checked_user = [];
            userAnswer.forEach((check) =>{
                
                if(check.checked=== true){
                    checked_user.push(check.value)
                }
                
            })
            return(checked_user)
        }
        
    }



}
