const $campoNome = document.getElementById("nome");
const $campoEmail = document.getElementById("cadastroEmail");
const $campoSenha = document.getElementById("senha");
const $campoRepetirSenha = document.getElementById("repetirSenha");
const $cadastrarBtn = document.getElementById("cadastrarBtn");

const validarCampos = () => {
    if ($campoNome.value == "" || 
    $campoEmail.value == "" || 
    $campoSenha.value == "" || 
    $campoRepetirSenha.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você esqueceu de preencher algum campo!',
            confirmButtonColor: '#36357E'
        })
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
};

const verificarCaracteres = () => {
    const numeroDeCaracteres = $campoSenha.value;
    if (numeroDeCaracteres.length > 8) {
        return false;
    }
    return true;
}

const verificarCaracteresHandler = () => {
    const maxCaracteres = verificarCaracteres();
    if (maxCaracteres == false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sua senha deve ter no máximo 8 caracteres',
            confirmButtonColor: '#36357E'
        })
        $campoSenha.value = "";
        return;
    }
}

const verificarSenha = () => {
    if ($campoSenha.value !== $campoRepetirSenha.value) {
        return false;
    }
    return true;
}

const verificarSenhaHandler = () => {
    const senhaConfirmada = verificarSenha();
    if (senhaConfirmada == false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'As senhas informadas não coincidem',
            confirmButtonColor: '#36357E'
        })
        $campoSenha.value = "";
        $campoRepetirSenha.value = "";
        return;
    }
}

const cadastrarUsuario = async () => {
    const camposValidos = validarCampos();
    if (camposValidos == false) {
        return;
    }

    const emailCadastrado = await verificarSeEmailCadastrado();
    if (emailCadastrado == true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Este e-mail já foi cadastrado.',
            confirmButtonColor: '#36357E'
        })
        return;
    }

    const usuario = {
        nome: $campoNome.value,
        email: $campoEmail.value,
        senha: $campoSenha.value,
    };
    axios.post('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/usuario.json', usuario)
            .then(function (response) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Você foi cadastrado!',                    
                    icon: "success",
                    confirmButtonColor: '#36357E'
                }).then((result) => {
                    if (result.isConfirmed) {          
                        window.location.href = window.location.origin + "/backtotheoffice"
                    }
                })
            })
            .catch(function (error) {         
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado!',
                    confirmButtonColor: '#36357E'
                })   
            })
};

$cadastrarBtn.addEventListener("click", cadastrarUsuario);
$campoSenha.addEventListener("blur", verificarCaracteresHandler);
$campoRepetirSenha.addEventListener("blur", verificarSenhaHandler);