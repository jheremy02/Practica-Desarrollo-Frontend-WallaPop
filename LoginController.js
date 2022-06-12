
import { pubSub } from "./pubSub.js";
import { signUpService } from "./SignUpService.js";

export class LoginController{
    constructor(loginFormElement){

        this.loginFormElement=loginFormElement
        this.main()

    }

    main(){
        
        this.onAnyInputChanged()
        this.onSubmitForm()
    }

    onAnyInputChanged () {
        const inputElements=Array.from(this.loginFormElement.querySelectorAll('input'))
        inputElements.forEach(element=>{
            element.addEventListener('input',()=>{
                this.checkIfAllInputsAreFilled(inputElements)
            })
        })
     }

     checkIfAllInputsAreFilled(inputElements){
        const areAllInputsFilled = inputElements.every(element=>element.value)

        if (areAllInputsFilled) {
            this.loginFormElement.querySelector("button").removeAttribute("disabled");

        } else {
            this.loginFormElement.querySelector("button").setAttribute("disabled",'');
        }
     }

      onSubmitForm(){
         this.loginFormElement.addEventListener('submit',(event)=>{
             event.preventDefault();
             const formData=new FormData(this.loginFormElement)
             const username=formData.get('inputUsername')
             const password=formData.get('inputPassword')

             this.loginUser(username,password)


         })
     }

     async loginUser(username,password) {
         try {
            await signUpService.loginUser(username,password)
            window.location.href='/';
         } catch (error) {
             pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
         }
        
     }

}