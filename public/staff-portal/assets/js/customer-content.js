


async function customerData(){
    const fetchTransaction = await fetch('/staff-portal/api/transaction').then(res => res.json()).then(data => {return data})
    const fetchOrder =  await  fetch('/staff-portal/api/order').then(res => res.json()).then(data => {return data})
    const customerTable = document.querySelector('#customer_table')

    customerTable.innerHTML = ''
    for (const [idx,statusTab] of ['receive order', 'preparing', 'complete'].entries()){
        let countGross = countTax = countNet = 0
        customerTable.innerHTML += 
        `<h3>${statusTab}</h3>
        <table class="table table-sm table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Client</th>
                    <th scope="col">Gross Total</th>
                    <th scope="col">Tax Amount</th>
                    <th scope="col">Net Total</th>
                </tr>
            </thead>
            <tbody id='customer_body${idx}'>
            </tbody>
            <tfoot>
                <tr style="font-weight: bold">
                    <td colspan='2'>Total</td>
                    <td id='gross_total${idx}'></td>
                    <td id='tax_amount${idx}'></td>
                    <td id='net_total${idx}'></td>
                </tr>
            </tfoot>
        </table>`

        for (const {id,status,client,gross_total,tax_amount,net_total} of fetchTransaction){
            if(status == statusTab){
                document.querySelector(`#customer_body${idx}`).innerHTML +=
                `<tr data-toggle="collapse" data-target="#collapse${id}">
                    <th scope ="row">${id}</th>
                    <td>${client}</td>
                    <td>${gross_total.toFixed(2)}</td>
                    <td>${tax_amount.toFixed(2)}</td>
                    <td>${net_total.toFixed(2)}</td>
                </tr>
                <tr id="collapse${id}" class="collapse">
                    <td colspan='5'><ul id="order${id}"></ul></td>
                </tr>`
    
                for(const {order,transaction_id,quantity} of fetchOrder){
                    if (transaction_id == id) {
                        document.querySelector(`#order${id}`).innerHTML +=
                        `<li>${order} x ${quantity}</li>`
    
                    }  
                }

                countGross += gross_total
                countTax += tax_amount
                countNet += net_total
            }
        }

        document.querySelector(`#gross_total${idx}`).innerHTML = countGross.toFixed(2)
        document.querySelector(`#tax_amount${idx}`).innerHTML = countTax.toFixed(2)
        document.querySelector(`#net_total${idx}`).innerHTML = countNet.toFixed(2)
    }

    // console.log(await fetchOrder())



    // fetchTransaction.json().then( getTransaction => {
    //     console.log(getTransaction)

    //     for(const [idx,data] of getTransaction.entries()){

            



    //     }

    //     // document.querySelectorAll('.productEdit').forEach( (edit) => 
    //     //     edit.addEventListener('click', () => editProductModal(getData[event.target.id]))
    //     // )
    //     // document.querySelectorAll('.productArchive').forEach( (archive) => 
    //     //     archive.addEventListener('click', () => archiveProductModal(getData[event.target.id]))
    //     // )
    // })
}

