

export default class Questions {

    constructor(quantity=10,category=null,dificulty=null,type='multiple'){
        
        this.quantity = quantity;
        this.category = category; 
        this.dificulty = dificulty;
        this.type = type;
    }

    getQuestions(){
        return new Promise( async(resolve, reject) => {

            let API_URL = (`https://opentdb.com/api.php?amount=${this.quantity}&category=${this.category}&difficulty=${this.dificulty}&type=${this.type}`);
            
            let result = await fetch(API_URL);
            let data =  await result.json();
            let info = data;

            if(info){
                resolve(info)
                return info;
            }else{
                reject('No se pudo completar la peticion');
                return false;
            }
        });
    }

    getIncorrectAnswers(array){
        return new Promise(( resolve, reject) => {

            let answers = [];
        
            array.forEach((data) => {
                answers.push(data.incorrect_answers);
            });

            if(answers){
                resolve(answers);
            }else{
                reject('[Question:getIncorrectAnswers] => Error interno');
            }

        });
    }

    getCategories(){
        
        return new Promise ( async (resolve, reject) =>{

            let URL_categories_form = ('https://opentdb.com/api_category.php');

            let result = await fetch(URL_categories_form);
            let data = await result.json();
            let info = data;
            if(info){
                resolve(info)
            }
            else{
                reject("No se puede completar la petición")
                return false;
            }
               
        })
    }

}
