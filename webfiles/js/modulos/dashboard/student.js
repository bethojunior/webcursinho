let elementPorperty = new ElementProperty();
let emailSeleceted = '';
init();
$('.modal').modal();

function init() {
    elementPorperty.getElement('#mountStudenty',list => {
        _that = list;
        UserController.getUserByType(typeStudant).then(resolve => {
            if(resolve.status){
                let data = resolve.data;
                let list = '';
                list += data.map(res => {
                    return `
                    <tr class="trStudenty" id="${res.id}">
                        <td>${res.name}</td>
                        <td>${res.email}</td>
                        <td>Aluno</td>
                        <td userEmail="${res.email}" class="statusStudent" id="${res.status}"><span class="${res.status}">${checkStatus(res.status)}</span></td>
                    </tr>
                `;
                }).join(' ');

                _that.innerHTML = list;

                elementPorperty.addEventInElement('.trStudenty','onclick',function(){
                    alert(this.getAttribute('id'))
                });

                elementPorperty.addEventInElement('.statusStudent','onclick',function(e){
                    $('#modalStatus').modal('open');
                    emailSeleceted = this.getAttribute('userEmail');
                    e.stopPropagation();
                });
            }

        })
    });
}

function checkStatus(status){
    return statusStudent[status];
}

elementPorperty.addEventInElement('#blockedUser','onclick',function(){
    let data = {};
    data.email  = emailSeleceted;
    data.status = StatusBlocked;
    UserController.changeStatusUSer(data).then(callback => {
        if(callback.status){
            swal(':)',emailSeleceted+' foi bloqueado  com sucesso','success');
            init();
        }
    })
});


elementPorperty.addEventInElement('#freeUser','onclick',function(){
    let data = {};
    data.email  = emailSeleceted;
    data.status = StatusFree;
    UserController.changeStatusUSer(data).then(callback => {
        if(callback.status){
            swal(':)',emailSeleceted +' liberado com sucesso','success');
            init();
        }
    })
});