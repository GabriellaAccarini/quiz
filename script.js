let currentQuest = 0;
let correct = 0;

showQuest();

//Eventos
document.querySelector('button').addEventListener("click", returnQuiz); //Botão fazer novamente
//Funções
function showQuest() {
    if(questions[currentQuest]){
        let q = questions[currentQuest];

        // Para verificar qual a porcentagem por questão que a barra se move
        let percent = Math.floor((currentQuest / (questions.length)) * 100);
        document.querySelector('.progress--bar').style.width = `${percent}%`;

        
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question; // Exibindo minha pergunta  
       
        //loop para preencher minhas alternativas
        let optionHTML = ''
        for(let i in q.options) {
            optionHTML +=`<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionHTML;

        //adicionando um evento de click em minhas opções
        document.querySelectorAll('.options .option').forEach((item)=>{
            addEventListener('click', clickEvent);
        })

    }else{
        //para quando acabaram as questões
        finish();
    }
}
function clickEvent(event) {
    //Pego a opção clicada através do atributo data-op
    let choise = event.target.getAttribute('data-op');
    
    //verifico se minha escolha é igual ou não a resposta armazenada no meu objeto.
    if(questions[currentQuest].answer === parseInt(choise)){
        //preciso ir armazenando minha porcentagem de acerto, para ser exibido no final
        correct++;
      
    }else{
        console.log('resposta errada');
    }

    //para passar para minha proxima questão
    currentQuest++;
    showQuest();
   
}
function finish() {
    //Tiro a questionArea da tela e exibo a scoreArea.
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';

    //Completo minha barra de rolagem
    document.querySelector('.progress--bar').style.width = `100%`;

    //Exibir a porcentagem de acerto
    percCorrect = (correct / (questions.length)) * 100;
    document.querySelector('.scorePct').innerHTML = `Acertou ${percCorrect}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${currentQuest} questões e acertou ${correct}.`

    //Alterar a frase de acordo com a porcentagem de acerto
    if(percCorrect < 30) {
        document.querySelector('.scoreText1').innerHTML = `Foi mal!`;
        document.querySelector('.scorePct').style.color = `#ff0000`;
    }else if (percCorrect>= 30 && percCorrect< 70){
        document.querySelector('.scoreText1').innerHTML = `Muito bem!`;
        document.querySelector('.scorePct').style.color = `#ffff00`;
    }else{
        document.querySelector('.scoreText1').innerHTML = `Parabéns!`;
        document.querySelector('.scorePct').style.color = `#0000ff`;
    }

}
function returnQuiz(){
    correct = 0;
    currentQuest = 0;
    showQuest();
}