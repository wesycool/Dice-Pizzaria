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
                    <i class="btn btn-secondary btn-sm fas fa-archive productAssign" data-toggle="modal" data-target="#productModal" id="${idx}"></i>   
                </td>
            </tr>`
        }

        document.querySelectorAll('.productEdit').forEach( (edit) => 
            edit.addEventListener('click', () => editProductModal(getData[event.target.id]))
        )
        document.querySelectorAll('.productAssign').forEach( (assign) => 
            assign.addEventListener('click', () => assignProductModal(getData[event.target.id]))
        )
    })
}