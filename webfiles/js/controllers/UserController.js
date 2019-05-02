class UserController{
    /**
     *
     * @param email
     * @returns {Promise<any>}
     */

    static authenticate(data){
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('User/Authenticate','POST', {data} , resolve)
        })
    }


    static getUserByType(data){
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('User/GetUserByType','POST', {data}, resolve)
        })
    }

    static changeStatusUSer(data){
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('User/ChangeStatusStudent','POST',{data}, resolve)
        })
    }

}