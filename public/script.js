function startSelect(event) {
    event.preventDefault()

    document.querySelector('#welcomePage').classList.toggle('dropdown')
    document.querySelector('#selectionPage').classList.toggle('dropdown')
    document.querySelector('#gotocheckout').classList.toggle('dropdown')

    getProducts()
}

let cart = []
// get product list
async function getProducts() {
    const products = await fetch("./myapi/products").then(response => response.json())

    console.log(products)
    for (const {id, description, set_price} of products) {
        document.querySelector("#productBody").innerHTML += 
            `
            <div class="col-12 col-sm-6 col-md-4 mycol">
                <div data-id="${id}"class="card text-center" >
                    <img src="img/pizza.png" class="card-img-top" alt="${description}" />
                    <div class="card-body">
                        <h5 id="desc${id}" class="card-title">${description}</h5>
                        <p id="price${id}" class="card-text">
                            $${set_price}
                        </p>
                        <div class="container" style="max-width:165px;">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend" id="button-addon3">
                                    <button data-productId="${id}" onclick="decrease(event)" class="btn btn-danger" type="button"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                </svg></button>
                                </div>
                                <input id="qty${id}" data-productId="${id}" type="text" class="form-control text-center" value="0">
                                <div>
                                    <button data-productId="${id}" onclick="increase(event)" class="btn btn-success" type="button"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    }
}

function increase(event) {
    event.preventDefault();
    // console.log(event)

    const btn = event.currentTarget
    const productId = btn.dataset.productid
    const productBtn = document.querySelector(`#qty${productId}`).value
    const description = document.querySelector(`#desc${productId}`).innerText
    const price = document.querySelector(`#price${productId}`).innerText
    const priceNum = parseFloat(price.substring(1));

    let quantity = parseInt(productBtn) + 1 
    document.querySelector(`#qty${productId}`).value = quantity

    cart[productId] = {'id':productId, 'description':description, 'quantity':quantity, 'price':priceNum}

    // cart = {'id':productId, 'quantity':quantity}

    console.log(cart)
}

function decrease(event) {
    event.preventDefault()
    const btn = event.currentTarget
    const productId = btn.dataset.productid
    const productBtn = document.querySelector(`#qty${productId}`).value
    const description = document.querySelector(`#desc${productId}`).innerText
    const price = document.querySelector(`#price${productId}`).innerText
    const priceNum = parseFloat(price.substring(1));

    let quantity = productBtn > 0 ? parseInt(productBtn) - 1 : parseInt(productBtn)
    document.querySelector(`#qty${productId}`).value = quantity

    cart[productId] = {'id':productId, 'description':description, 'quantity':quantity, 'price':priceNum}

    // cart = {'id':productId, 'quantity':quantity}

    console.log(cart)
}

function selectionDone(event) {
    event.preventDefault()

    console.log(`cart before stringify`,cart)

    const result = cart.filter(cart => cart.quantity !== 0)

    sessionStorage.cart = JSON.stringify(result)

    console.log(`cart before stringify`, result)

    startCheckout(result)

}
// code ***END*** for selection page




function startCheckout(data){
    const cartItems = data
    // Move from one page to the other
    document.querySelector('#gotocheckout').classList.toggle('dropdown')
    document.querySelector('#selectionPage').classList.toggle('dropdown')
    document.querySelector('#checkoutPage').classList.toggle('dropdown')

    document.querySelector('#numCartItems').innerText = `${cartItems.length}`

    for (item of cartItems) {
        if (item.quantity > 0) {
            document.querySelector('#cartItems').innerHTML +=
            `
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">${item.description}</h6>
                </div>
                <span class="text-muted">${item.price}</span>
            </li>
            `
        }
    }

    document.querySelector('#cartItems').innerHTML +=
    `
    <li class="list-group-item d-flex justify-content-between">
        <span>Subtotal</span>
        <strong id="gross_total">$20</strong>
    </li>
    <li class="list-group-item d-flex justify-content-between">
        <span>Tax</span>
        <strong id="tax_amount">$20</strong>
    </li>
    <li class="list-group-item d-flex justify-content-between">
        <span>Total</span>
        <strong id="net_total">$20</strong>
    </li>
    `
}


// Register page grabbing client info
let form = {} 

function checkout(event) {
    event.preventDefault()
    const first_name = document.querySelector('#firstName').value
    const last_name = document.querySelector('#lastName').value
    const email = document.querySelector('#email').value
    const address = document.querySelector('#address').value
    const address_2 = document.querySelector('#address2').value
    const country = document.querySelector('#country').value
    const province = document.querySelector('#province').value
    const city = document.querySelector('#city').value
    const postal_code = document.querySelector('#postal').value
    const phone = document.querySelector('#postal').value
    form = {first_name, last_name, email, address, address_2, country, province, city, postal_code, phone}
    console.log(form)
    // localStorage.completeForm = JSON.stringify(form)

    document.querySelector('#checkoutPage').classList.toggle('dropdown')
    document.querySelector('#statusPage').classList.toggle('dropdown')

    confirmClient(form)
}
// code ***END*** for checkout page



// Add client info of current transaction
async function confirmClient(data){
    // PLaceholder for grabbing current status
    // fetch('/staff-portal/api/table/client/email/{the email}')
    // const transactions = await fetch("/staff-portal/api/table/transactions").then(response => response.json())
    // const transaction = transactions.filter(transaction => transaction.client_id = )
    // fetch('./posttest', {method:'post', body: JSON.stringify(data)})


    fetch('./posttest', { method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)});

    // document.querySelector('#clientInfo').innerHTML =
    //     `
    //     <p>Name: ${clientInfo.first_name} ${clientInfo.last_name} 
    //     <br>E-mail: ${clientInfo.email} 
    //     <br>Address: ${clientInfo.address} 
    //     ${clientInfo.address_2 ? `<br>Address 2: clientInfo.address_2` : ""} 
    //     <br>Country: ${clientInfo.country} 
    //     <br>Province: ${clientInfo.province}
    //     <br>City: ${clientInfo.city} 
    //     <br>Postal Code: ${clientInfo.postal_code} 
    //     <br>Phone Number: ${clientInfo.phone}
    //     <br>Transaction #${clientInfo.phone}</p>
    //     `

    // for (item of cartItems) {
    //     if (item.quantity > 0) {
    //         document.querySelector('#cartItemsStatus').innerHTML +=
    //         `
    //         <li class="list-group-item d-flex justify-content-between lh-condensed">
    //             <div>
    //                 <h6 class="my-0">${item.description}</h6>
    //             </div>
    //             <span class="text-muted">${item.price}</span>
    //         </li>
    //         `
    //     }
    // }
}

