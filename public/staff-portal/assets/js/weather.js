// Christine - Use geolocation api to retrieve location using coordinates.
function getLocation(units) {
    navigator.geolocation.getCurrentPosition( async ({coords:{latitude,longitude}}) => {
        const weatherBtn = document.querySelector("#forecastBtn")
        const conversion = `&deg;${(units == "metric")? "C" : "F"}`

        //Fetch Current Weather Data
        await fetch(`./api/weather/${units}/${latitude}/${longitude}`)
        .then(res => res.json()).then( ({main:{temp},weather:[{icon}],name}) => {
            const weatherIcon = `<img src='http://openweathermap.org/img/wn/${icon}.png' id='weatherIcon'>`
            weatherBtn.innerHTML = `${temp.toFixed(1)}${conversion}${weatherIcon}`;
            document.querySelector("#modalHeader").innerHTML = `${name} 5-Day Local Forecast`;
        })

        //Forecast Weather Data Modal Button onClick Function
        weatherBtn.addEventListener('click', async () => {
            await fetch(`./api/onecall/${units}/${latitude}/${longitude}`)
            .then(res => res.json()).then(({daily}) => {
                const forecastField = document.querySelector("#forecast")
                forecastField.innerHTML = "";
                
                //Loop Daily Forecast
                for (i = 1; i <= 5; i++) {
                    const {weather:[{icon,description}],temp:{min,max},dt} = daily[i]

                    forecastField.innerHTML += 
                    `<div class="row" style="text-align: center; border: 1px solid lightgray; margin: 5px;">
                        <div class="col-4">
                            <img src='http://openweathermap.org/img/wn/${icon}@2x.png'> <br>
                            ${moment(dt,"X").format('L')} 
                        </div>
                        <div class="col" style="margin-top: 35px;">
                            <div class='row'>
                                <div class='col-5 offset-1'>High: ${max.toFixed(1)}${conversion}</div>
                                <div class='col-5'>Low: ${min.toFixed(1)}${conversion}</div>
                            </div>
                            <div class='row'>
                                <div class='col'>Description: ${description}</div>
                            </div>
                        </div>
                    </div>`
                }
            })
        })
    })
}


//Christine - Add current time to NavBar that automatically updates every second.
setInterval(() => {
    document.querySelector("#timeStamp").innerHTML = moment().format('dddd, MMMM D YYYY, LTS')
    document.querySelector("#timeStamp-mobile").innerHTML = moment().format('L LTS')
}, 1000);
