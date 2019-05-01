class ConnectionServer {
    static Host() {
        return HOST;
    }

    static simpleRequest(url , method , params , callback) {

        $.ajax({
            url: this.Host()+url,
            headers: {
                'token'  : Session.getValueInSession('user', 'token'),
                'id'     : Session.getValueInSession('user','id')
            },
            method: method,
            dataType: 'json',
            data: params,
            success:function(result){
                callback(result);
            },error:function(result){
                console.log(result);
            }
        });

    }

}
