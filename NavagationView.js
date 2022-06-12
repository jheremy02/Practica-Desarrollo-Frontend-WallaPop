export const navigationViews={
    buildNavigationBasic(){
        return 
    },

    buildRegisterButtonView(){
        return `
        <li class="nav-item">
        <a class="nav-link" href="/signUp.html">Registrarse</a>
      </li>
        `
    },

    buildLoginButtonView(){
        return `
        <li class="nav-item">
        <a class="nav-link" href="/login.html">Login</a>
      </li>
        `
    },

    buildCreateButtonView() {
        return `
        <li class="nav-item">
          <a class="nav-link" href="/createAdvertisement.html">Crear Anuncio</a>
        </li>
        `
      },

    buildCloseSession(){
        return `
        <li class="nav-item close-session">
          <a class="nav-link" href="#">Cerrar Sesion</a>
        </li>
        `
      }
    }


