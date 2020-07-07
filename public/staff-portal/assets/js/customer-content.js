async function customerData(){
    const fetchTransaction = await fetch('/staff-portal/api/table/transactions').then(res => res.json()).then(data => {return data})
    const fetchOrder =  await  fetch('/staff-portal/api/table/order_info').then(res => res.json()).then(data => {return data})
    const customerTable = document.querySelector('#customer_table')

    customerTable.innerHTML = ''

    // Loop Each Status
    for (const [idx,statusTab] of ['Received Order', 'Preparing', 'Delivering','Complete'].entries()){
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


        // Loop Each Transaction per Status
        for (const {id,status,client_id,gross_total,tax_amount,net_total} of fetchTransaction){
            if(status == statusTab){
                const [{first_name, last_name}] =  await fetch(`/staff-portal/api/table/client/id/${client_id}`).then(res => res.json()).then(data => {return data})
                
                document.querySelector(`#customer_body${idx}`).innerHTML +=
                `<tr data-toggle="collapse" data-target="#collapse${id}" id='transaction${id}' aria-expanded="false">
                    <th scope ="row">${id}</th>
                    <td>${first_name} ${last_name}</td>
                    <td>${gross_total.toFixed(2)}</td>
                    <td>${tax_amount.toFixed(2)}</td>
                    <td>${net_total.toFixed(2)}</td>
                </tr>
                <tr id="collapse${id}" class="collapse">
                    <td colspan='5'><ul id="order${id}"></ul></td>
                </tr>`
    


                // Get Order per Transaction only ariaExpanded is true
                if(document.querySelector(`#transaction${id}`).ariaExpanded){
                    //Loop Each Order per Transaction
                    for(const {product_id,transaction_id,quantity} of fetchOrder){
                        if (transaction_id == id) {
                            const [{description}] =  await fetch(`/staff-portal/api/table/products/id/${product_id}`).then(res => res.json()).then(data => {return data})
                            document.querySelector(`#order${id}`).innerHTML +=
                            `<li>${description} x ${quantity}</li>`
        
                        }  
                    }
                }          
                
                // Sum Totals for Each Status
                countGross += gross_total
                countTax += tax_amount
                countNet += net_total
            }
        }

        // Display Sum Totals
        document.querySelector(`#gross_total${idx}`).innerHTML = countGross.toFixed(2)
        document.querySelector(`#tax_amount${idx}`).innerHTML = countTax.toFixed(2)
        document.querySelector(`#net_total${idx}`).innerHTML = countNet.toFixed(2)
    }
}