const cardIconeSenha = document.getElementById("iconeSenha");
const iconeSenha = cardIconeSenha.firstElementChild;
const inputSenha = document.getElementById("senha");

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

iconeSenha.addEventListener("click", passwordIconClickHandler);