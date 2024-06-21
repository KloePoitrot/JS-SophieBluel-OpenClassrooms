function modalContent(workElements, catOption) {
    return `
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
            <input type="button" name="addWork" class="greenbtn" value="Ajouter une photo">
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
                    <label>Catégorie</label>
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
}