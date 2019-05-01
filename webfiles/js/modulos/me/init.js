const elementProperty = new ElementProperty();
let user = Session.get('dataUser');
$('.modal').modal();

if(user.result === false){
    Materialize.toast("Sessão expirada");
    setTimeout(function(){
        window.location.href = HOST;
    },1000);
}

init();
loadMyQuestion();

function init() {
    let user = Session.get('dataUser');
    let dataUser = user.data[0];
    console.log(dataUser)
    elementProperty.getElement('#imageUser' , image => {
        image.src = dataUser.src;
    });

    elementProperty.getElement('#nameUser' , name => {
        name.innerHTML = dataUser.name;
    });

    elementProperty.getElement('#imageUserProfile' , img => {
        img.src = dataUser.src;
    })

}

elementProperty.addEventInElement('#getOut','onclick',function(){
    let user = Session.get('dataUser');
    let dataUser = user.data[0];
    Materialize.toast('Até mais '+dataUser.name);
    setTimeout(function(){
        Session.delete('dataUser');
        window.location.href = HOST;
    },1000);
});


elementProperty.addEventInElement('#findUser','onclick',function(){
    Materialize.toast('No momento essa opção está em densevolvimento',2500);
    //window.location.href = 'search';
});

document.getElementById('shareMyLink').addEventListener('click', function(){
    let id = user.data[0];

    elementProperty.getElement('#mylink' , link => {
        link.value = "Vc pode me fazer perguntas por esse link ;D https://poderasgar.com.br/me?id="+id.id;
        document.getElementById('mylink').select();
        document.execCommand('copy');
        link.hidden = true;
        Materialize.toast('Link copiado para area de transferência', 2000);
    });


});


function loadMyQuestion() {
    let user = Session.get('dataUser');
    let dataUser = user.data[0];
    let data =  {};
    data.id = dataUser.id;
    QuestionController.getQuestionById(data).then(resolve => {
        elementProperty.getElement('#mountQuestions' , element => {
            let data = resolve.data;
            let txt = "";
            txt += data.map(res => {
               console.log(res);
                return `
                <div class="divModal" id="modal${res.id}">
                    <div class="modalContent">
                        <textarea class='resposta${res.id}' id="resposta${res.id}"></textarea>
                        <button id="${res.id}" class="btn canceled">Cancelar</button>
                        <button id="${res.id}" class="btn sendAnswer">Enviar</button>
                    </div>
                </div>
                
                <div class="myQuestion" value="${res.id}" id="myQuestion${res.id}">
                    <div class="modalContent"> 
                        <div class="pergunta">
                            <b>Pergunta para ${dataUser.name}:</b><br>
                            <span class="textoPergunta">${res.texto}</span>
                        </div>
                        <span>${checkAwnser(res.resposta)}</span>
                        <label class="hour">${Mask.data(res.data)}</label>  
                    </div>
                </div>
                
                    <div class="divQuestion" id="${res.id}">
                        <span>${res.texto}</span>
                        <br>
                         <span>${checkAwnser(res.resposta)}</span>
                        <hr>
                        <div class="options">
                            <i id="${res.id}" class="material-icons deleteQuestion">clear</i>
                            <i id="${res.id}" class="material-icons answer">whatshot</i>
                            <label class="hour">${Mask.data(res.data)}</label>   
                        </div>
                    </div>
                `;
            }).join(" ");


            function checkAwnser(check){
                if(check === null){
                    return '';
                }
                return `
                    <div class="resposta">
                        <b>Resposta:<br></b>
                        <p class="textResposta"><span>${check}</span>    </p>
                    </div>
                `;
            }


            element.innerHTML = txt;

            elementProperty.addEventInElement('.deleteQuestion','onclick',function(e){
                e.stopPropagation();
                let _that = this.getAttribute('id');
                SwalCustom.dialogConfirm('Deseja apagar essa pergunta?' , '' , status => {
                    if(status){
                        QuestionController.deleteQuestion(_that).then(del => {
                            console.log(del);
                            if(del.status){
                                Materialize.toast("Apagado com sucesso");
                                loadMyQuestion();
                            }
                        });
                        return;
                    }
                    Materialize.toast('Cancelado');
                })
            });

            //abre modal com valores da pergunta
            elementProperty.addEventInElement('.divQuestion','onclick',function(){
                let id = this.getAttribute('id');
                elementProperty.getElement('#myQuestion'+id , modal => {
                    modal.classList.add('show')
                })
            });

            elementProperty.addEventInElement('.myQuestion','onclick',function(){
                elementProperty.getElement('.myQuestion' , modal => {
                    modal.classList.remove('show')
                })
            });

            elementProperty.addEventInElement('.answer','onclick',function(e){
                e.stopPropagation();
                let id = this.getAttribute('id');
                console.log(this);
                elementProperty.getElement('#modal'+id , modal =>{
                    modal.classList.add('show')
                });
            });

            elementProperty.addEventInElement('.canceled','onclick',function(){
                let id = this.getAttribute('id');
                console.log(this);
                elementProperty.getElement('#modal'+id , modal =>{
                    modal.classList.remove('show')
                });
            });

            elementProperty.addEventInElement('.sendAnswer','onclick',function(){
                let id = this.getAttribute('id');
                elementProperty.getElement('.resposta'+id , resposta =>{
                    if(resposta.value === ' ' || resposta.value === ''){
                        Materialize.toast('Você precisa digitar algo');
                        return;
                    };
                    preload(true);
                    let dataUser = user.data[0];
                    let data = {};
                    data.id = id;
                    data.resposta = resposta.value;
                    data.iduser = dataUser.id;
                    QuestionController.insertAnswerQuestion(data).then(resolve => {
                        preload(false);
                        if(resolve.status){
                           Materialize.toast('Resposta inserida');
                           loadMyQuestion();
                           return;
                        }
                    });
                });
            });

        });
    });
}
