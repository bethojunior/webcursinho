elementProperty.addEventInElement('#sendContent','onclick',function(){

    let myForm = document.getElementById('firstForm');
    let formData = new FormData(myForm);
    ContentController.sendContentFile(formData).then(resolve => {
        console.log(resolve)
    })
});