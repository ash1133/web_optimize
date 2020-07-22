;(function(){
    const allMenuBtn = document.querySelectorAll('[data-header-menu-btn]')

    for (const btn of allMenuBtn){
        btn.addEventListener('click', function(){
            if (btn.nextElementSibling.classList.contains('active')) {
                btn.classList.remove('active')
                btn.nextElementSibling.classList.remove('active')
                document.body.classList.remove('ovf_h')
            }
            else {
                btn.classList.add('active')
                btn.nextElementSibling.classList.add('active')
                document.body.classList.add('ovf_h')
            }
        })
    }
})();