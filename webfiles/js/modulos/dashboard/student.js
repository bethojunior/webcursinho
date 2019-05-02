let elementPorperty = new ElementProperty();
init();
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
                    e.stopPropagation();
                    let data = {};
                    data.email  = this.getAttribute('userEmail');
                    data.status = StatusFree;
                    UserController.changeStatusUSer(data).then(callback => {
                        if(callback.status){
                            swal(':)','Status alterado com sucesso','success');
                            init();
                        }
                    })
                });
            }

        })
    });
}

function checkStatus(status){
    return statusStudent[status];
}