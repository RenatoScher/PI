fetch('../jsonTest/products.json')
    .then(response => response.json())
    .then(response => loadItemsInCart(response));

let selectedAddress = document.getElementById('selectedAddress');
let customAdd = document.getElementById('customAddress');
let carrinho = JSON.parse(sessionStorage.getItem('carrinho'));
let itemsbox = document.getElementById('itemsBox');
let totalPrice = document.getElementById('price').querySelector('p');

selectedAddress.onchange = checkCustom;
function checkCustom() {
    if (selectedAddress.value == 'custom') { window.location.replace('../LoginPages/registerAddress2.html') }
}

if (!carrinho || carrinho.length == 0) {
    window.location.replace('./menuPage.html');
}

function loadItemsInCart(productsData) {
    let alrAdded = [];
    let aPrice = 0;

    for (let el of carrinho) {
        if (alrAdded.includes(el)) {
            continue;
        }


        let quantity = carrinho.reduce((total, x) => total+Number(x == el), 0);
        
        let currData;
        let currType;
        for (let [key, type] of Object.entries(productsData)) {
            for (let prod of type) {
                if (prod.name == el || prod.flavour == el) {
                    currData = prod;
                    currType = key;
                }
            }
        }

        let newDiv = document.createElement('div');
        itemsbox.appendChild(newDiv);
    
        let pName = document.createElement('p');
        newDiv.appendChild(pName);
        pName.innerText = el + ' ' + String(quantity) + 'x';
    
        let newImg = document.createElement('div');
        newDiv.appendChild(newImg);
        newImg.style.backgroundImage = 'url(../Images/Products/' + (currData.image == '#' ? 'placeholder.jpg' : currType + '/' + currData.image) + ')';
    
        let pPrice = document.createElement('p');
        newDiv.appendChild(pPrice);
        pPrice.innerText = 'R$' + String(currData.price * quantity);
        aPrice += currData.price * quantity;

        alrAdded.push(el);
    }

    totalPrice.innerText = 'R$ ' + String(aPrice);
}

if (sessionStorage.getItem('customAddress')) {
    //Verify address first
    selectedAddress.querySelector('option[value=\'custom\']').selected = 'selected'
}