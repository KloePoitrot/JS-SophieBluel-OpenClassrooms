var dataToken = sessionStorage.getItem("token")

if(dataToken !== null){
    document.querySelector(".logout").innerHTML = "Logout"
    document.querySelector(".logout").addEventListener('click', (e) => {
        e.preventDefault
        sessionStorage.removeItem("token")
        location.reload()
    })
}