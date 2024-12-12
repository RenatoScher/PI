async function load(topbar = true, footer = true) {
    let currpath = window.location.pathname;
    let content = document.body.querySelector('div');
    console.log(topbar, footer)
    content.innerHTML = 
        (topbar ? (await (await fetch('/Assets/common/topbar.html')).text()) : '') +
        content.innerHTML +
        (footer ? (await (await fetch('/Assets/common/footer.html')).text()) : '');
}