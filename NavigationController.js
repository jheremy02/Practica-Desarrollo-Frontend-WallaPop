 import { navigationViews } from "./NavagationView.js";
import { NotificationController } from "./NotificationController.js";
import { SignUpController } from "./SignUpController.js";
 import { signUpService } from "./SignUpService.js";


 class NavigationController {
     constructor(navigationElement){
        this.navigationElement=navigationElement

     }


     async drawRegisterButton() {
        const buttonTemplate=navigationViews.buildRegisterButtonView()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=this.navigationElement.querySelector('.navbar-nav.mr-auto')
        navbarElement.appendChild(buttonNode)
        const buttonElement=this.navigationElement.querySelector('.nav-item')
        buttonElement.addEventListener('click',()=>{
            window.location.href="/createAdvertisement.html"
        })
    }

    async drawLoginButton() {
        const buttonTemplate=navigationViews.buildLoginButtonView()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=this.navigationElement.querySelector('.navbar-nav.mr-auto')
        navbarElement.appendChild(buttonNode)
        const buttonElement=this.navigationElement.querySelector('.nav-item')
        buttonElement.addEventListener('click',()=>{
            window.location.href="/createAdvertisement.html"
        })
    }

     drawCreateButton() {
        const buttonTemplate=navigationViews.buildCreateButtonView()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=document.querySelector('.navbar-nav.mr-auto')
        navbarElement.appendChild(buttonNode)
        const buttonElement=document.querySelector('.nav-item')
        buttonElement.addEventListener('click',()=>{
            window.location.href="/createAdvertisement.html"
        })
    }

    drawCloseSessionButton(){
        const buttonTemplate=navigationViews.buildCloseSession()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('li')
        const navbarElement=document.querySelector('.navbar-nav.mr-auto')
        navbarElement.appendChild(buttonNode)
        const buttonElement=document.querySelector('.nav-item.close-session')
        buttonElement.addEventListener('click',()=>{
            SignUpController.closeSession()
            window.location.href="/"
        })
    }

    handleButton() {
        const loggedUserToken=signUpService.getLoggedUser()

        if (!loggedUserToken) {

            this.drawRegisterButton()
            this.drawLoginButton()

        } else {
            this.drawCreateButton()
            this.drawCloseSessionButton()
        }

        
    }
 }

export const navigationController = new NavigationController(document.querySelector('nav'))