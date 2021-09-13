const $telaInicialBtn = document.getElementById("telaInicial");
const $telaAgendamentosBtn = document.getElementById("telaAgendamentos");
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
    <p class="bem-vindo">Agendamentos dos demais <span>Sangue Laranja</span>:</p>
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

const renderizaAgendamento = (id, escritorio, data, periodo, nomeUsuario, idUsuario) => {    
    if (nomeUsuario == usuarioLogado.nome || idUsuario == usuarioLogado.id) {
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
        <img src="/img/icone-agenda.png" alt="ícone de agenda">
        <div class="agendamento-info">
            <p><span>Consultor:</span> ${nomeUsuario}</p>
            <p><span>Escritório:</span> ${escritorio}</p>
            <p><span>Data:</span> ${data}</p>
            <p><span>Horário/Período:</span> ${periodo}</p>
        </div>
    </div>
    `;    

    $listaAgendamentos.append(novoAgendamento);
}

const mostraListaAgendamentos = (agendamentos) => {    
    for (let obj of agendamentos) {
        renderizaAgendamento(obj.id, obj.escritorio, obj.data, obj.periodo, obj.usuario.nome, obj.usuario.userId);
    }
    atualizaUI();
};

window.onload = () => {
    axios.get(`https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json`)
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

$telaInicialBtn.addEventListener("click", () => window.location.href = window.location.origin + "/tela-inicial");
$telaAgendamentosBtn.addEventListener("click", () => window.location.href = window.location.origin + "/agendamento");
$logout.addEventListener("click", fazerLogout);