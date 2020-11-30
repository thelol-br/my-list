M.Sidenav.init(document.querySelector('.sidenav'));
M.FormSelect.init(document.querySelector('#status'));


document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});