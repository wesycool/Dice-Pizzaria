


async function calendarData(){
    const staffId = document.querySelector('#staffId').value
    const fetchTimesheet = await fetch(`/staff-portal/api/table/timesheet/staff_id/${staffId}`).then(res => res.json()).then(data => {return data})

    const calendar = document.querySelector('#calendar_body')
    calendar.innerHTML = ''

    for( const [idx,{workdays}] of fetchTimesheet.entries()){
        calendar.innerHTML += 
        `<tr>
            <th scope="row">${idx+1}</th>
            <td>${moment(workdays,'ddd').format('dddd')}</td>
            <td>9:00 AM</td>
            <td>5:00 PM</td>
            <td>8</td>
            <td><div class='btn btn-secondary'>CHECK IN</div></td>
        </tr>`
    }

    document.querySelector('#totalHours').textContent = fetchTimesheet.length * 8

}