// Get transactions data
async function getTransaction() {
    const transactionsNull = await fetch("/staff-portal/api/table/transactions/client_id/0").then(response => response.json())
    const orderNull = await fetch("/staff-portal/api/table/order_info/transaction_id/0").then(response => response.json())

    if(transactionsNull.length != 0){
        for(const data of transactionsNull){
            const client = await fetch(`/staff-portal/api/table/client/email/${data.email}`).then(response => response.json())
            await fetch(`/staff-portal/api/transaction/client_id/${client[0].id}/${data.email}`,{method:'PUT'})
        }

    }else if(orderNull.length != 0){
        
        for(const data of orderNull){
            const client = await fetch(`/staff-portal/api/table/transactions/email/${data.email}`).then(response => response.json())
            const dateTime = `${client[0].createdAt.substring(0,10)} ${client[0].createdAt.substring(12,19)}`
            await fetch(`/staff-portal/api/order_info/transaction_id/${client[0].id}/${data.email}`,{method:'PUT'})
        }

    }else{
        const transactions = await fetch("/staff-portal/api/table/transactions").then(response => response.json())
        const listProd = await fetch(`/staff-portal/api/join/alltrans`).then(response => response.json())
    
        const transactionBody = document.querySelector("#transactions")
        transactionBody.innerHTML = ``
        
        for ( const {id,status} of transactions ) { 
            transactionBody.innerHTML +=            
            `
            <button id="trns${id}" data-transaction="${id}" data-status="${status}" type="button" class="btn btn-block" onclick="changeStatus(event)">
                <div class="row">
                    <div class="col-12 text-center">
                        <p style="font-weight:bolder;">${status}</p>
                    </div>
                    <div class="col text-left">
                        <p>
                            Transaction #${id}
                        </p>
                    </div>
                    <div class="col text-right">
                        <p id="productList${id}">
    
                        </p>
                    </div>
                </div>
            </button>
            `
            // filter to display only the products for this transaction
            const productList = listProd.filter(productList => productList.transaction_id == id)
    
            for (product of productList) {
                document.querySelector(`#productList${id}`).innerHTML += 
                `${product.quantity} x ${product.description}<br>`
            }
    
            // append color based on status
            const myStatus = document.querySelector(`#trns${id}`)
    
            switch (status) {
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
setInterval(function() { 
    getTransaction()
    // console.log(`refreshing...`)
 }, 5000)