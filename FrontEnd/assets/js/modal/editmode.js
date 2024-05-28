var dataToken = sessionStorage.getItem("token")

if(dataToken !== null){
    document.querySelector('header').innerHTML += `
    <div class="editmode">
        <i class="far fa-edit"></i>
        <p>Mode édition</p>
    </div>`

    document.querySelector('#portfolio h2').insertAdjacentHTML("afterend", '<div class="editBtn"><i class="far fa-edit"></i><p>Modifier</p></div>')
}

