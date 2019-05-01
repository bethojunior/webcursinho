//const id = Mask.getLastUrl(20,35); //teste
const id = Mask.getLastUrl(80,32);
let data = {};
data.id = id;
const elementProperty = new ElementProperty()
getQuestions();

checkSession();

function checkSession(){
    let userLogged = Session.get('dataUser');
    if(userLogged.length === 0){
        elementProperty.getElement('#insertDataNav' , nav => {
            nav.innerHTML = `
                <li><a href="${HOST}"><i class="material-icons">person_outline</i>Cadastre-se</a></li>
        `;
        })
        return;
    }
    let user = userLogged.data[0];
    elementProperty.getElement('#imageNavSecond' , img => {
        img.src = user.src;
    });
    elementProperty.getElement('#insertDataNav' , nav => {
        nav.innerHTML = `
        <input style="position: absolute;bottom: -10000%;margin-right: 10000%;" id="mylink">
            <li><a href="${HOST+'me'}"><i class="material-icons">person_outline</i>${user.name}</a></li>        
            <li id="shareMyLink"><a><i class="material-icons">cloud</i>Compartilhar meu perfil</a></li>
            <li id="findUser"><a><i class="material-icons">search</i>Pesquisar</a></li>
            <li id="getOut"><a><i class="material-icons">exit_to_app</i>Sair</a></li>
        `;
    })
    console.log(userLogged)

    elementProperty.addEventInElement('#findUser','onclick',function(){
        Materialize.toast('No momento essa opção está em densevolvimento',2500);
        //window.location.href = 'search';
    });

}

if(document.getElementById('shareMyLink') !== null){
    document.getElementById('shareMyLink').addEventListener('click', function(){
        let userLogged = Session.get('dataUser');
        let id = userLogged.data[0];

        elementProperty.getElement('#mylink' , link => {
            link.value = "Vc pode me fazer perguntas por esse link ;D https://poderasgar.com.br/me?id="+id.id;
            document.getElementById('mylink').select();
            document.execCommand('copy');
            link.hidden = true;
            Materialize.toast('Link copiado para area de transferência', 2000);
        });


    });
}


elementProperty.addEventInElement('#sendAwnser','onclick',function(){
    elementProperty.getElement('#modalAwser', modal => {
        modal.classList.add('show');
    });
});

elementProperty.addEventInElement('#closeModalAwser','onclick',function(){
    elementProperty.getElement('#modalAwser', modal => {
        modal.classList.remove('show');
    });
});


function getQuestions() {
    console.log(data);
    UserController.getUserById(data).then(user => {
       Session.set('thatUser' , user.data);
       mountThisPerfil();
    });
}

function mountThisPerfil() {
    preload(true);

    let dataThisUser = Session.get('thatUser');
    let user = dataThisUser[0];
    elementProperty.getElement('#imageProfile' , profile=>{
        profile.src = user.src;
    });

    QuestionController.getQuestionById(data).then(resolve => {
        if(!resolve.status){
            preload(false);
            return;
        }

        console.log(resolve);

        elementProperty.getElement('#mountQuestions' , element => {
            let data = resolve.data;
            let txt = "";
            txt += data.map(res => {
                return `
                    <div class="myQuestion" id="myQuestion${res.id}">
                    <div class="modalContent"> 
                        <div class="pergunta">
                            <b>Pergunta para ${user.name}:</b><br>
                            <span class="textoPergunta">${res.texto}</span>
                        </div>
                        <span>${checkAwnser(res.resposta)}</span>
                        <label class="hour">${Mask.data(res.data)}</label>  
                    </div>
                    </div>
                    <div class="divQuestion" id="${res.id}">
                        <span class="question">${res.texto}</span>
                        <hr>
                        <label class="data">${Mask.data(res.data)}</label>
                        <span>${checkAwnser(res.resposta)}</span>
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
            preload(false);


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
        });

    })
}

elementProperty.addEventInElement('#btnSend','onclick',function(){
    preload(true);
    let _that = this;
    _that.classList.remove('show');
    elementProperty.getElement('#sendQuestion',element => {
        let dataQuestion = {};
        dataQuestion.question = element.value;
        if(dataQuestion.question === ' ' || dataQuestion.question === ''){
            preload(false);
            Materialize.toast('Você precisa digitar algo' , 1000);
            return;
        }
        dataQuestion.user = data.id;
        QuestionController.insert(dataQuestion).then(res => {
            preload(false);
            elementProperty.getElement('#modalAwser', modal => {
                modal.classList.remove('show');
            });
            if(res.status){
                Materialize.toast("Enviado com sucesso" , 4000);
                element.value = '';
                mountThisPerfil();
            }
        })
    })

});