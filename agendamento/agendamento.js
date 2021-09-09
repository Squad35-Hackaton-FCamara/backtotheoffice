const $voltarBtn = document.getElementById("voltarBtn");
const $agendarBtn = document.getElementById("agendarBtn");
const $campoEscritorio = document.getElementById("campoEscritorio");
const $campoData = document.getElementById("campoData");
const $campoPeriodo = document.getElementById("campoPeriodo");

const atualizaUI = () => {
    $campoEscritorio.value = "";
    $campoData.value = "";
    $campoPeriodo.value = "";
}

const validarCampos = () => {
    if ($campoEscritorio.value == "" || $campoData.value == "" || $campoPeriodo.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você esqueceu de preencher algum campo!',
            confirmButtonColor: '#36357E'
        })
        return false;
    }
    return true;
}

const salvarAgenda = () => {
    const camposValidos = validarCampos();
    if (camposValidos == false) {
        return;
    }    
    const agenda = {
        usuario: {
            nome: "Usuário",
            id: 1
        },
        escritorio: $campoEscritorio.value,
        data: $campoData.value,
        periodo: $campoPeriodo.value        
    };
    axios.post('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json', agenda)
            .then(function (response) {        
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })

    Swal.fire({
        title: 'Sucesso!',
        text: 'Sua volta ao escritório foi agendada!',
        //imageUrl: 'https://64.media.tumblr.com/tumblr_loutvwGscY1qbbpaoo1_500.gif',
        imageWidth: 400,
        icon: "success",
        //imageAlt: 'celebration gif',
        confirmButtonColor: '#36357E'
    }).then((result) => {
        if (result.isConfirmed) {          
            atualizaUI();
        }
      })    
}

$agendarBtn.addEventListener("click", salvarAgenda)
$voltarBtn.addEventListener("click", () => {
    window.location.href = window.location.origin + "/tela-inicial"
})