const productsData = await fetch('./jsonTest/products.json').then(r => r.json());


fetch('./jsonTest/pedidos.json')
    .then(r => r.json())
    .then(function(jso) {
        setTimeout(() => {
            const historyScroll = document.getElementById("historyScroll");
            const orderPrice = document.getElementById("orderPrice");
            const ordered = document.getElementById("ordered");
            const orderAgain = document.getElementById("orderAgain");
            

            for (let ped of jso.Pedidos) {

                let pedTPrice = 0;
                for (let prod of ped.itens) {
                    if (prod.includes("Pizza")) {
                        pedTPrice += ped[6] == "P" ? 39.99 : ped[6] == "M" ? 79.99 : 99.99
                    }

                    for (let i = 0; i < Object.values(productsData).length-1; i++) {
                        let x = Object.values(productsData)[i];
                        for (let y of x) {
                            if (y.name == prod) {
                                pedTPrice += y.price;
                            }
                        }
                    }
                }
                pedTPrice = Math.floor(pedTPrice * 100) / 100;


                let newDiv = document.createElement('div');
                historyScroll.appendChild(newDiv);

                let dateDiv = document.createElement('div');
                newDiv.appendChild(dateDiv);
                let dateP = document.createElement('p');
                dateDiv.appendChild(dateP);
                dateP.innerText = ped.date;

                let endDiv = document.createElement('div');
                newDiv.appendChild(endDiv);
                let endP = document.createElement('p');
                endDiv.appendChild(endP);
                endP.innerText = ped.address;

                let tPriceDiv = document.createElement('div');
                newDiv.appendChild(tPriceDiv);
                let tPriceP = document.createElement('p');
                tPriceDiv.appendChild(tPriceP);
                tPriceP.innerText = "R$ " + pedTPrice;

                let detailsDiv = document.createElement('div');
                newDiv.appendChild(detailsDiv);
                let detailsP = document.createElement('p');
                detailsDiv.appendChild(detailsP);
                detailsP.innerText = ped.itens.join(', ');

                
                newDiv.onclick = function() {
                    orderPrice.innerText = "R$ " + pedTPrice;

                    const listUl = ordered.getElementsByTagName('ul');
                    const listP = ordered.getElementsByTagName('p');
                    
                    for (let ul of listUl) {
                        ul.innerHTML = "";
                    }

                    for (let prod of ped.itens) {
                        if (prod.includes("Pizza")) {
                            let newLi = document.createElement('li');
                            newLi.innerText = prod;
                            listUl[0].appendChild(newLi);
                        }

                        for (let i = 0; i < Object.values(productsData).length-1; i++) {
                            let x = Object.values(productsData)[i];
                            for (let y of x) {
                                if (y.name == prod) {
                                    let newLi = document.createElement("li");
                                    newLi.innerText = prod;
                                    listUl[i+1].appendChild(newLi);
                                }
                            }
                        }

                        for (let i = 0; i < listUl.length; i++) {
                            let ul = listUl[i];
                            let leng = ul.children.length;
                            
                            if (leng == 0) {
                                listP[i].style.display = 'none';
                            } else {
                                listP[i].style.removeProperty('display');
                            }
                        }
                    }
                }

                orderAgain.onmouseup = function() {
                    
                }

            }

        }, 120);
    })