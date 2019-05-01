$(".button-collapse").sideNav();
init();
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