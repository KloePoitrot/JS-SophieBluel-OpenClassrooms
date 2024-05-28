var dataToken = sessionStorage.getItem("token")

function getDeteleWork(){
    const delBtns = document.querySelectorAll("i.deleteWork")
    delBtns.forEach((delBtn) => {
        delBtn.addEventListener('click', (e) => {
            deteleWork(delBtn.getAttribute('data-id'))
        })
    })
}

function deteleWork(data){
    const delID = {
        "id": data,
    }
    fetch(`http://localhost:5678/api/works/${data}`, {
        method: "delete",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${dataToken}`
        },
        body: JSON.stringify(delID)
    }).then(async () => {
        document.getElementById('editWork').remove()
        modalEdit()
        getWork()
    }).catch((error) => {
        console.error(error);
    });
}