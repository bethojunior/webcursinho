class UserController{
    /**
     *
     * @param email
     * @returns {Promise<any>}
     */
    static getUserByEmail(email) {
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('User/GetUserByEmail', 'POST',{email},resolve);
        });
    }

    static authenticate(data){
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('User/Authenticate','POST', {data} , resolve)
        })
    }

    static getUserById(data){
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('User/getUserById','POST', data, resolve);
        })
    }

    static getAll(){
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('user/getall','POST' , {} , resolve);
        })
    }

}