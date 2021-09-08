const $listaAgendamentos = document.getElementById("listaAgendamentos");
const cardInicio = document.getElementById("card-inicio");

function atualizaUI() {
    if ($listaAgendamentos && $listaAgendamentos.length > 0) {
        cardInicio.style.display = "none";
    } else {
        cardInicio.style.display = "block";
    }
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

const renderizaAgendamento = (id, escritorio, data, periodo) => {
    const novoAgendamento = document.createElement("li");
    novoAgendamento.className = "elemento-agendamento";
    novoAgendamento.innerHTML = `
    <div class="card">
        <img src="/img/icone-agenda.png" alt="ícone de agenda">
        <div class="agendamento-info">
            <p>${escritorio}</p>
            <p>Data: ${data}</p>
            <p>Horário/Período: ${periodo}</p>
        </div>
    </div>
    `;
    //novoAgendamento.addEventListener("click", mostrarModalDeletarAgendamento.bind(null, id));  
    $listaAgendamentos.append(novoAgendamento);
}


const mostraListaAgendamentos = (agendamentos) => {    
    for (let obj of agendamentos) {
        renderizaAgendamento(obj.id, obj.escritorio, obj.data, obj.periodo);
    }
    atualizaUI();
};

window.onload = (event) => {
    axios.get('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json')
        .then(function (response) {
            const agendamentosArray = objParaArray(response.data);
            mostraListaAgendamentos(agendamentosArray);
        })
        .catch(function (error) {    
            console.log(error);
        })
};