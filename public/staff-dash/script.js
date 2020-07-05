// Get Transactions
async function getTransaction() {
    const transactions = await fetch("./pat-test/transactions").then(response => response.json())
    const listProd = await fetch(`./pat-test/alltrans`).then(response => response.json())

    // .then(data => {console.log(data)})
    document.querySelector("#transactions").innerHTML = ``
    
    // for ( let idx = 0 ; idx < data.length ; idx++ ) { 
    for ( transaction of transactions ) { 
        document.querySelector("#transactions").innerHTML +=            
        `
        <button id="trns${transaction.id}" data-transaction="${transaction.id}" data-status="${transaction.status}" type="button" class="btn btn-primary" onclick="changeStatus(event)">
        <div class="row">
            <div data-transaction="${transaction.id}" data-status="${transaction.status}" class="col-12 text-center">
                <p style="font-weight:bolder;">${transaction.status}</p>
            </div>
            <div data-transaction="${transaction.id}" data-status="${transaction.status}" class="col text-left">
                <p>
                    Transaction #${transaction.id}
                </p>
            </div>
            <div data-transaction="${transaction.id}" data-status="${transaction.status}" class="col text-right">
                <p id="productList${transaction.id}">

                </p>
            </div>
            </div>
        </button>
        `

        const productList = listProd.filter(productList => productList.transaction_id == transaction.id)

        for (product of productList) {
            document.querySelector(`#productList${transaction.id}`).innerHTML += 
            `${product.quantity} x ${product.description}<br>`
        }

        // append color based on status
        const myStatus = document.querySelector(`#trns${transaction.id}`)

        switch (transaction.status) {
            case "Pending":
                myStatus.classList.add("btn-danger");
            break;
            case "Preparing":
                myStatus.classList.add("btn-warning");
            break;
            case "Delivering":
                myStatus.classList.add("btn-success");       
            break;
            case "Complete":
                myStatus.classList.add("complete");
            break;
        }
    }
}

// Update DB with status
async function updateStatus(id, status) {
    await fetch(`./pat-test/${id}/${status}`)
    await getTransaction()
}

// Function to check and change colour of button
async function changeStatus(event) {

    console.log(`changeStatusBegin:`,event)

    const button = event.currentTarget
    const status = button.dataset.status

    console.log(`changeStatus:`,button)

    const transactionNum = button.dataset.transaction
    
    console.log(`buttonid:`,transactionNum)
    if (status == "Pending") { 
        // button.classList.remove("pending");
        // button.classList.add("prep");
        button.classList.remove("btn-danger")
        button.classList.add("btn-warning");
        console.log("Pending => Updating to Preparing")

        await updateStatus(transactionNum, "Preparing")
    } else if (status == "Preparing") { 
        // button.classList.remove("prep");
        // button.classList.add("delivery");
        button.classList.remove("btn-warning")
        button.classList.add("btn-success");
        console.log("Preparing => Updating to delivering")

        await updateStatus(transactionNum, "Delivering")
    } else if (status == "Delivering") {
        // button.classList.remove("delivery");
        // button.classList.add("complete");
        button.classList.add("invisible");
        console.log("Delivering => Updating to complete")

        await updateStatus(transactionNum, "Complete")
    } 
}

// let button = document.querySelector("body");
//   button.addEventListener("click", event => {
//     console.log(event);
//     if (event.button == div) {
//       console.log(`inside: ${event}`);
//     }
// })

getTransaction()