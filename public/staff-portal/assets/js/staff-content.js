// Get Staff Data
async function staffData(){
    const dayOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const fetchData = await fetch('/staff-portal/api/table/staff')
    const fetchRole = await fetch('/staff-portal/api/table/role').then(res => res.json()).then(data => {return data})
    const staffBody = document.querySelector('#staff_body')
    staffBody.innerHTML = ''



    fetchData.json().then( async getData => {
        for(const [idx,data] of getData.entries()){
            
            let role
            for(const roleData of fetchRole){
                if (roleData.id == data.role_id) role= roleData.title
            }


            staffBody.innerHTML +=
            `<tr id='staffRow${idx}'>
                <th scope="row">${data.id}</th>
                <td><a class='staffEdit' data-toggle="modal" data-target="#staffModal" id="${idx}" href=''>${data.first_name} ${data.last_name} - ${role}</a></td>
            </tr>`


            const getTimesheet = await fetch(`/staff-portal/api/table/timesheet/staff_id/${data.id}`).then(res => res.json()).then(data => {return data})
            
            for (const day of dayOfWeek){
                document.querySelector(`#staffRow${idx}`).innerHTML += 
                `<td>
                    <div class='btn' id='staff-${data.id}-${day}' style='width:100%' onClick='timesheet(event)'>
                    &nbsp;
                    </div>
                </td>`

                for(const {workdays} of getTimesheet){
                    if (workdays == day) document.querySelector(`#staff-${data.id}-${day}`).setAttribute('style','width:100%; background-color:green')
                }
            }
        }

        document.querySelectorAll('.staffEdit').forEach( (edit) => 
            edit.addEventListener('click', () => editStaffModal(getData[event.target.id]))
        )
        document.querySelectorAll('.staffAssign').forEach( (assign) => 
            assign.addEventListener('click', () => assignStaffModal(getData[event.target.id]))
        )
    })
}

// Add New Staff Button onClick
document.querySelector('#addStaff').addEventListener('click', () => editStaffModal())


// Staff Information Modal
async function editStaffModal(data){
    const newStaff = {id:'',first_name:'', last_name:'', address:'', city:'', province:'ON', postal_code:'', role_id:''}
    const {id, first_name, last_name, address, city, province, postal_code, role_id} = data || newStaff


    document.querySelector('#staffHeader').textContent = data ? `${first_name} ${last_name}` : 'New Staff'
    document.querySelector('#staffBody').innerHTML =
    `<form class="form-row g-3">
    <div style='display:none' id='staffIdHidden'>${id}</div>
        <div class="form-group col-md-6">
            <label for="inputFirstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="inputFirstName" value='${first_name}'>
        </div>
        <div class="form-group col-md-6">
            <label for="inputLastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="inputLastName" value='${last_name}'>
        </div>
        <div class="form-group col-12">
            <label for="inputAddress" class="form-label">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" value='${address}'>
        </div>
        <div class="form-group col-md-6">
            <label for="inputCity" class="form-label">City</label>
            <input type="text" class="form-control" id="inputCity" value='${city}'>
        </div>
        <div class="form-group col-md-3">
            <label for="inputState" class="form-label">Province</label>
            <select id="inputState" class="form-control">
                <option ${(province == 'AB')? 'selected' : ''}>AB</option>
                <option ${(province == 'BC')? 'selected' : ''}>BC</option>
                <option ${(province == 'MB')? 'selected' : ''}>MB</option>
                <option ${(province == 'NB')? 'selected' : ''}>NB</option>
                <option ${(province == 'NL')? 'selected' : ''}>NL</option>
                <option ${(province == 'NS')? 'selected' : ''}>NS</option>
                <option ${(province == 'NT')? 'selected' : ''}>NT</option>
                <option ${(province == 'NU')? 'selected' : ''}>NU</option>
                <option ${(province == 'ON')? 'selected' : ''}>ON</option>
                <option ${(province == 'PE')? 'selected' : ''}>PE</option>
                <option ${(province == 'QC')? 'selected' : ''}>QC</option>
                <option ${(province == 'SK')? 'selected' : ''}>SK</option>
                <option ${(province == 'YT')? 'selected' : ''}>YT</option>
            </select>
        </div>
        <div class="form-group col-md-3">
            <label for="inputZip" class="form-label">Postal Code</label>
            <input type="text" class="form-control" id="inputZip" value='${postal_code}'>
        </div>
    </form>`
}


function assignStaffModal(data){
    const {id, first_name, last_name, role, department} = data || {first_name:'', last_name:''}
    document.querySelector('#staffHeader').textContent = data ? `${first_name} ${last_name} - ${role}` : 'New Staff'
    document.querySelector('#staffBody').innerHTML = ""
}



function timesheet(event){
    const splitId = event.target.id.split('-')

    if (event.target.getAttribute('style') == 'width:100%'){
        event.target.setAttribute('style','width:100%; background-color:green')
        fetch(`/staff-portal/api/timesheet/${splitId[1]}/${splitId[2]}`,{method:'POST'})
    } 
    else{
        event.target.setAttribute('style','width:100%')
        fetch(`/staff-portal/api/timesheet/${splitId[1]}/${splitId[2]}`,{method:'DELETE'})
    }
}