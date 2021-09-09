const $listaAgendamentos = document.getElementById("listaAgendamentos");
const cardInicio = document.getElementById("card-inicio");
const $cardAtualizado = document.getElementById("card-atualizado");
const $saudacao = document.getElementById("saudacao");
const agendarBtn = document.getElementById("agendarBtn");

function atualizaUI() {
    if (document.querySelectorAll("#listaAgendamentos li").length > 0) {
        cardInicio.style.display = "none";
        $cardAtualizado.style.display = "flex";
        renderizaSaudacaoAtualizada();
    } else {
        cardInicio.style.display = "flex";
        $cardAtualizado.style.display = "none";
    }
}

const renderizaSaudacaoAtualizada = () => {
    const saudacaoAtualizada = document.createElement("div");
    saudacaoAtualizada.className = "elemento-saudacao";
    saudacaoAtualizada.innerHTML = `
    <p class="bem-vindo">Seja bem-vindo(a), <span>Sangue Laranja!</span></p>
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
    axios.delete("https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json",{
        data: {id: id}
      }).then((response) => {
        Swal.fire(
            'Deletado!',
            'Seu agendamento foi deletado.',
            'success'
          )
      }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado!'
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

const renderizaAgendamento = (id, escritorio, data, periodo) => {
    const novoAgendamento = document.createElement("li");    
    novoAgendamento.className = "elemento-agendamento";
    novoAgendamento.innerHTML = `
    <div class="card">       
        <img src="/img/icone-agenda.png" alt="ícone de agenda">
        <div class="agendamento-info">
            <p><span>Escritório:</span> ${escritorio}</p>
            <p><span>Data:</span> ${data}</p>
            <p><span>Horário/Período:</span> ${periodo}</p>
        </div>
    </div>
    `;    

    const deletarAgendamentoBtn = document.createElement("button");
    deletarAgendamentoBtn.className = "deletarBtn";

    novoAgendamento.addEventListener("click", exibeModalDeletarAgendamento.bind(null, id));
    novoAgendamento.querySelector(".card").append(deletarAgendamentoBtn); 
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

agendarBtn.addEventListener("click", () => {
    window.location.href = window.location.origin + "/agendamento"
})