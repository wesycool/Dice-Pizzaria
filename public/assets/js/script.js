displayPage()

// Hide and Display pages onClick Functions
function displayPage(){
    const tab = ['welcome','selection','checkout','status']
    for( const btn of tab){
        document.querySelectorAll(`#${btn}Btn`).forEach(getBtn => {
            getBtn.addEventListener('click',(event) => {
                for (const pg of tab){
                    document.querySelector(`#${pg}Page`).setAttribute('style', `display:${(btn == pg)? 'inherit' : 'none'}`)
                }
            })
        })
    }
}

// Selection Button onClick Function - Display Product List
document.querySelectorAll('#selectionBtn').forEach( button => {
    button.addEventListener('click',async () => {
        const products = await fetch('/staff-portal/api/table/products').then(response => response.json()).then(data => {return data})
        document.querySelector("#productBody").innerHTML = ''
        
        // Loop of Each Product Display into Cards
        for (const {id, description, size, set_price} of products) {
            document.querySelector("#productBody").innerHTML += 
            `<div class="col-12 col-sm-6 col-md-4 mycol">
                <div data-id="${id}" class="card text-center" >
                    <img src="/assets/img/pizza.png" class="card-img-top" alt="${description}" />
                    <div class="card-body">
                        <h5 id="desc${id}" class="card-title">${description} - ${size}</h5>
                        <p id="price${id}" class="card-text">$${set_price}</p>
                        <div id="qtyBtn${id}"  class="container" style="max-width:165px;"></div>
                    </div>
                </div>
            </div>` 


            // Quantity Add-Remove Button
            document.querySelector(`#qtyBtn${id}`).innerHTML = 
            `<div class="input-group mb-3">
                <div class="input-group-prepend" id="button-addon3">
                    <button id='removeBtn-${id}' class="btn btn-danger" type="button">
                        <i class="fas fa-caret-left" id='removeBtn-${id}'></i>
                    </button>

                    <input id="qty${id}" type="text" class="form-control text-center" value="0">

                    <button id='addBtn-${id}' class="btn btn-success" type="button">
                        <i class="fas fa-caret-right" id='addBtn-${id}'></i>
                    </button>
                </div>
            </div>`


            // Quantity Add-Remove Button onClick Function
            document.querySelectorAll(`#button-addon3`).forEach( btn => {
                btn.addEventListener('click', (event) => {
                    const [field,id] = event.target.id.split('-')
                    const qtyField = document.querySelector(`#qty${id}`)

                    switch (field){
                        case'addBtn': 
                            qtyField.value = Number(qtyField.value) + 1;
                            break;
                        case'removeBtn': 
                            if (qtyField.value != 0) qtyField.value = Number(qtyField.value) - 1;
                            break;
                    }
                })
            })

        }

        // Checkout Button onClick Function
        document.querySelectorAll(`#checkoutBtn`).forEach(getBtn => {
            getBtn.addEventListener('click', () => {
                document.querySelectorAll('#cartItems').forEach( cartItems =>{
                    cartItems.innerHTML = ''
                    let countTotal = 0
    
                    // Display Cart List
                    for (const {id, description, size, set_price} of products) {
                        const qty = document.querySelector(`#qty${id}`).value
                        const sumPrice = qty * set_price
                        if(qty != 0) {
                            cartItems.innerHTML += 
                                `<tr>
                                    <td>${description}- ${size}</td>
                                    <td style='text-align:center' id='getQty${id}'>${qty}</td>
                                    <td style='text-align:right'>$${sumPrice.toFixed(2)}</td>
                                </tr>`
    
                            countTotal += sumPrice
                        }
                    }
    
                    // Display Subtotal, Tax and Total
                    document.querySelectorAll('#cartTotal').forEach( cartTotal =>{
                        cartTotal.innerHTML =
                        `<tr>
                            <td colspan='2' >Subtotal</td>
                            <td id='subtotalField'>$${countTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colspan='2'>Tax</td>
                            <td id='taxField' >$${(countTotal*.13).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colspan='2'>Total</td>
                            <td id='totalField'>$${(countTotal*1.13).toFixed(2)}</td>
                        </tr>`
                    })
                })
                

            })
        })


    })
})


// Status Button OnClick Function if Save Profile checked
document.querySelector('#statusBtn').addEventListener('click', async () => {
    const firstname = document.querySelector('#firstName').value || null
    const lastName = document.querySelector('#lastName').value || null
    const email = document.querySelector('#email').value || null
    const address = document.querySelector('#address').value || null
    const address2 = document.querySelector('#address2').value || null
    const country = document.querySelector('#country').value || null
    const province = document.querySelector('#province').value || null
    const city = document.querySelector('#city').value || null
    const postal = document.querySelector('#postal').value.replace(/\s/g,'') || null
    const phone = document.querySelector('#phone').value.replace(/[^0-9.-]+/g,'').replace(/-/g,'')|| null

    document.querySelector('#clientInfo').innerHTML =
        `<h3>${firstname} ${lastName}</h3>
        <p>${address}<br>
        ${address2? `${address2}<br>` : ''}
        ${city}, ${province}  ${postal}
        <br>${country}
        <br>${email}
        <br>(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 11)}</p>`
        

    // Post-Put Condition to Save Client Profile
    if (!document.querySelector('#hiddenClientId').value) {
        const clientInfo = await fetch(`/staff-portal/api/table/client/email/${email}`).then(res => res.json()).then(data => {return data} )
            const getID = (clientInfo.length != 0)? clientInfo[0].id : 0
            const status = 'Received Order'
            const subtotal = document.querySelector('#subtotalField').textContent.replace(/[^0-9.-]+/g,"")
            const tax = document.querySelector('#taxField').textContent.replace(/[^0-9.-]+/g,"")
            const total = document.querySelector('#totalField').textContent.replace(/[^0-9.-]+/g,"")


            if(clientInfo.length != 0){
                document.querySelector('#hiddenClientId').textContent = getID

                //Update Client Profile
                if (clientInfo[0].first_name != firstname) fetch(`/staff-portal/api/client/first_name/${firstname}/${getID}`,{method:'PUT'})
                if (clientInfo[0].last_name != lastName) fetch(`/staff-portal/api/client/last_name/${lastName}/${getID}`,{method:'PUT'})
                if (clientInfo[0].address != address) fetch(`/staff-portal/api/client/address/${address}/${getID}`,{method:'PUT'})
                if (clientInfo[0].address2 != address2) fetch(`/staff-portal/api/client/address2/${address2}/${getID}`,{method:'PUT'})
                if (clientInfo[0].country != country) fetch(`/staff-portal/api/client/country/${country}/${getID}`,{method:'PUT'})
                if (clientInfo[0].province != province) fetch(`/staff-portal/api/client/province/${province}/${getID}`,{method:'PUT'})
                if (clientInfo[0].city != city) fetch(`/staff-portal/api/client/city/${city}/${getID}`,{method:'PUT'})
                if (clientInfo[0].postal_code != postal) fetch(`/staff-portal/api/client/postal_code/${postal}/${getID}`,{method:'PUT'})
                if (clientInfo[0].phone != phone) fetch(`/staff-portal/api/client/phone/${phone}/${getID}`,{method:'PUT'})

            }else{
                //Create new Client Profile
                if (document.querySelector('#saveProfile').checked){
                    await fetch(`/staff-portal/api/client/${email}/password/${firstname}/${lastName}/${address}/${address2}/${country}/${province}/${city}/${postal}/${phone}`,{method:'POST'})
                }
            }
            //Save Transactions
            fetch(`/staff-portal/api/transaction/${getID}/${email}/${firstname}/${lastName}/${status}/1/1/${subtotal}/${tax}/${total}`,{method:'POST'})

            //Save Order
            const products = await fetch('/staff-portal/api/table/products').then(response => response.json()).then(data => {return data})
            for (const {id,set_price} of products) {
                const getQty = document.querySelector(`#getQty${id}`)
                if (getQty){
                    const addinfo = 'Additional Information'
                    fetch(`/staff-portal/api/order_info/${email}/0/${id}/${addinfo}/${getQty.textContent}/${set_price}`,{method:'POST'})
                    
                }
            }
            
    }

})


// Province Field onChange Function
document.querySelector('#province').addEventListener('change', async (event) =>{

    await fetch(`/staff-portal/api/table/tax/province/${event.target.value}`)
    .then(res => res.json()).then(data => {
        const subtotal = document.querySelector('#subtotalField').textContent.replace(/[^0-9.-]+/g,"")
        document.querySelectorAll('#taxField').forEach(taxField => {
            taxField.textContent = `$${(Number(subtotal) * data[0].tax_rate / 100).toFixed(2)}`
        })
        document.querySelectorAll('#totalField').forEach(totalField => {
            totalField.textContent = `$${(Number(subtotal) * (data[0].tax_rate / 100 + 1)).toFixed(2)}`
        })
    })
})


// Sign In Button onClick Function
document.querySelector('#signinBtn').addEventListener('click', async () =>{
    const email = document.querySelector('#getEmail').value
    const password = document.querySelector('#getPassword').value

    await fetch(`/staff-portal/api/table/client/email/${email}`)
    .then(res => res.json()).then(data => {
        if (data[0].password == password) {
            document.querySelector('#hiddenClientId').textContent = data[0].id 
            document.querySelector('#firstName').value = data[0].first_name 
            document.querySelector('#lastName').value = data[0].last_name 
            document.querySelector('#email').value = data[0].email 
            document.querySelector('#address').value = data[0].address 
            document.querySelector('#address2').value = data[0].address2 || ''
            document.querySelector('#country').value = data[0].country 
            document.querySelector('#province').value = data[0].province 
            document.querySelector('#city').value = data[0].city 
            document.querySelector('#postal').value = data[0].postal_code 
            document.querySelector('#phone').value = data[0].phone 
         
        }
    })
})

