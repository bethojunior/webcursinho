initUsers();

function initUsers() {
    elementProperty.getElement('#mountUsers', write => {
        UserController.getAll().then(response => {
            let list = '';
            list += response.data.map(res => {
                if(res.type !== typeStudant){
                    return `
                    <tr>
                        <td>${res.name}</td>
                        <td>${res.email}</td>
                        <td>${showTypeUSer(res.type)}</td>
                        <td title="Apagar"><i id="${res.id}" class="material-icons deleteUSer">clear_all</i></td>
                    </tr>
               `;
                }
            }).join(' ');
            write.innerHTML = list;

            elementProperty.addEventInElement('.deleteUSer','onclick',function(){
                let data = {};
                data.id = this.getAttribute('id');
                SwalCustom.dialogConfirm('Você deseja deletar esse usuário?','Essa ação é irreversivel' , callback => {
                    if(callback){
                        UserController.deleteUser(data).then(call => {
                            if(call.status){
                                Materialize.toast("Usuário deletado" , 1000);
                                initUsers();
                            }
                        });
                    }
                });
            });
        });
    });
}


function showTypeUSer(type) {
    return typeUser[type]
}

