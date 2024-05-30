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
                    <i class="fas fa-trash-alt deleteWork" data-id="` + data[i].id + `" type="button"></i>
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
                <option value="` + data[i].id + `">` + data[i].name + `</option>`
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
                <form>
                    <div class="bluesection">
                        <i class="fa-regular fa-image"></i> 
                        <label for="file" class="uploadBtn">+ Ajouter photo</label>
                        <input id="file" type="file">
                        <p>jpg, png: 4mo max</p>
                    </div>
                    <label for="addTitle">Titre</label>
                    <input type="text" id="addTitle">
                    <label for="addCategorie">Catégorie</label>
                    <select name="category" id="addCategory">
                        <option value="none">--Choisissez une catégorie--</option>
                        ` + catOption + `
                    </select>
                    <div class="divider"></div>
                    <input class="greyBtn" type="submit" id="sent" value="Valider">
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

    //add image preview
    document.querySelector('#file').addEventListener('change', () => {
        // Remove image if nothing is selected
        if(document.querySelector('#file').value === ''){
            document.querySelector(".bluesection i").className = 'fa-regular fa-image';
            document.querySelector(".bluesection p").className = '';
            document.querySelector("label[for='file']").className = 'uploadBtn';
            document.querySelector("label[for='file']").innerHTML  = '+ Ajouter photo';
        }
        // Show preview if something is selected
        if(document.querySelector('#file').value !== ''){
            document.querySelector(".bluesection i").className = 'hidden';
            document.querySelector(".bluesection p").className = 'hidden';
            document.querySelector("label[for='file']").className = 'imgUplodaded';
            document.querySelector("label[for='file']").innerHTML  = '<img src="' + window.URL.createObjectURL(document.querySelector('#file').files[0]) + '">';
        }
    })

    //fuction for adding or deleting works
    getDeteleWork()
    document.querySelector('.galleryAddContent form').addEventListener('submit', (e) => {
        e.preventDefault()
        getAddWork()
    })
}

if(dataToken !== null){
    document.querySelector('.editBtn').addEventListener('click', () => {
        // launch modal
        modalEdit()
    })
}
