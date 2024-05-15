// =======================
//
// __________________Show gallery
// 
// =======================
async function getWork(cat) {
    const req = await fetch("http://localhost:5678/api/works");
    const work = await req.json();

    //DOM 
    let workElements = document.querySelector(".gallery")
    workElements.innerHTML = ''

    // List work from API
    if (cat === null) {
        for(let i = 0; i < work.length ; i++){
            workElements.innerHTML += '<figure><img src="' + work[i].imageUrl + '" alt="' + work[i].title + '" data-name="' + work[i].category.name + '"><figcaption>' + work[i].   title + '</figcaption></figure>'
        }
    }

    // if (cat == )
}

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

    // List categories from API
    for(let i = 0; i < categories.length ; i++){
        catElements.innerHTML += '<input type="button" value="' + categories[i].name + '">'
    }
}

document.querySelector("#categories").addEventListener('click', () => {
        console.log('wow')
    }
)

getWork(null)
getCategories()