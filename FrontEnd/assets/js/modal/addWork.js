var dataToken = sessionStorage.getItem("token")

async function getAddWork(){
    await fetch("http://localhost:5678/api/categories")
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            
            // Get image file
            let img = document.querySelector('#file')
            let checkImg
            // Checks if file type and size is ok
            if(img.files.length == 0){
                if(document.querySelector(".errorfile") === null){
                    document.querySelector(".bluesection").insertAdjacentHTML('afterend', '<p class="error errorfile">Veuillez ajouter une photo</p>')
                }
                if(document.querySelector(".errorfile") !== null){
                    document.querySelector(".errorfile").innerHTML = 'Veuillez ajouter une photo'
                }
            }
            if (img.files.length > 0 ) {
                for (let i = 0; i <= img.files.length - 1; i++) {
                    let fsize = img.files.item(i).size;
                    let file = Math.round((fsize / 1024));
                    // Check size
                    if (file >= 4096) {
                        checkImg = false
                        if(document.querySelector(".errorfile") === null){
                            document.querySelector(".bluesection").insertAdjacentHTML('afterend', '<p class="error errorfile">La photo est trop grande (4mo)</p>')
                        }
                        if(document.querySelector(".errorfile") !== null){
                            document.querySelector(".errorfile").innerHTML = 'La photo est trop grande'
                        }
                    }
                    if(file < 4096){
                        // check format
                        if(img.value.split('.')[1] == 'jpg' || img.value.split('.')[1] == 'png'){
                            checkImg = true
                            if(document.querySelector(".errorfile") !== null){
                                document.querySelector(".errorfile").remove()
                            }
                        } else {
                            checkImg = false
                            if(document.querySelector(".errorfile") === null){
                                document.querySelector(".bluesection").insertAdjacentHTML('afterend', '<p class="error errorfile">Le format de la photo est invalide (jpg ou png)</p>')
                            }
                        }
                    }
                }
            }
            // change modal with image preview

            // Get work title
            let title = document.querySelector('#addTitle').value
            let checkTitle
            // Checks if title has been entered
            if(title !== ''){
                checkTitle = true
                if(document.querySelector(".errortitle") !== null){
                    document.querySelector(".errortitle").remove()
                }
            } else {
                checkTitle = false
                if(document.querySelector(".errortitle") === null){
                    document.querySelector("#addTitle").insertAdjacentHTML('afterend', '<p class="error errortitle">Veuillez ajoutez un titre</p>')
                }
            }

            // Get category ID
            let category = parseInt(document.querySelector("#addCategory").options[document.querySelector("#addCategory").selectedIndex].value)
            let checkCategory
            // Checks if category exist
            if(data.filter(x => x.id === category).length !== 0){
                checkCategory = true
                if(document.querySelector(".errorcat") !== null){
                    document.querySelector(".errorcat").remove()
                }
            } else {
                checkCategory = false
                if(document.querySelector(".errorcat") === null){
                    document.querySelector("#addCategory").insertAdjacentHTML('afterend', '<p class="error errorcat">Veuillez selectionner une catégorie</p>')
                }
            }

            // Update API
            if(checkImg === true && checkTitle === true && checkCategory === true){
                console.log('yipee')
                // addWork(image, title, category)
            }

        }
    }).catch((error) => {
        console.error(error);
    });

}

function addWork(image, title, category){
    const addDetails = {
        "image": image,
        "title": title,
        "category": category,
    }
    fetch(`http://localhost:5678/api/works`, {
        method: "post",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${dataToken}`
        },
        body: JSON.stringify(addDetails)
    }).then(async () => {
        // reload DOM with API update
        document.getElementById('editWork').remove()
        modalEdit()
        getWork()
    }).catch((error) => {
        console.error(error);
    });
}