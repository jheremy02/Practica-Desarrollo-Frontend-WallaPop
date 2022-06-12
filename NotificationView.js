export const notificactionViews = {
    
    buildNotificationError(message) {
        return `
        <div class="alert alert-danger" role="alert">${message}</div>
        `
    },

    buildNotificationSuccess(message){
        return `<div class="alert alert-success" role="alert">${message}</div>`
    }


}

