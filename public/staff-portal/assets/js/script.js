const sidebar = document.querySelector('#sidebar')
const username = sessionStorage.email
let color,selectData


startup()

//Loading Theme at Startup
async function startup(){
    if (!sessionStorage.email) window.location.href = './login/';
    else {
        color = await fetch('./assets/json/staff-color.json').then(res => res.json()).then(data => {return data})
        getData = await fetch(`/staff-portal/api/table/staff/email/${username}`).then(res => res.json()).then(data => {return data})
        const [{id, email,password, first_name, last_name, address, city, province, postal_code, role_id, theme, units}] = getData
        selectData = {id, email,password, first_name, last_name, address, city, province, postal_code,role_id, theme, units}

        window.document.title = `Dice Pizzaria`
        document.querySelector('#navbarTitle').innerHTML = `<img src='./assets/img/logo.png' style='width:30px'> Dice Pizzaria`
        document.querySelector('a#welcome').textContent = `Welcome ${first_name} ${last_name}`
        document.querySelector('#email').value = email
        document.querySelector('#staffId').value = id
        document.querySelector('#inputFirstName').value = first_name
        document.querySelector('#inputLastName').value = last_name
        document.querySelector('#inputAddress').value = address
        document.querySelector('#inputCity').value = city
        document.querySelector('#inputZip').value = postal_code
        
        document.querySelectorAll('.setting-city').forEach((option)=>{
            if (option.id == province) option.setAttribute('selected','')
            else option.removeAttribute('selected')
        })
        

        document.querySelectorAll('.list-group-item').forEach((event)=>{
            if (role_id != 1){
                if (['staff','customer','product'].includes(event.id)){
                    document.querySelector(`div #${event.id}`).setAttribute('style','display:none')
                }
            }
        })

        getLocation(units)
        setInterval(() => {getLocation(units)},1000*60*5)
        themeChange(theme, units, false)
    }
}

//Sidebar Page onClick
sidebar.addEventListener('click', async function(){
    sidebarItemColor(event.target.id)

    if (event.target.id != 'logout'){
        document.querySelectorAll(`.display-row`).forEach(value => {
            value.style.display = (value.id == `${event.target.id}-row`) ? 'inline' : 'none'
        })
        
        switch (event.target.id){
            case 'calendar': await calendarData(); break;
            case 'staff': await staffData(); break;
            case 'customer': await customerData(); break;
            case 'product': await productData(); break;
        }
    }
})

//Sidebar Color Change MouseOver 
sidebar.addEventListener('mouseover', () => {if(event.target.id != 'welcome') sidebarItemColor(event.target.id)})


//Sidebar Color Change Function
function sidebarItemColor(eventID){
    document.querySelectorAll('.list-group-item').forEach(value => {
        value.setAttribute('style',`background-color: ${ (value.id == eventID)? color[selectData.theme][1] :'transparent'} !important`)
    })
}

//Setting Theme Change onClick
document.querySelector('#radioTheme').addEventListener('click', function(event){
    fetch(`/staff-portal/api/theme/${event.target.id}/${username}`,{method:'PUT'})
    themeChange(event.target.id,selectData.units, true)
})


//Setting Theme Change Function
function themeChange( theme , units, isSetting){
    if (isSetting) sidebarItemColor('setting')
    document.querySelector('.navbar').setAttribute('style',`background-color: ${color[theme][3]} !important`)
    document.querySelector('.sidebar').setAttribute('style',`background-color: ${color[theme][0]} !important`)
    document.querySelector(`a${(isSetting)? '#setting':'#home'}`).setAttribute('style',`background-color: ${color[theme][1]} !important`)


    document.querySelectorAll('.btn-cancel').forEach(button =>{
        button.setAttribute('style',`background-color: ${color[id][(theme == 'sunset')? 0 : 1]} !important`)
    })

    document.querySelectorAll('.form-check-input').forEach(value => {
        value.checked = (value.id == theme);
    })

    metricChange(theme,units)
    buttonColor(theme)
}

//Setting Weather Unit Change Function
function metricChange(theme, units){
    const inactiveColor = color[theme][(theme == 'sunset')? 0 : 1]
    const activeColor = color[theme][(theme == 'sunset')? 1 : 0]

    
    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.setAttribute('style', `background-color: ${inactiveColor} !important; border-color: ${inactiveColor} !important;`)
    })

    document.querySelector(`label#${units}`).setAttribute('class','btn btn-secondary active')
    document.querySelector('.active').setAttribute('style', `background-color: ${activeColor} !important; border-color: ${activeColor} !important;`)
}

//Setting Weather Unit Change onClick
function changeUnit(){
    metricChange(selectData.theme, event.target.id)
    getLocation(event.target.id)
    setInterval(() => {getLocation(event.target.id)}, 1000*60*10);

    fetch(`/staff-portal/api/units/${event.target.id}/${username}`,{method:'PUT'})   
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
document.querySelector('#saveProfile').addEventListener('click',async function(){
    const condition = confirmPassword.value == setPassword.value

    if (setPassword.value != ''){
        confirmPassword.setAttribute('class',`form-control ${(condition)? '':'is-invalid'}`)
        if (condition) {
            fetch(`/staff-portal/api/password/${setPassword.value}/${username}`,{method:'PUT'})
            confirmPassword.value = ''
            setPassword.value = ''       
        }
    }

    const data = {
        first_name: document.querySelector('#inputFirstName').value,
        last_name: document.querySelector('#inputLastName').value,
        address : document.querySelector('#inputAddress').value,
        city : document.querySelector('#inputCity').value,
        province : document.querySelector('#inputState').value,
        postal_code : document.querySelector('#inputZip').value
    }

    for(const getData in data){
        if (selectData[getData] != data[getData]) fetch(`/staff-portal/api/${getData}/${data[getData]}/${username}`,{method:'PUT'})
    }
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