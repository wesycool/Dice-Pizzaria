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
    })
}

// Add New Staff Button onClick
document.querySelector('#addStaff').addEventListener('click', () => editStaffModal())


// Staff Information Modal
async function editStaffModal(data){
    const newStaff = {id:'',first_name:'', last_name:'', address:'', city:'', province:'ON', postal_code:'', role_id:''}
    const {id,email, first_name, last_name, address, city, province, postal_code} = data || newStaff


    document.querySelector('#staffHeader').textContent = data ? `${first_name} ${last_name}` : 'New Staff'
    document.querySelector('#staffBody').innerHTML =
    `<form class="form-row g-3">
    <div style='display:none' id='staffIdHidden'>${id}</div>
        <div class="form-group col-md-6">
            <label for="input-first_name" class="form-label">First Name</label>
            <input type="text" class="form-control staff" id="input-first_name" value='${first_name}'>
        </div>
        <div class="form-group col-md-6">
            <label for="input-last_name" class="form-label">Last Name</label>
            <input type="text" class="form-control staff" id="input-last_name" value='${last_name}'>
        </div>
        <div class="form-group col-12">
            <label for="input-address" class="form-label">Address</label>
            <input type="text" class="form-control staff" id="input-address" placeholder="1234 Main St" value='${address}'>
        </div>
        <div class="form-group col-md-6">
            <label for="input-city" class="form-label">City</label>
            <input type="text" class="form-control staff" id="input-city" value='${city}'>
        </div>
        <div class="form-group col-md-3">
            <label for="input-province" class="form-label">Province</label>
            <select id="input-province" class="form-control staff">
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
            <label for="input-postal_code" class="form-label">Postal Code</label>
            <input type="text" class="form-control staff" id="input-postal_code" value='${postal_code}'>
        </div>
    </form>`


    // Save Change on Staff Profile
    document.querySelector('#staffEdit').addEventListener('click', () => {
        if(!document.querySelector('#staffIdHidden').value) {
            const firstname = document.querySelector('#input-first_name').value
            const lastname = document.querySelector('#input-last_name').value
            const address = document.querySelector('#input-address').value
            const city = document.querySelector('#input-city').value
            const province = document.querySelector('#input-province').value
            const postalcode = document.querySelector('#input-postal_code').value.replace(/\s/g,'')

            fetch(`/staff-portal/api/setting/${firstname}@asdsa.com/password/${firstname}/${lastname}/${address}/${city}/${province}/${postalcode}/1231231234/3/1/default/metric`,{method:'POST'})
        }else{
            document.querySelectorAll('.staff').forEach( event => {
                const splitId = event.id.split('-')
                if (data[splitId[1]] != event.value) {
                    fetch(`/staff-portal/api/setting/${splitId[1]}/${event.value}/${email}`,{method:'PUT'})}
            })
        }
    })

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