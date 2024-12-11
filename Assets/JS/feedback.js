function media(x){
    return x/2;
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById("submitButton").onclick = sendFeedback;


        for (let starsGroup of document.getElementsByClassName('stars')) {
            for (let star of starsGroup.querySelectorAll('input')) {
                star.onchange = function() {
                    console.log(star.checked)
                    if (!star.checked) {return;}
                    for (let label of starsGroup.querySelectorAll('label')) {
                        if (Number(label.htmlFor.charAt(4)) <= Number(star.value)) {
                            console.log(label);
                            label.classList.add('checkedStar');
                        } else {
                            label.classList.remove('checkedStar');
                        }
                    }
                }
            }
        }
    }, 200);
})


function sendFeedback(){
    const grupos = document.querySelectorAll('.stars input[type="radio"]');
    let valorTotal = 0;
    
    grupos.forEach(grupo => {
        if (grupo.checked) {
            console.log(`Grupo: ${grupo.name}, Valor: ${grupo.value}`);
            let convertionNumberValue = Number(grupo.value);
            valorTotal = valorTotal+convertionNumberValue;               
        }
    });

    let averageRating = media(valorTotal);
    console.log("avg: " + averageRating);
        
    if(averageRating<=3){
        console.log("a nota foi UMA MERDA!");
    }
     else if(averageRating>=4 && averageRating<6){
        console.log("a nota foi um pocuo baixa!");
     }else if(averageRating>=6 && averageRating<=8){
        console.log("a nota foi media!");
     }else if(averageRating>8){
        console.log("nota alta");
     }
}




