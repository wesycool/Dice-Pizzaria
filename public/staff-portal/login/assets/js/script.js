async function loginClick(event){
    const email = document.querySelector('#loginUsername').value
    const [{password}] = await fetch(`/staff-portal/api/table/staff/email/${email}`).then(res => res.json()).then(data => {return data})

    if (document.querySelector('#loginPassword').value == password) {
        sessionStorage.email = email
        window.location.href = "../"
    }else {
        alert("Password don't match. Please try again.")
    }
   
}