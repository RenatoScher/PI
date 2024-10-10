

window.addEventListener('scroll', function() {
	var element = document.querySelector('#imagemPizza');	
	var position = element.getBoundingClientRect();

    if(position.top < window.innerHeight && position.bottom >= 0){
		console.log('animation');
		element.classList.add('doAnimation');
	} 
});


window.addEventListener('scroll', function() {
	var element = document.querySelector('#menuOpt');
	var position = element.getBoundingClientRect();

    if(position.top < window.innerHeight && position.bottom >= 0){
		element.classList.add('doAnimation');
	}
});