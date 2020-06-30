const getData = (localStorage[sessionStorage.username])? JSON.parse(localStorage[sessionStorage.username]): {}
const sidebar = document.querySelector('#sidebar')
const color = {
    default: ['#666666','#999999','#cccccc','#333333'],
    ponder: ['#0F4C81','#658DC6','#B5C7D3','#84898C'],
    sunset: ['#FC8F9B','#E55982','#E881A6','#9D446E'],
    calm:['#88B04B','#D4CACD','#C1CEC1','#EEA0A6']
}

let selectColor = (getData.theme)? getData.theme : 'default'

startup()

//Loading Theme at Startup
function startup(){
    if (!sessionStorage.username) window.location.href = './login/';
    else {
        document.getElementById('username').value = sessionStorage.username
        document.querySelector('#profileName').value = getData.name
        document.getElementById(selectColor).checked = true

        getLocation(getData.units)

        themeChange(selectColor, false)
    }
}

//Sidebar Page onClick
sidebar.addEventListener('click', function(){
    sidebarItemColor(event.target.id)

    if (event.target.id != 'logout'){
        document.querySelectorAll(`.display-row`).forEach(value => {
            value.style.display = (value.id == `${event.target.id}-row`) ? 'inline' : 'none'
        })
    }
})

//Sidebar Color Change MouseOver 
sidebar.addEventListener('mouseover', function(){
    sidebarItemColor(event.target.id)
})


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
    localStorage[sessionStorage.username] = JSON.stringify(getData)
    themeChange(selectColor, true)
})

//Setting Theme Change Function
function themeChange( id , isSetting){
    if (isSetting) sidebarItemColor('setting')
    document.querySelector('.navbar').setAttribute('style',`background-color: ${color[id][3]} !important`)
    document.querySelector('.sidebar').setAttribute('style',`background-color: ${color[id][0]} !important`)
    document.querySelector(`a${(isSetting)? '#setting':'#home'}`).setAttribute('style',`background-color: ${color[id][1]} !important`)
    window.document.title = `${getData.name} in a nutShell`
    document.querySelector('#navbarTitle').innerHTML = `<img src="https://user-images.githubusercontent.com/7273249/30583687-f75c2e34-9d27-11e7-91c6-a539e531f10f.png" width='50px'> ${window.document.title}`

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

    document.querySelector(`label#${getData.units}`).setAttribute('class','btn btn-secondary active')
    document.querySelector('.active').setAttribute('style', `background-color: ${activeColor} !important; border-color: ${activeColor} !important;`)
}

//Setting Weather Unit Change onClick
function changeUnit(){
    getData.units = event.target.id
    localStorage[sessionStorage.username] = JSON.stringify(getData)
    metricChange(selectColor)
    getLocation(getData.units)
    setInterval(() => {getLocation(getData.units)}, 1000*60*10);
    
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

//Save Profile onClick
document.querySelector('#saveProfile').addEventListener('click',function(){
    const confirmPassword = document.querySelector('#confirmPassword')
    const setPassword = document.querySelector('#setPassword')
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

    if (profileName.value == '') profileName.value = getData.name
    else getData.name = profileName.value
    
    localStorage[sessionStorage.username] = JSON.stringify(getData)
    themeChange(selectColor, true)
})


//Show Password Checkbox
document.querySelector('#showPassword').addEventListener('change',function(){
    const showPassword = (this.checked)? 'text':'password'
    document.querySelector('#setPassword').setAttribute('type',showPassword)
    document.querySelector('#confirmPassword').setAttribute('type',showPassword)
})


//Log Out onClick
document.querySelector('#confirmLogout').addEventListener('click',function(){
    sessionStorage.clear()
    location.reload()
})


//Calendar Day Color Change Function
// function calendarColor(selectColor, day){
//     document.querySelectorAll('th').forEach(value =>{
//         if (Number(value.textContent)){
//             value.setAttribute('style',`${ (value.textContent == day)? "color:white; background-color:"+color[selectColor][2] :''}`)
//             value.setAttribute('id',`${ (value.textContent == day)? 'current' :''}`)
//         }
//     })
//     // plannerData()
// }


//Calendar Day Color Change onClick
// document.querySelectorAll('th').forEach(value =>{
//     value.addEventListener('click',function(){
//         if (Number(value.textContent)) calendarColor(selectColor,value.textContent)
//     })
// })


//Calendar Button Color Change onClick
// document.querySelectorAll('.calendarBtn').forEach(button =>{
//     button.addEventListener('click', function(){
//         var current = Number(document.querySelector('#current').textContent)
//         switch (button.id){
//             case 'todayBtn': calendarColor(selectColor, Number(moment().format('d')));break;
//             case 'previousBtn': if(current != 1) calendarColor(selectColor, current-1);break;
//             case 'nextBtn':if(current != 30) calendarColor(selectColor, current+1);break;
//         }
//     })
// })


//Delete Account Button onClick
document.querySelector('#deleteAccount').addEventListener('click',function(){
    localStorage.removeItem(sessionStorage.username)
    sessionStorage.clear()
    location.reload()
})


//Planner Data Function
// function plannerData(){
//     document.querySelectorAll('#description').forEach(text =>{
//         const mthYr = document.querySelector('#monthAndYear').textContent
//         const day = document.querySelector('#current').textContent
//         const time = text.parentElement.textContent.trim()
//         const timestamp = moment(`${day} ${mthYr} ${time}`,'D MMMM YYYY hA').format('x')
//         text.value = (getData[timestamp])? getData[timestamp]: ''
//     })

//     document.querySelector('.container-planner').addEventListener('change',function(){
//         const mthYr = document.querySelector('#monthAndYear').textContent
//         const day = document.querySelector('#current').textContent
//         const time = event.target.parentElement.textContent.trim()
//         const timestamp = moment(`${day} ${mthYr} ${time}`,'D MMMM YYYY hA').format('x')
//         getData[timestamp] = event.target.value
//         localStorage[sessionStorage.username] = JSON.stringify(getData)
//     })
// }




