let addType = document.getElementById('addType');
let addOptions = document.getElementsByClassName('addCards');
let sendButton = document.getElementById('sendButton');

addType.onchange = updateAddCard;
function updateAddCard() {
    let newInp = addType.value.toLowerCase();
    for (let el of addOptions) {
        if (el.id.toLowerCase().includes(newInp)) {
            el.style.removeProperty('display');
        } else {
            el.style.display = 'none';
        }
    }
}
updateAddCard();

sendButton.onmouseup = function() {
    let final = {}

    if (addType.value == 'pizza') {
        final['flavour'] = document.getElementById('pizFlavour').value;
        final['image'] = '#';
        final['price'] = document.getElementById('pizPrice').value;
        final['desc'] = document.getElementById('pizDesc').value;
        
    } else if (addType.value == 'bebida') {
        final['name'] = document.getElementById('bebName').value;
        final['image'] = '#';
        final['price'] = document.getElementById('bebPrice').value;
        final['quantidade_ml'] = document.getElementById('bebQuantity').value;
        
    } else {
        final['name'] = document.getElementById('porName').value;
        final['image'] = '#';
        final['price'] = document.getElementById('porPrice').value;
        final['desc'] = document.getElementById('porDesc').value;
    }

    console.log(final)
}