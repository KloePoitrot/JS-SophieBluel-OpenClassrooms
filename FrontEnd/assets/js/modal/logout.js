var dataOne = sessionStorage.getItem("userId")
	var dataTwo = sessionStorage.getItem("token")

if(dataOne != null && dataTwo != null){
    document.querySelector(".logout").innerHTML = "Logout"
    document.querySelector(".logout").addEventListener('click', (e) => {
        e.preventDefault
        sessionStorage.removeItem("userId")
        sessionStorage.removeItem("token")
        location.reload()
    })
}