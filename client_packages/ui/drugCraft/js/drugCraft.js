let btn = document.getElementById('btn')
let closeBtn = document.getElementById('close__img')

closeBtn.addEventListener('click', function() {
    mp.trigger('hideDrugsCraftBrowser')
})

btn.addEventListener('click', function() {
    let elem = document.getElementById('bar'),
        width = 0,
        id = setInterval(progressStatus, 30)
        function progressStatus() {
            if (width >= 170) {
                clearInterval(id)
                elem.style.width = 0 + 'px'
                mp.trigger('drugsEffect')
            } else {
                width++
                elem.style.width = width + 'px'
            }
        }
})