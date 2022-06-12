 import advertisementsService from "./AdvertisementsService.js";
 import { pubSub } from "./pubSub.js";
 import { buildAdvertisementsSpinnerView } from "./AdvertisementsView.js";
import { signUpService } from "./SignUpService.js";
 export class CreateAdvertisement {
     constructor (createFormElement) {
         
        this.createFormElement=createFormElement;
        this.createFormElementClone=this.createFormElement.cloneNode(true)
        this.main()
        
     }

     main () {
         if (signUpService.getLoggedUser()) {
            this.onAnyInputChanged()
            this.onSubmitForm()
         }else {
             pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"Debe loguearse primero")
             window.location.href="/"
         }
         
     }

     onAnyInputChanged () {
        const inputElements=Array.from(document.querySelectorAll('input , textarea'))
        inputElements.forEach(element=>{
            element.addEventListener('input',()=>{
                this.checkIfAllInputsAreFilled(inputElements)
            })
        })
     }

     checkIfAllInputsAreFilled(inputElements){
        const areAllInputsFilled = inputElements.every(element=>element.value)

        if (areAllInputsFilled) {
            this.createFormElement.querySelector("button").removeAttribute("disabled");

        } else {
            this.createFormElement.querySelector("button").setAttribute("disabled",'');
        }
     }

     onSubmitForm() {
         this.createFormElement.addEventListener('submit',(event)=>{
             event.preventDefault()
             const inputElements=new FormData(this.createFormElement)
             const name = inputElements.get('inputProductName') ;
             const description=inputElements.get('inputDescriptionProduct') ;
             const image_url=inputElements.get('inputImageUrl') ;
             const price=inputElements.get('inputProductPrice') ;
             const type=inputElements.get('gridRadios') ;
             const bodyAdvertisement={name,description,image_url,price,type}

             
             this.createAdvertisement(bodyAdvertisement)
             
         })
     }

     async createAdvertisement(bodyAdvertisement){
        const spinnerTemplate = buildAdvertisementsSpinnerView()
       
        this.createFormElement.innerHTML=spinnerTemplate

        try {
            await advertisementsService.createAdvertisement(bodyAdvertisement)
            this.createFormElement.replaceWith(this.createFormElementClone)
            pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Anuncio creado con éxito")
            
            
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
        } 
        
       
     }
 }

 // el formulario deben estar los campos completos
 //al enviar guardar los datos y enviarlos al sevidor
