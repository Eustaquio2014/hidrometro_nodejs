//DTO data transfer object  protect your API clients from changes made on the server
//using function base approach
 function userDTO(user, postsCount){
   return {
       id:user._id
       name: user.name,
       email: user.email,
       postsCount: postsCount
     }
 }
//using class based approach
//\backend\dtos\user-dto.js
class UserDTO {
    id;
    phone;
    activated;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}
module.exports = UserDTO;
