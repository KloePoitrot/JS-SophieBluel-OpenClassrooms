function displayEditWork(workEdit){
    document.querySelector('.editBtn').addEventListener('click', () => {
        let sectionEdit = document.createElement('div')
        sectionEdit.setAttribute("id", "editWork")

        sectionEdit.innerHTML = '<div><i class="fas fa-x closeModal"></i><article class="galleryEdit"><h2>Galerie Photo</h2><div>' + workEdit + '</article><div class="divider"></div><input type="submit" value="Ajouter une photo"></div></div>'

        document.body.appendChild(sectionEdit)
        document.querySelector('.closeModal').addEventListener('click', () => {
            document.body.removeChild(sectionEdit)
        })
    })
}