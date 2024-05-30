var dataToken = sessionStorage.getItem("token")

function getDeteleWork(){
    // Get delete button
    const delBtns = document.querySelectorAll("i.deleteWork")
    // check which button has been clicked and take the corresponding ID
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
            "Authorization": `Bearer ${dataToken}`
        },
        body: JSON.stringify(delID)
    }).then(async () => {
        // reload DOM with backend update
        document.getElementById('editWork').remove()
        modalEdit()
        getWork()
    }).catch((error) => {
        console.error(error);
    });
}