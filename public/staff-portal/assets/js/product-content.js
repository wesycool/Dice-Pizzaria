async function productData(){
    const fetchData = await fetch('/staff-portal/api/table/products')
    const productBody = document.querySelector('#product_body')
    productBody.innerHTML = ''

    fetchData.json().then( getData => {

        for(const [idx,data] of getData.entries()){
            if(!data.archive){
                productBody.innerHTML +=
                `<tr>
                    <th scope="row">${data.id}</th>
                    <td><span id='showProductDescription'>${data.description}</span> - <span id='showProductSize'>${data.size}</span></td>
                    <td id='showProductPrice'>${data.set_price}</td>
                    <td>
                        <i class="btn btn-secondary btn-sm fas fa-pen productEdit" data-toggle="modal" data-target="#productModal" id="${idx}"></i>
                        <i class="btn btn-secondary btn-sm fas fa-archive productArchive" data-toggle="modal" data-target="#productModal" id="${idx}"></i>   
                    </td>
                </tr>`
            }
        }

        document.querySelectorAll('.productEdit').forEach( (edit) => 
            edit.addEventListener('click', (event) => editProductModal(getData[event.target.id]))
        )
        document.querySelectorAll('.productArchive').forEach( (archive) => 
            archive.addEventListener('click', () => archiveProductModal(getData[event.target.id]))
        )
    })
}

// Add New Staff Button onClick
document.querySelector('#addProduct').addEventListener('click', () => editProductModal())


function editProductModal(data){
    const {id,description,size,set_price} = data || {id:'',description:'',set_price:''}

    document.querySelector('#productHeader').textContent = data ? `${id}. ${description}` : 'New Product'
    document.querySelector('button#productEdit').textContent = 'Save'
    document.querySelector('#productBody').innerHTML =
    `<form>
        <div style='display:none' id='productIdHidden'>${id}</div>
        <div class="form-row">
            <label for="productDescription" class="col-form-label">Description:</label>
            <div class="form-group col">
                <input type="text" class="form-control" id="productDescription" value='${description}'>
            </div>
        </div>

        <div class="form-row">
            <label for="productSize" class="col-form-label">Size: </label>
            <div class="form-group col">
                <select id="productSize" class="form-control col">
                    <option ${(size == 'Small')? 'selected' : ''}>Small</option>
                    <option ${(size == 'Medium')? 'selected' : ''}>Medium</option>
                    <option ${(size == 'Large')? 'selected' : ''}>Large</option>
                    <option ${(size == 'Special')? 'selected' : ''}>Special</option>
                </select>
            </div>
        </div>


        <div class="form-row">
            <label for="productPrice" class="col-form-label">Price:</label>
            <div class="input-group col mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                </div>
                <input type="text" class="form-control" id="productPrice" value='${set_price}'>
            </div>
        </div>

        <div class="form-group">
            <label for="productImage${id}" class="col-form-label">Image:</label>
            <input type="file" accept="image/*" class="form-control-file" id="productImage${id}" capture>
            <img src='' id="showProductImage${id}" style="width:100%">
        </div>
    </form>`


    const files = document.querySelector(`#productImage${id}`)

    // Show Image
    files.addEventListener('change', (input) => {
        let reader = new FileReader()
        reader.onload = (event) => {document.querySelector(`#showProductImage${id}`).setAttribute('src',event.target.result)}
        reader.readAsDataURL(input.target.files[0])
    })

    
    document.querySelector('button#productEdit').addEventListener('click', (event) => {
        const id = document.querySelector('#productIdHidden').textContent
        const description = document.querySelector('#productDescription').value
        const size = document.querySelector('#productSize').value
        const price = document.querySelector('#productPrice').value

        if (id == ''){
            fetch(`/staff-portal/api/products/${description}/${size}/${price}/0`,{method:'POST'})
        }else{
            if(document.querySelector('#showProductDescription').textContent != description){
                fetch(`/staff-portal/api/products/description/${description}/${id}`,{method:'PUT'})}
            if(document.querySelector('#showProductSize').textContent != size){
                fetch(`/staff-portal/api/products/size/${size}/${id}`,{method:'PUT'})}
            if(document.querySelector('#showProductPrice').textContent != price){
                fetch(`/staff-portal/api/products/set_price/${price}/${id}`,{method:'PUT'})}
        }
    })

    // Test Saving Image
    // document.querySelector(`#productImageButton${id}`).addEventListener('click', (event) =>{
    //     const formData = new FormData();
    //     formData.append('files', files.files[0],`img${id}.jpg`)
    //     console.log(formData)

    //     fetch('/test', { method: 'POST', body: formData}).then((response) => { console.log(response) })
    // })
}

function archiveProductModal(data){
    const {id,description,size} = data
    document.querySelector('#productHeader').textContent = `${id}. ${description}`
    document.querySelector('#productBody').innerHTML = `Are you sure to archive product: ${id}. ${description} - ${size}?`
    
    const archiveButton = document.querySelector('button#productEdit')
    archiveButton.textContent = 'Archive'
    archiveButton.addEventListener('click',() =>{
        fetch(`/staff-portal/api/products/archive/1/${id}`, {method:'PUT'})
    })
}