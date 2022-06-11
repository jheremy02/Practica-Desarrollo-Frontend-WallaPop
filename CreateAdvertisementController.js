 export class CreateAdvertisement {
     constructor (createFormElement) {
        this.createFormElement=createFormElement;
        this.main()
        
     }

     main () {
         this.onAnyInputChanged()
         this.onSubmitForm()
         this.onSubmitForm()
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
         this.createFormElement.addEventListener('submit',()=>{
             event.preventDefault()
             const inputElements=new FormData(this.createFormElement)
             console.log(inputElements.get('gridRadios'))
         })
     }
 }

 // el formulario deben estar los campos completos
 //al enviar guardar los datos y enviarlos al sevidor
