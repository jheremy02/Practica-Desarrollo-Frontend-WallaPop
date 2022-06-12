import { SignUpController } from "./SignUpController.js";
import { NotificationController } from "./NotificationController.js";

document.addEventListener('DOMContentLoaded',()=>{

    const signUpFormElement=document.querySelector('form')
    
    const notificationElement=document.querySelector('.notification')
    const notificationController=new NotificationController(notificationElement)
    const signUpController = new SignUpController(signUpFormElement)
})