M.Sidenav.init(document.querySelector('.sidenav'));


document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});