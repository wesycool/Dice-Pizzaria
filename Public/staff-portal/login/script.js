

function signupClick(){
    document.getElementById("formContent").style.display = "none" 
    document.getElementById("signUpContent").style.display = "inline"
    
   
    

}



function backtoLogin(event){
    
    var firstPassword = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    var inputName = document.getElementById("name");
    var inputUsername = document.getElementById("username");
    event.preventDefault()


 if (localStorage[inputUsername.value] == null ){  

  if (firstPassword.value != ""){  

    if (firstPassword.value === confirmPassword.value) {
        
        document.getElementById("signUpContent").style.display = "none" 
        document.getElementById("formContent").style.display = "inline" 

        var data = {


            "name": inputName.value,
            "password": firstPassword.value,
            "theme": "default",
            "units": "metric",
        
        
        
            }
            console.log(data)
            localStorage[inputUsername.value] = JSON.stringify (data)
            inputName.value = ""
            inputUsername.value = ""
            firstPassword.value = ""
            confirmPassword.value = ""
        
           alert("Account has been created.") 
  
      }else {
        alert("Password don't match. Please try again.")
      }
  }else{
      alert ("Password is empty. Please try again.")
  }
 
 }else{
     alert("Username Exists")
 }

}



function randomPassword(event) {
    event.preventDefault()

    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    var finalpassword = '';
    for ( var i = 0; i < 12; i++ ) {
        finalpassword += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    console.log(finalpassword)
    document.getElementById("password").value = finalpassword
   
}



function loginClick(event){
    event.preventDefault()

    var loginUsername = document.getElementById ("loginUsername");
    var loginPassword = document.getElementById ("loginPassword");

    var confirmloginPassword = JSON.parse(localStorage [loginUsername.value])

    if (confirmloginPassword.password == loginPassword.value ){
        sessionStorage.username = loginUsername.value
        window.location.href = "../"
    }else {alert("Username and Password do not match.")}




}
    

