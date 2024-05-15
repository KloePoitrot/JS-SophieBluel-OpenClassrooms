async function getWork() {
    const req = await fetch("http://localhost:5678/api/works");
    const get = await req.json();

    //DOM 
    let workElements = document.querySelector(".gallery")
    workElements.innerHTML = ''

    // List work from API
    for(let i = 0; i < get.length ; i++){
        workElements.innerHTML += '<figure><img src="' + get[i].imageUrl + '" alt="' + get[i].title + '" data-name="' + get[i].title + '"><figcaption>' + get[i].title + '</figcaption></figure>'
    }
}

getWork()

