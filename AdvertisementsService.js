export default {
    getAdvertisements(){
        
        return fetch('http://localhost:8000/api/advertisements')
        .then(responseHttp=>{
            return responseHttp.json()
        })

    }
}