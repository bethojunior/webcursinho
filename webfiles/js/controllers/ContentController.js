class ContentController {
    static sendContentFile(form){
        return new Promise(resolve => {
            ConnectionServer.requestFile('content/contentFile','POST', form, resolve)
        })
    }
}