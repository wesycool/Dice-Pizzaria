async function productData(){
    const fetchData = await fetch('/staff-portal/api/product')
    const productBody = document.querySelector('#product_body')
    productBody.innerHTML = ''

    fetchData.json().then( getData => {

        for(const [idx,data] of getData.entries()){
            productBody.innerHTML +=
            `<tr>
                <th scope="row">${data.id}</th>
                <td>${data.description}</td>
                <td>${data.price}</td>
                <td>
                    <i class="btn btn-secondary btn-sm fas fa-pen productEdit" data-toggle="modal" data-target="#productModal" id="${idx}"></i>
                    <i class="btn btn-secondary btn-sm fas fa-archive productArchive" data-toggle="modal" data-target="#productModal" id="${idx}"></i>   
                </td>
            </tr>`
        }

        document.querySelectorAll('.productEdit').forEach( (edit) => 
            edit.addEventListener('click', () => editProductModal(getData[event.target.id]))
        )
        document.querySelectorAll('.productArchive').forEach( (archive) => 
            archive.addEventListener('click', () => archiveProductModal(getData[event.target.id]))
        )
    })
}

// Add New Staff Button onClick
document.querySelector('#addProduct').addEventListener('click', () => editProductModal())


function editProductModal(data){
    const {id,description,price} = data || {id:'',description:'',price:''}

    document.querySelector('#productHeader').textContent = data ? `${id}. ${description}` : 'New Product'
    document.querySelector('#productBody').innerHTML =
    `<form>
        <div class="form-row">
            <label for="productDescription" class="col-form-label">Description:</label>
            <div class="form-group col">
                <input type="text" class="form-control" id="productDescription" value=${description}>
            </div>
        </div>
        <div class="form-row">
            <label for="productPrice" class="col-form-label">Price:</label>
            <div class="input-group col mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                </div>
                <input type="text" class="form-control" id="productPrice" value=${price}>
            </div>
        </div>
        <div class="form-group">
            <label for="productImage">Image:</label>
            <input type="file" accept="image/*" class="form-control-file" id="productImage" capture>
        </div>
    </form>`
}

function archiveProductModal(data){
    
}