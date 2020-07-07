const clientInfo = JSON.parse(localStorage.completeForm)
console.log(clientInfo)

function mainApp(){
        document.querySelector("#clientInfo").innerHTML = 
        `
        <H4> Name: ${clientInfo.first_name} ${clientInfo.last_name} 
        <br> 
        E-mail: ${clientInfo.email} 
        <br> 
        Address: ${clientInfo.address} 
        <br> 
        Address 2: ${clientInfo.address_2} 
        <br> 
        Country: ${clientInfo.country} 
        <br>
        Province: ${clientInfo.province}
        <br>
        City: ${clientInfo.city} 
        <br> 
        Postal Code: ${clientInfo.postal_code} 
        <br> 
        Phone Number: ${clientInfo.phone}</H4>
        `
    }

    mainApp()