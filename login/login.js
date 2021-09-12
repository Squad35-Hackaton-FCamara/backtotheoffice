const cardIconeSenha = document.getElementById("iconeSenha");
const iconeSenha = cardIconeSenha.firstElementChild;
const inputSenha = document.getElementById("senha");

const $campoEmail = document.getElementById("loginEmail");
const $campoSenha = document.getElementById("senha");
const $entrarBtn = document.getElementById("entrarBtn");

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

const validarCampos = () => {
  if ($campoEmail.value == "" || 
  $campoSenha.value == "") {      
      return false;
  }
  return true;
};

const objParaArray = (obj) => {
  let result = [];    
  for (let key in obj) {
     if (obj.hasOwnProperty(key)) {
         result.push({
          ...obj[key],
          id: key
         });
     }
  }
  return result;
};

const verificarSeEmailCadastrado = async () => {
  const emailInserido = $campoEmail.value;
    const response = await axios.get('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/usuario.json')
    const usuariosArray = objParaArray(response.data);
    let emailJaCadastrado = false;
    for (const usuario of usuariosArray) {
        if (usuario.email == emailInserido) {           
            emailJaCadastrado = true;
        }    
    }
    return emailJaCadastrado;
}

const entrar = async () => {
  const camposValidos = validarCampos();
    if (camposValidos == false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você esqueceu de preencher algum campo!',
        confirmButtonColor: '#36357E'
    })
    return;
    }

    const emailCadastrado = await verificarSeEmailCadastrado();
    if (emailCadastrado == false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Este e-mail ainda não foi cadastrado.',
            confirmButtonColor: '#36357E'
        })
        return;
    }

  window.location.href = window.location.origin + "/tela-inicial"
}

iconeSenha.addEventListener("click", passwordIconClickHandler);
$entrarBtn.addEventListener("click", entrar);