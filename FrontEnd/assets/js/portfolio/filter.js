function filter(value){
    const workData = document.querySelectorAll(".gallery figure")
    workData.forEach((data) => {
        dataName = data.getAttribute('data-name')
        if (dataName != value) {
            data.classList.add('hidden')
        }
        if (dataName == value){
            data.classList.remove('hidden')
        }
        if (value == 'Tous'){
            data.classList.remove('hidden')
        }
        catBtns.forEach((catBtn) => {
            if (catBtn.getAttribute('value') != value){
                catBtn.classList.remove('active')
            }
        })
    })
}