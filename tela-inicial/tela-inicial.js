const $telaAgendamentosBtn = document.getElementById("telaAgendamentos");
const $consultarColegas = document.getElementById("consultar-colegas");
const $logout = document.getElementById("logout");
 
const $listaAgendamentos = document.getElementById("listaAgendamentos");
const $cardInicio = document.getElementById("card-inicio");
const $cardAtualizado = document.getElementById("card-atualizado");
const $saudacao = document.getElementById("saudacao");
const $agendarBtn = document.getElementById("agendarBtn");

const agendamentos = [];

const usuarioString = localStorage.getItem("usuarioLogado");
let usuarioLogado = JSON.parse(usuarioString);

function atualizaUI() {
    if (document.querySelectorAll("#listaAgendamentos li").length > 0) {
        $cardInicio.style.display = "none";
        $cardAtualizado.style.display = "flex";
        renderizaSaudacaoAtualizada();
    } else {
        $cardInicio.style.display = "flex";
        $cardAtualizado.style.display = "none";
    }
}

const renderizaSaudacaoAtualizada = () => {
    const saudacaoAtualizada = document.createElement("div");
    saudacaoAtualizada.className = "elemento-saudacao";
    saudacaoAtualizada.innerHTML = `
    <p class="bem-vindo">Seja bem-vindo(a), <span>${usuarioLogado.nome}!</span></p>
    <p class="seus-agendamentos">Seus agendamentos:</p>
    `;
    $saudacao.append(saudacaoAtualizada);
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

const deletaAgendamento = (id) => {
    let agendamentoIndex = 0;
    for (const agendamento of agendamentos) {
        if (agendamento.id === id || agendamentos.length == 1) { break; }
        agendamentoIndex++;
    }
    
    agendamentos.splice(agendamentoIndex, 1);
    $listaAgendamentos.children[agendamentoIndex].remove();
    axios.delete(`https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda/${id}.json`).then((response) => {
        Swal.fire({
            title: 'Deletado!',
            text: "Seu agendamento foi deletado.",
            icon: 'success',
            confirmButtonColor: '#36357E'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = window.location.origin + "/tela-inicial"
            }
        })       
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado!',
            confirmButtonColor: '#36357E'
        })
    })
}

const exibeModalDeletarAgendamento = (id) => {
    Swal.fire({
        title: 'Tem certeza de que quer deletar este agendamento?',
        text: "Você não poderá reverter esta ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#36357E',
        cancelButtonColor: '#FE4400',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {          
            deletaAgendamento(id);                       
        }
      })
}

const renderizaAgendamento = (id, escritorio, data, periodo, nomeUsuario, idUsuario) => {    
    if (nomeUsuario !== usuarioLogado.nome || idUsuario !== usuarioLogado.id) {
        return;
    }
    
    if (escritorio == "saoPaulo") {
        escritorio = "São Paulo";
    } else if (escritorio == "santos") {
        escritorio = "Santos";
    }

    data = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    if (periodo == "manha") {
        periodo = "08:00 - 13:00 (Manhã)";
    } else if (periodo == "tarde") {
        periodo = "13:00 - 18:00 (Tarde)";
    } else if (periodo == "integral"){
        periodo = "08:00 - 18:00 (Integral)";
    }
    
    const novoAgendamento = document.createElement("li");
    novoAgendamento.className = "elemento-agendamento";
    novoAgendamento.innerHTML = `
    <div class="card">       
        <img src="../img/icone-agenda.png" alt="ícone de agenda">
        <div class="agendamento-info">
            <p><span>Escritório:</span> ${escritorio}</p>
            <p><span>Data:</span> ${data}</p>
            <p><span>Horário/Período:</span> ${periodo}</p>
        </div>
    </div>
    `;    

    const deletarAgendamentoBtn = document.createElement("button");
    deletarAgendamentoBtn.className = "deletarBtn";

    deletarAgendamentoBtn.addEventListener("click", exibeModalDeletarAgendamento.bind(null, id));
    novoAgendamento.querySelector(".card").append(deletarAgendamentoBtn); 
    $listaAgendamentos.append(novoAgendamento);
}

const mostraListaAgendamentos = (agendamentos) => {    
    for (let obj of agendamentos) {
        renderizaAgendamento(obj.id, obj.escritorio, obj.data, obj.periodo, obj.usuario.nome, obj.usuario.userId);
    }
    atualizaUI();
};

window.onload = () => {
    axios.get(`https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json`) //alterar caminho; setar quando agenda algum caminho acessável pelo id
        .then(function (response) {
            const agendamentosArray = objParaArray(response.data);
            mostraListaAgendamentos(agendamentosArray);
            agendamentos.push(agendamentosArray);
        })
        .catch(function (error) {    
            console.log(error);
        });
};

const fazerLogout = () => {
    localStorage.removeItem("usuarioLogado")
    usuarioLogado = "";
    window.location.href = window.location.origin + "/login"
};

$agendarBtn.addEventListener("click", () => window.location.href = window.location.origin + "/agendamento");
$telaAgendamentosBtn.addEventListener("click", () => window.location.href = window.location.origin + "/agendamento");
$consultarColegas.addEventListener("click", () => window.location.href = window.location.origin + "/tela-agenda-colegas");
$logout.addEventListener("click", fazerLogout);