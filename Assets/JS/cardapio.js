fetch('../jsonTest/products.json')
    .then(response => response.json())
    .then(response => loadElements(response));

const current = document.getElementById('orderType');

let carrinho = [];

let pizzaFlavours = [];



function updateDisplay() {
    let a = document.getElementById('orderType').value;
    for (let b of document.getElementById('menuOptions').children) {
        
        if (b.id == 'menu' + a[0].toUpperCase() + a.substring(1)) {
            b.style.removeProperty('display');
            continue;
        }
        b.style.display = 'none';
    }
    document.getElementById('search').value = '';
    searchBar();
}
updateDisplay();

function loadElements(products) {
    const carrinhoLista = document.getElementById('carrinhoLista');
    let customStyle = document.head.appendChild(document.createElement('style'));

    for (let el of document.getElementById('menuOptions').children) {
        
        let currData = products[el.id.substring(4)];
        if (currData.length == 0) { continue; }
        for (let prod of currData) {
            let newDiv = document.createElement('div');
            el.appendChild(newDiv);
            newDiv.id = (prod.name ?? prod.flavour).replaceAll(' ', '');
            customStyle.innerHTML += '#' + newDiv.id + ':hover:before { content: "'+ (prod.desc ?? 'Bebida') + '"; }';
            

            let nameDiv = document.createElement('div');
            newDiv.appendChild(nameDiv);
            nameDiv.id = 'titlepizza';
            
            let pName = document.createElement('h3');
            nameDiv.appendChild(pName);
            pName.innerText = prod.name ?? prod.flavour;
    
            let newImg = document.createElement('div');
            newDiv.appendChild(newImg);
            newImg.classList.add('productImage');
            newImg.style.backgroundImage = 'url(../Images/Products/' + (prod.image == '#' ? 'placeholder.jpg' : (el.id.substring(4) + '/' + prod.image)) + ')';
    
            let pPrice = document.createElement('p');
            newDiv.appendChild(pPrice);
            pPrice.innerHTML = 'R$' + String(prod.price);

            if (el.id == 'menuPizzas') {
                newDiv.addEventListener('mouseup', () => {
                    const pizzaSettings = document.getElementById('pizzaSettings');
                    const pizzaFlavoursList = pizzaSettings.querySelector('ul').children;
                    console.log(pizzaFlavoursList)
                    
                    let idname = pizzaSettings.querySelector('input[name=howManyFlavours]:checked').id
                    let maxLength = Number(idname[idname.length - 1]);

                    if (pizzaFlavours.length >= maxLength) {return;}

                    pizzaFlavoursList[pizzaFlavours.length].innerText = prod.flavour;
                    pizzaFlavours.push(prod.flavour);
                    
                });

            } else {
                newDiv.addEventListener('mouseup', () => {
                    if (carrinho.includes(pName.innerText)) {
                        for (let curr of carrinhoLista.children) {
                            if (curr.innerText.includes(pName.innerText)) {
                                let howMany = carrinho.reduce((total, x) => total+Number(x==pName.innerText), 0);
                                console.log(howMany, howMany.toString().length)
                                if (howMany == 1) {
                                    curr.innerHTML += ' ' + String(howMany+1) + 'x';
                                } else {
                                    curr.innerHTML = curr.innerText.substring(0, curr.innerText.length - (howMany.toString().length+1)) + String(howMany+1) + curr.innerText.charAt(curr.innerText.length-1)
                                }
                            }
                        }
                    
                    } else {
                        let newLi = document.createElement('li');
                        carrinhoLista.appendChild(newLi);
                        newLi.innerText = pName.innerText;
                    }
                        
                    carrinho.push(pName.innerText)
                    carrinhoLista.querySelector('p').style.display = 'none';
                });
            }
        }
    }

    document.getElementById('orderType').onchange = updateDisplay;
    document.getElementById('nextStep').onmouseup = nextScreen;
    document.getElementById('search').oninput = searchBar;
    document.getElementById('cleanPizza').onmouseup = cleanPizzaFlavours;
    document.getElementById('addPizza').onmouseup = addPizza;
}


function cleanPizzaFlavours() {
    pizzaFlavours = [];
    const pizzaFlavoursList = pizzaSettings.querySelector('ul').children;
    for (let el of pizzaFlavoursList) {
        el.innerText = 'Escolha um sabor!';
    }
}

function addPizza() {
    let idname = pizzaSettings.querySelector('input[name=howManyFlavours]:checked').id
    let maxLength = Number(idname[idname.length - 1]);

    if (pizzaFlavours.length != maxLength) {return;}

    carrinho.push('Pizza' + pizzaFlavours.length + ' - (' + pizzaFlavours + ')');
    
    let howMany = carrinho.reduce((total, x) => total+Number(x==pName.innerText), 0);
    console.log(howMany, howMany.toString().length)
    if (howMany == 1) {
        curr.innerHTML += ' ' + String(howMany+1) + 'x';
    } else {
        curr.innerHTML = curr.innerText.substring(0, curr.innerText.length - (howMany.toString().length+1)) + String(howMany+1) + curr.innerText.charAt(curr.innerText.length-1)
    }
    
    cleanPizzaFlavours();
}

for (let el of pizzaSettings.querySelectorAll('input[name=howManyFlavours]')) {
    el.onchange = function() {
        let number = Number(this.id[this.id.length-1]);
        
        for (let i = 0; i < pizzaSettings.querySelectorAll('input[name=howManyFlavours]').length; i++) {
            if (i < number) {
                pizzaFlavoursList[i].style.removeProperty('display');
            } else {
                pizzaFlavoursList[i].style.display = 'none';
            }
        }
    }
}


function searchBar() {
    let inp = document.getElementById('search').value.toLowerCase();

    for (let subMenu of document.getElementById('menuOptions').children) {
        for (let prod of subMenu.children) {
            if (prod.id == 'pizzaSettings') { continue; }

            if (!prod.firstChild.innerText.toLowerCase().includes(inp)) {
                prod.style.display = 'none';
            } else {
                prod.style.removeProperty('display');
            }
        }
    }
}

function nextScreen() {
    if (carrinho.length == 0) { return; }

    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.replace('./lastStep.html');
}