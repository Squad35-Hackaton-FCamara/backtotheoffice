const $listaAgendamentos = document.getElementById("listaAgendamentos");

const objToArray = (obj) => {
    let result = [];    
    for (let key in obj) {
       if (obj.hasOwnProperty(key)) {
           result.push(obj[key]);
       }
    }
    return result;
};

const mostrarListaAgendamentos = () => {

};

window.onload = (event) => {
    axios.get('https://de-volta-para-o-escritorio-default-rtdb.firebaseio.com/agenda.json')
        .then(function (response) {    
            console.log(response);
            const agendamentosArray = objToArray(response.data);
            console.log(agendamentosArray);
        })
        .catch(function (error) {    
            console.log(error);
        })
};

