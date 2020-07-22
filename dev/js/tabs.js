;(function(){
    for (const tabs of document.querySelectorAll('[data-tabs]')){
        const list = tabs.querySelector('[data-tabs-list]')
        const item = tabs.querySelector('[data-tabs-item]')

        let alredyActive = false

        for (const li of list.children){
            if (li.classList.contains('active')) alredyActive = true

            li.addEventListener('click', function(){
                ClearActiveItem(item.children)
                ClearActiveList(list.children)

                li.classList.add('active')
                item.querySelector('[data-tab="'+li.dataset.tab+'"]').classList.add('active')
            })
        }

        if (!alredyActive)
            list.children[0].dispatchEvent(new Event('click'))
    }

    function ClearActiveItem(_item){
        for (const e of _item)
            e.classList.remove('active')
    }

    function ClearActiveList(_list){
        for (const e of _list)
            e.classList.remove('active')
    }
})();