var dataToken = sessionStorage.getItem("token")

// =======================
//
// __________________Show gallery
// 
// =======================
async function getWork() {
    const req = await fetch("http://localhost:5678/api/works");
    const work = await req.json();

    //DOM 
    let workElements = document.querySelector(".gallery")
    workElements.innerHTML = ''

    // List work from API
    for(let i = 0; i < work.length ; i++){
        workElements.innerHTML += '<figure data-name="' + work[i].category.name + '"><img src="' + work[i].imageUrl + '" alt="' + work[i].title + '"><figcaption>' + work[i].   title +'</figcaption></figure>'
    }

    // List work from API for edit mode
    if(dataToken !== null){
        let workEdit = ''
        for(let i = 0; i < work.length ; i++){
            workEdit += '<div><i class="fas fa-trash-alt deleteWork" data-id="' + work[i].id + '"></i><figure><img src="' + work[i].imageUrl + '" alt="' + work[i].title + '"></figure></div>'
        }
        displayEditWork(workEdit)
    }
    getCategories()
}

getWork()










