async function sendData(email, password) {
    const logID = {
        "email": email,
        "password": password,
    }
    const logString = JSON.stringify(logID)

    fetch("http://localhost:5678/api/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: logString
    }).then(async (data) => {
        if (data.ok) {
            data = await data.json()
            sessionStorage.setItem("userId", data.userId)
            sessionStorage.setItem("token", data.token)
            window.location.href = "./index.html";
        }
    }).catch(
        document.querySelector("#login .error").className = "error"
    );
}

document.querySelector('#login input[name="sent"]').addEventListener("click", (e) =>{
    e.preventDefault()
    let email = document.querySelector('#login input[name="mail"]').value
    let password = document.querySelector('#login input[name="pw"]').value

    sendData(email, password)
})