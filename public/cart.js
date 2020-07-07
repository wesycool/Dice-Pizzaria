let form = {} 


function checkout(event){
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
    localStorage.completeForm = JSON.stringify(form)
}



    
    // document.querySelector('#different-address').checked
    
    // document.querySelector('#save-info').checked
    
    
    
    // document.querySelector('#credit').checked
    
    // document.querySelector('#debit').checked
    
    // document.querySelector('#paypal').checked
    
    
    
    // document.querySelector('#cc-name').value
    
    // document.querySelector('#cc-number').value
    
    // document.querySelector('#cc-expiration').value
    
    // document.querySelector('#cc-cvv').value




// document.getElementById("different-address").addEventListener("change", function(event){
//     console.log(event)
//     if (this.checked){
//         console.log('Checked')
//     }
//     else {
//         console.log('not checked')
//     }
// // document.getElementById("different-address").addEventListener("checked", function(){
//     // let differentAddress = document.querySelector('#different-address').checked
//     // console.log(differentAddress)

