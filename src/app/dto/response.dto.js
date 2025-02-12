module.exports.ResponseDTO = class ResponseDTO {
    error
    status
    data
    message
    redirect
    constructor(response) {
        this.error = response.error
        this.data = response.data
        this.status = response.status
        this.message = response.message
        this.redirect = response.redirect
    }
}
