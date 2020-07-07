// Get transactions data
async function getTransaction() {
    const transactions = await fetch("/staff-portal/api/table/transactions").then(response => response.json())
    const listProd = await fetch(`/staff-portal/api/join/alltrans`).then(response => response.json())
    // .then(data => {console.log(data)})

    document.querySelector("#transactions").innerHTML = ``
    
    for ( transaction of transactions ) { 
        document.querySelector("#transactions").innerHTML +=            
        `
        <button id="trns${transaction.id}" data-transaction="${transaction.id}" data-status="${transaction.status}" type="button" class="btn btn-block" onclick="changeStatus(event)">
            <div class="row">
                <div class="col-12 text-center">
                    <p style="font-weight:bolder;">${transaction.status}</p>
                </div>
                <div class="col text-left">
                    <p>
                        Transaction #${transaction.id}
                    </p>
                </div>
                <div class="col text-right">
                    <p id="productList${transaction.id}">

                    </p>
                </div>
            </div>
        </button>
        `
        // filter to display only the products for this transaction
        const productList = listProd.filter(productList => productList.transaction_id == transaction.id)

        for (product of productList) {
            document.querySelector(`#productList${transaction.id}`).innerHTML += 
            `${product.quantity} x ${product.description}<br>`
        }

        // append color based on status
        const myStatus = document.querySelector(`#trns${transaction.id}`)

        switch (transaction.status) {
            case "Received Order":
                myStatus.classList.add("btn-danger")
            break;
            case "Preparing":
                myStatus.classList.add("btn-warning")
            break;
            case "Delivering":
                myStatus.classList.add("btn-success")    
            break;
            case "Complete":
                myStatus.classList.add("complete")
            break;
        }
    }
}

// Update DB with status
async function updateStatus(id, status) {
    await fetch(`/staff-portal/api/post/${id}/${status}`)
    await getTransaction()
}

// Function to check and change color of button
async function changeStatus(event) {
    // console.log(`changeStatusBegin:`,event)

    const button = event.currentTarget
    const status = button.dataset.status

    const transactionNum = button.dataset.transaction
    
    // console.log(`buttonid:`,transactionNum)

    if (status == "Received Order") { 
        
        button.classList.remove("btn-danger")
        button.classList.add("btn-warning")
        // console.log("Pending => Updating to Preparing")

        await updateStatus(transactionNum, "Preparing")
    } else if (status == "Preparing") { 
        
        button.classList.remove("btn-warning")
        button.classList.add("btn-success")
        // console.log("Preparing => Updating to delivering")

        await updateStatus(transactionNum, "Delivering")
    } else if (status == "Delivering") {
        
        button.classList.add("invisible")
        // console.log("Delivering => Updating to complete")

        await updateStatus(transactionNum, "Complete")
    } 
}

getTransaction()

// refreshing
// setInterval(function() { 
//     getTransaction()
//     // console.log(`refreshing...`)
//  }, 2500)