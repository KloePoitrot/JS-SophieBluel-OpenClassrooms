async function modalEdit(){
    let workElements = ''
    let catOption = ''
    
    // fetch work
    await fetch("http://localhost:5678/api/works")
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            for(let i = 0; i < data.length ; i++){
                workElements += `
                <div>
                    <i class="fas fa-trash-alt deleteWork" data-id="` + data[i].id + `"></i>
                    <figure>
                        <img src="` + data[i].imageUrl + `" alt="` + data[i].title + `">
                    </figure>
                </div>`
            }
        }
    }).catch((error) => {
        console.error(error);
    });

    // fetch categories
    await fetch("http://localhost:5678/api/categories")
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            for(let i = 0; i < data.length ; i++){
                catOption += `
                <option value="` + data[i].name + `">` + data[i].name + `</option>`
            }
        }
    }).catch((error) => {
        console.error(error);
    });
    

    // Create modal with work list
    let sectionEdit = document.createElement('div')
    sectionEdit.setAttribute("id", "editWork")
    sectionEdit.innerHTML = `
    <div class="editModal">
        <div class="navModal">
            <i class="fas fa-x closeModal"></i>
            <i class="fa-solid fa-arrow-left returnModal hidden"></i>
        </div>
        <article class="galleryEditContent">
            <h2>Galerie Photo</h2>
            <div id="editWorkGallery">
                ` + workElements + `
            </div>
            <div class="divider"></div>
            <input type="submit" name="addWork" value="Ajouter une photo">
        </article>
        
        <article class="galleryAddContent hidden">
                <h2>Ajout photo</h2>
                <form method="post">
                    <div class="bluesection">
                    <i class="fa-regular fa-image"></i> 
                        <label for="file">+ Ajouter photo</label>
                        <input id="file" type="file">
                        jpg.png: 4mo max
                    </div>
                    <label for="titre">Titre</label>
                    <input type="text" id="titre">
                    <label for="categorie">Catégorie</label>
                    <select name="categorie" id="categorie">
                        <option value="none">--Choisissez une catégorie--</option>
                        ` + catOption + `
                    </select>
                    <div class="divider"></div>
                    <input class="greyBtn" type="submit" name="sent" value="Valider">
                </form>
            </article>
    </div>
    `
    document.body.appendChild(sectionEdit)
    // change to upload
    document.querySelector('input[name="addWork"]').addEventListener('click', () => {
        document.querySelector('.returnModal').className = 'fa-solid fa-arrow-left returnModal'
        document.querySelector('.galleryAddContent').className = 'galleryAddContent'
        document.querySelector('.galleryEditContent').className = 'galleryEditContent hidden'
    })
    // return to worklist
    document.querySelector('.returnModal').addEventListener('click', () => {
        document.querySelector('.returnModal').className = 'fa-solid fa-arrow-left returnModal hidden'
        document.querySelector('.galleryAddContent').className = 'galleryAddContent hidden'
        document.querySelector('.galleryEditContent').className = 'galleryEditContent'
    })
    // Close modal
    document.querySelector('.closeModal').addEventListener('click', () => {
        document.body.removeChild(sectionEdit)
    })
}

if(dataToken !== null){
    document.querySelector('.editBtn').addEventListener('click', () => {
        // launch modal
        modalEdit()
    })
}
