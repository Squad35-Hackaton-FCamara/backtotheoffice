const $agendarBtn = document.getElementById("agendarBtn");
const $campoEscritorio = document.getElementById("campoEscritorio");
const $campoData = document.getElementById("campoData");
const $campoPeriodo = document.getElementById("campoPeriodo");

const validarCampos = () => {
    if ($campoEscritorio.value == "" || $campoData.value == "" || $campoPeriodo.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você esqueceu de preencher algum campo!'
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
    console.log(agenda);
    axios.post('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json', agenda)
        .then(function (response) {        
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

$agendarBtn.addEventListener("click", salvarAgenda)

