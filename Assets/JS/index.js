
window.addEventListener('scroll', function() {
	var element = document.querySelector('#imagemPizza');
	var position = element.getBoundingClientRect();


    if(position.top < window.innerHeight && position.bottom >= 0){
		element.style.display ='block';
	}else{
        element.style.display='none';
    }

    

	
});