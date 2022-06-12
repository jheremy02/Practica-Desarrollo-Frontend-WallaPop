
import { signUpService } from "./SignUpService.js";
import { buildAdvertisementsSpinnerView } from "./AdvertisementsView.js";
import { pubSub } from "./pubSub.js";


export class SignUpController {
    constructor(signUpFormElement){

        this.signUpFormElement=signUpFormElement
        this.main()
    }

    main(){

        this.onAnyInputChanged();
        this.onSubmitForm()
    }

    onAnyInputChanged () {
        const inputElements=Array.from(this.signUpFormElement.querySelectorAll('input'))
        inputElements.forEach(element=>{
            element.addEventListener('input',()=>{
                this.checkIfAllInputsAreFilled(inputElements)
            })
        })
     }

    checkIfAllInputsAreFilled(inputElements) {
        const areAllInputsFilled = inputElements.every(element=>element.value)

        if (areAllInputsFilled) {
            this.signUpFormElement.querySelector("button").removeAttribute("disabled");

        } else {
            this.signUpFormElement.querySelector("button").setAttribute("disabled",'');
        }
    }

    onSubmitForm() {
        this.signUpFormElement.addEventListener('submit',(event)=>{

            event.preventDefault()
            
            const inputElements=new FormData(this.signUpFormElement)

            const username= inputElements.get('inputUsername')
            const password= inputElements.get('inputPassword')
            const matchPassword=inputElements.get('inputMatchedPassword')

            const arePasswordEqual=this.checkIfPasswordsAreEqual(password,matchPassword)

            if (!arePasswordEqual) {
                pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"las contraseñas debe ser iguales")
                return;
            }

            const isPasswordValid=this.checkIfPasswordMatchRegExp(password)

            if (!isPasswordValid) {
                console.log("la contraseña no es valida")
                pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"La contraseña no es valida")
                return
            }

            this.createUser(username,password)

        })
    }
    checkIfPasswordsAreEqual(passwordInput, passwordMatchInput) {
        return passwordInput === passwordMatchInput;
      }

    checkIfPasswordMatchRegExp(password) {
        const passwordRegExp = new RegExp(/^[a-zA-Z0-9]*$/);
    
        return passwordRegExp.test(password);
      }

    async createUser(username, password) {
        const templateSpinner=buildAdvertisementsSpinnerView()
        try {
            await signUpService.createUser(username,password)
            this.signUpFormElement.innerHTML=templateSpinner
            pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Usuario registrado con exito")
            this.loginUser(username,password)
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
        }
        
    }

    async loginUser(username,password){

        try {
            await signUpService.loginUser(username,password)
            window.location.href='/'
            
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
        }

    }

    static async  closeSession(){
        window.localStorage.removeItem('token')
        window.location.href='/'
    }

}