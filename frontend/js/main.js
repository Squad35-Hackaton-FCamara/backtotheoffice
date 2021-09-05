const cardIconeSenha = document.getElementById("iconeSenha");
const iconeSenha = cardIconeSenha.firstElementChild;
const cardIconeRepetirSenha = document.getElementById("iconeRepetirSenha");
const iconeRepetirSenha = cardIconeRepetirSenha.firstElementChild;
const inputSenha = document.getElementById("senha");
const inputRepetirSenha = document.getElementById("repetirSenha")

const passwordIconClickHandler = () => {
    if (inputSenha.type == "password") {
        inputSenha.type = "text";
        iconeSenha.classList.remove( "fa-eye-slash" );
        iconeSenha.classList.add( "fa-eye" );
      } else {
        inputSenha.type = "password";
        iconeSenha.classList.add( "fa-eye-slash" );
        iconeSenha.classList.remove( "fa-eye" );
      }
}

const repeatPasswordIconClickHandler = () => {
    if (inputRepetirSenha.type == "password") {
        inputRepetirSenha.type = "text";
        iconeRepetirSenha.classList.remove("fa-eye-slash");
        iconeRepetirSenha.classList.add("fa-eye");
      } else {
        inputRepetirSenha.type = "password";
        iconeRepetirSenha.classList.add("fa-eye-slash");
        iconeRepetirSenha.classList.remove("fa-eye");
      }
}

iconeSenha.addEventListener("click", passwordIconClickHandler);
iconeRepetirSenha.addEventListener("click", repeatPasswordIconClickHandler);