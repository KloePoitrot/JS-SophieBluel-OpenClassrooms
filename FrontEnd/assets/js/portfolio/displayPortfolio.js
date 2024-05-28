var dataToken = sessionStorage.getItem("token")

async function getWork(){
    fetch("http://localhost:5678/api/works")
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            domWork(data)
        }
    }).catch((error) => {
        console.error(error);
    });
}

function domWork(data){
    //DOM 
    let workElements = document.querySelector(".gallery")
    workElements.innerHTML = ''
    // List work from API
    for(let i = 0; i < data.length ; i++){
        workElements.innerHTML += `
            <figure data-name="` + data[i].category.name + `">
                <img src="` + data[i].imageUrl + `" alt="` + data[i].title + `">
                <figcaption>` + data[i].   title +`</figcaption>
            </figure>`
    }
}

getWork()








