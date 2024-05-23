// =======================
//
// __________________Get Categories
// 
// =======================
async function getCategories() {
    const req = await fetch("http://localhost:5678/api/categories");
    const categories = await req.json();
     //DOM 
    let catElements = document.querySelector("#categories")
    catElements.innerHTML = ''
    catElements.innerHTML += '<input type="button" class="active" value="Tous">'
    // List categories from API
    for(let i = 0; i < categories.length ; i++){
        catElements.innerHTML += '<input type="button" value="' + categories[i].name + '">'
    }
    
    
    
    
    // =======================
    //
    // __________________Display by categories
    // 
    // =======================
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