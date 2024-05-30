var dataToken = sessionStorage.getItem("token")

async function getAddWork(){
    await fetch("http://localhost:5678/api/categories")
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            
            // Get image file
            let img = document.querySelector('#file')
            let checkImg
            let imgFile
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
                    console.log('e')
                    // Check size
                    if (file >= 4096) {
                        console.log('c')
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
                            console.log('a')
                            imgFile = img.value.split('.')[1]
                            checkImg = true
                            
                            if(document.querySelector(".errorfile") !== null){
                                document.querySelector(".errorfile").remove()
                            }
                        } else {
                            checkImg = false
                            if(document.querySelector(".errorfile") === null){
                                console.log('b')
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
                console.log(img.files[0].name, img.files[0].type, title, category)
                addWork(img.files[0], title, category)
            }

        }
    }).catch((error) => {
        console.error(error);
    });

}

function addWork(image, title, category){
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    fetch(`http://localhost:5678/api/works`, {
        method: "post",
        headers: {
            "Authorization": `Bearer ${dataToken}`,
        },
        body: formData
    }).then(async () => {
        // reload DOM with API update
        document.getElementById('editWork').remove()
        modalEdit()
        getWork()
    }).catch((error) => {
        console.error(error);
    });
}