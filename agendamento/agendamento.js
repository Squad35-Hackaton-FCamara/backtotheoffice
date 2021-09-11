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

const verificarDisponibilidade = async () => {
    const escritorioEscolhido = $campoEscritorio.value;
    const dataEScolhida = $campoData.value;
    const peridoEscolhido = $campoPeriodo.value;
    const agendamentosDoDia = [];
    const response = await axios.get('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json')
    const agendamentosArray = objParaArray(response.data);    
    for (const agendamento of agendamentosArray) {
        if (agendamento.escritorio == escritorioEscolhido && 
            agendamento.data == dataEScolhida &&
            (agendamento.periodo == peridoEscolhido || agendamento.periodo == "integral" || peridoEscolhido == "integral")) {
                agendamentosDoDia.push(agendamento)
        }
    }
    
    const porcentagem = 0.4;
    const maxLugaresSaoPaulo = 600;
    const maxLugaresSantos = 100;
    let maxAgendamentos;
    if (escritorioEscolhido == "saoPaulo") {
        maxAgendamentos = porcentagem * maxLugaresSaoPaulo;
    } else if (escritorioEscolhido == "santos") {
        maxAgendamentos = porcentagem * maxLugaresSantos;
    }
    
    if (agendamentosDoDia.length >= maxAgendamentos) {
        return false;
    } else {
        return true;
    }
}

const salvarAgenda = async () => {
    const camposValidos = validarCampos();
    if (camposValidos == false) {
        return;
    }

    const disponibilidade = await verificarDisponibilidade();
    if (disponibilidade == false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Infelizmente não há agendamentos disponíveis para este escritório na data e no período escolhidos.'
        })
        return;
    }
    const agenda = {
        usuario: {
            nome: "Usuário",
            userId: 1
        },
        escritorio: $campoEscritorio.value,
        data: $campoData.value,
        periodo: $campoPeriodo.value        
    };
    axios.post('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json', agenda)
            .then(function (response) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Sua volta ao escritório foi agendada!',                    
                    icon: "success",
                    confirmButtonColor: '#36357E'
                }).then((result) => {
                    if (result.isConfirmed) {          
                        atualizaUI();
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
}

$agendarBtn.addEventListener("click", salvarAgenda)
$voltarBtn.addEventListener("click", () => {
    window.location.href = window.location.origin + "/tela-inicial"
})