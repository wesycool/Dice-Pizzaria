// Get Staff Data
async function staffData(){
    const fetchData = await fetch('/staff-portal/api/staff')
    const staffBody = document.querySelector('#staff_body')
    staffBody.innerHTML = ''

    fetchData.json().then( getData => {

        for(const [idx,data] of getData.entries()){
            staffBody.innerHTML +=
            `<tr>
                <th scope="row">${data.id}</th>
                <td>${data.first_name} ${data.last_name}</td>
                <td>${data.role}</td>
                <td>
                    <i class="btn btn-secondary btn-sm fas fa-user-edit staffEdit" data-toggle="modal" data-target="#staffModal" id="${idx}"></i>
                    <i class="btn btn-secondary btn-sm fas fa-calendar-alt staffAssign" data-toggle="modal" data-target="#staffModal" id="${idx}"></i>   
                </td>
            </tr>`
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
function editStaffModal(data){
    const {id, first_name, last_name, role, department} = data || {first_name:'', last_name:''}
    document.querySelector('#staffHeader').textContent = data ? `${first_name} ${last_name} - ${role}` : 'New Staff'
    document.querySelector('#staffBody').innerHTML =
    `<form class="form-row g-3">
        <div class="form-group col-md-6">
            <label for="inputFirstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="inputFirstName" value=${first_name}>
        </div>
        <div class="form-group col-md-6">
            <label for="inputLastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="inputLastName" value=${last_name}>
        </div>
        <div class="form-group col-12">
            <label for="inputAddress" class="form-label">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
        </div>
        <div class="form-group col-md-6">
            <label for="inputCity" class="form-label">City</label>
            <input type="text" class="form-control" id="inputCity">
        </div>
        <div class="form-group col-md-3">
            <label for="inputState" class="form-label">Province</label>
            <select id="inputState" class="form-control">
                <option>AB</option>
                <option>BC</option>
                <option>MB</option>
                <option>NB</option>
                <option>NL</option>
                <option>NS</option>
                <option>NT</option>
                <option>NU</option>
                <option selected>ON</option>
                <option>PE</option>
                <option>QC</option>
                <option>SK</option>
                <option>YT</option>
            </select>
        </div>
        <div class="form-group col-md-3">
            <label for="inputZip" class="form-label">Postal Code</label>
            <input type="text" class="form-control" id="inputZip">
        </div>
    </form>`
}

function assignStaffModal(data){
    const {id, first_name, last_name, role, department} = data || {first_name:'', last_name:''}
    document.querySelector('#staffHeader').textContent = data ? `${first_name} ${last_name} - ${role}` : 'New Staff'
    document.querySelector('#staffBody').innerHTML = ""
}