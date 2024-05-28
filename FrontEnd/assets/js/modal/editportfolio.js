function modalEdit(workEdit, categoriesEdit){
    document.querySelector('.editBtn').addEventListener('click', () => {
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
                <div id="editWorkGallery">` + workEdit + `</div>
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
                        <input type="text" id="categorie">
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
    })
}
