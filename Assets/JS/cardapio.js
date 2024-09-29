let current = document.getElementById('orderType');
let menuOptions = document.getElementById('menuOptions');
let subMenuOptions = menuOptions.children;

current.addEventListener('change', () => {
    let a = current.value;
    for (let b of subMenuOptions) {
        
        if (b.id == 'menu' + a[0].toUpperCase() + a.substring(1)) {
            b.style.removeProperty('display');
            continue;
        }
        b.style.display = 'none'
        console.log(b);
    }
})