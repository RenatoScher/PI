fetch('../jsonTest/pedidos.json')
    .then(response => response.json())
    .then(response => loadElements(response));

let historyScroll = document.getElementById('historyScroll');


function loadElements(elList) {
    for (el of elList.Pedidos) {
        
    }
}