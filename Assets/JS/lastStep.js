fetch('../jsonTest/products.json')
    .then(response => response.json())
    .then(response => loadItemsInCart(response));

let itemsbox, totalPrice;
let carrinho = JSON.parse(sessionStorage.getItem('carrinho'));
let pizzaPrices = {"P": 39.99, "M": 79.99, "G": 99.99}

function checkCustom() { console.log('custom')
    let selectedAddress = document.getElementById('selectedAddress');
    if (!selectedAddress) { return; }
    if (selectedAddress.value == 'custom') { window.location.replace('../LoginPages/registerAddress2.html') }
}

if (!carrinho || carrinho.length == 0) {
    window.location.replace('./menuPage.html');
}

function loadItemsInCart(productsData) {
    let alrAdded = [];
    let aPrice = 0;

    itemsbox = document.getElementById('itemsBox');
    totalPrice = document.getElementById('price').querySelector('p');

    for (let el of carrinho) {
        if (alrAdded.includes(el)) {
            continue;
        }
        

        let quantity = carrinho.reduce((total, x) => total+Number(x == el), 0);
        
        let currData;
        let currType;
        for (let [key, type] of Object.entries(productsData)) {
            for (let prod of type) {
                let flav = el.match(/\(([^)]+)\)/);
                if (prod.name == el || (flav && prod.flavour == flav[1].split(',')[0])) {
                    currData = prod;
                    currType = key;
                }
            }
        }
        
        if (el.includes("Pizza")) {
            currData.price = pizzaPrices[el[6]];
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


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        let selectedAddress = document.getElementById('selectedAddress');
        selectedAddress.addEventListener("change", checkCustom)
    }, 100);

    document.body.addEventListener('change', function(event) {
        if (event.target && event.target.id === 'selectedAddress') {
            console.log('please');
        }
    });
    
    if (sessionStorage.getItem('customAddress')) {
        //Verify address first
        if (!selectedAddress) { return; }
        selectedAddress.querySelector('option[value=\'custom\']').selected = 'selected'
    }
});