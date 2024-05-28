async function getCategories(){
    fetch("http://localhost:5678/api/categories")
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            filterCategories(data)
        }
    }).catch((error) => {
        console.error(error);
    });
}

function filterCategories(data){
    //DOM 
    let catElements = document.querySelector("#categories")
    catElements.innerHTML = ''
    catElements.innerHTML += '<input type="button" class="active" value="Tous">'
    // List categories from API
    for(let i = 0; i < data.length ; i++){
        catElements.innerHTML += '<input type="button" value="' + data[i].name + '">'
    }
    const catBtns = document.querySelectorAll("#categories input")
    catBtns.forEach((catBtn) => {
        catBtn.addEventListener('click', () => {
            const btnVal = catBtn.getAttribute('value')
            filter(btnVal)
            catBtn.classList.add('active')
        })
    })
    
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
}
getCategories()