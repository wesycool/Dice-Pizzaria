const sidebar = document.querySelector('#sidebar')
const username = sessionStorage.username
let getData = (localStorage[username])? JSON.parse(localStorage[username]) : {}
let {name, password, theme, units} = getData
let selectColor = theme || 'default'
let color

//Get List of Colors
async function getColor(){
    await fetch('/staff-portal/api/color')
    .then(res => res.json())
    .then(data => color = data)
}

startup()

//Loading Theme at Startup
async function startup(){
    if (!sessionStorage.username) window.location.href = './login/';
    else {
        await getColor()
        await getWeatherAPI()
        document.getElementById('username').value = username
        document.querySelector('#profileName').value = name
        document.getElementById(selectColor).checked = true

        getLocation(units)
        themeChange(selectColor, false)
    }
}

//Sidebar Page onClick
sidebar.addEventListener('click', async function(){
    sidebarItemColor(event.target.id)

    if (event.target.id != 'logout'){
        document.querySelectorAll(`.display-row`).forEach(value => {
            value.style.display = (value.id == `${event.target.id}-row`) ? 'inline' : 'none'
        })

        if (event.target.id == 'staff'){
            await staffData()
        }
    }
})

//Sidebar Color Change MouseOver 
sidebar.addEventListener('mouseover', () => sidebarItemColor(event.target.id))


//Sidebar Color Change Function
function sidebarItemColor(eventID){
    document.querySelectorAll('.list-group-item').forEach(value => {
        value.setAttribute('style',`background-color: ${ (value.id == eventID)? color[selectColor][1] :'transparent'} !important`)
    })
}

//Setting Theme Change onClick
document.querySelector('#theme').addEventListener('click',function(){
    selectColor = event.target.id
    getData.theme = selectColor
    localStorage[username] = JSON.stringify(getData)
    themeChange(selectColor, true)
})

//Setting Theme Change Function
function themeChange( id , isSetting){
    if (isSetting) sidebarItemColor('setting')
    document.querySelector('.navbar').setAttribute('style',`background-color: ${color[id][3]} !important`)
    document.querySelector('.sidebar').setAttribute('style',`background-color: ${color[id][0]} !important`)
    document.querySelector(`a${(isSetting)? '#setting':'#home'}`).setAttribute('style',`background-color: ${color[id][1]} !important`)
    window.document.title = `${name}`
    document.querySelector('#navbarTitle').innerHTML = `${window.document.title}`

    document.querySelectorAll('.btn-cancel').forEach(button =>{
        button.setAttribute('style',`background-color: ${color[id][(selectColor == 'sunset')? 0 : 1]} !important`)
    })

    document.querySelectorAll('.form-check-input').forEach(value => {
        value.checked = (value.id == selectColor);
    })

    metricChange(id)
    buttonColor(id)
    // calendarColor(selectColor, Number(moment().format('D')))
}

//Setting Weather Unit Change Function
function metricChange(selectColor){
    const inactiveColor = color[selectColor][(selectColor == 'sunset')? 0 : 1]
    const activeColor = color[selectColor][(selectColor == 'sunset')? 1 : 0]

    
    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.setAttribute('style', `background-color: ${inactiveColor} !important; border-color: ${inactiveColor} !important;`)
    })

    document.querySelector(`label#${units}`).setAttribute('class','btn btn-secondary active')
    document.querySelector('.active').setAttribute('style', `background-color: ${activeColor} !important; border-color: ${activeColor} !important;`)
}

//Setting Weather Unit Change onClick
function changeUnit(){
    getData.units = event.target.id
    localStorage[username] = JSON.stringify(getData)
    metricChange(selectColor)
    getLocation(units)
    setInterval(() => {getLocation(units)}, 1000*60*10);
    
}



//Button Color Change Function
function buttonColor(selectColor){
    document.querySelectorAll('.btn-color').forEach(button =>{
        button.setAttribute('style',`background-color: ${color[selectColor][(selectColor == 'sunset')? 1 : 0]} !important`)
        button.addEventListener('mouseover', function(){
            button.setAttribute('style',`background-color: ${color[selectColor][(selectColor == 'sunset')? 0 : 1]} !important`)
        })
        button.addEventListener('mouseout', function(){
            button.setAttribute('style',`background-color: ${color[selectColor][(selectColor == 'sunset')? 1 : 0]} !important`)
        })
    })
}


// Passwords
const confirmPassword = document.querySelector('#confirmPassword')
const setPassword = document.querySelector('#setPassword')

//Save Profile onClick
document.querySelector('#saveProfile').addEventListener('click',function(){
    const condition = confirmPassword.value == setPassword.value

    if (setPassword.value != ''){
        confirmPassword.setAttribute('class',`form-control ${(condition)? '':'is-invalid'}`)
        if (condition) {
            getData.password = setPassword.value
            confirmPassword.value = ''
            setPassword.value = ''       
        }
    }

    const profileName = document.querySelector('#profileName')

    if (profileName.value == '') profileName.value = name
    else getData.name = profileName.value
    
    localStorage[username] = JSON.stringify(getData)
    themeChange(selectColor, true)
})


//Show Password Checkbox
document.querySelector('#showPassword').addEventListener('change',function(){
    const showPassword = (this.checked)? 'text':'password'
    confirmPassword.setAttribute('type',showPassword)
    setPassword.setAttribute('type',showPassword)
})


//Log Out & Delete Account Button onClick
document.querySelector('#confirmLogout').addEventListener('click', () => exit(event.target.id))
document.querySelector('#deleteAccount').addEventListener('click', () => exit(event.target.id))

function exit(id){
    if(id == 'deleteAccount') localStorage.removeItem(username)
    sessionStorage.clear()
    location.reload()
}




