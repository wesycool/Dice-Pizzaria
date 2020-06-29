async function getFinance(quote){
    const fetchData = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${quote}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            // "x-rapidapi-key": "136d7ef57fmsh15abb122659599ep14c433jsn459aa9664a7f"
            "x-rapidapi-key": "6fba543529msh3f6092c0334a9e6p181793jsn6328bee4e307" //second API
        }
    })

    //Get Quote
    fetchData.json().then(function(result){
        const priceChange = (result.price.regularMarketChange.raw < 0 )? 'red"> -' : 'green"> +'
        document.querySelector('#stockName').innerHTML = `${result.price.shortName} (${result.price.symbol})`
        document.querySelector('#stockPrice').innerHTML = `${result.price.regularMarketPrice.fmt} ${result.price.currency} <span style="color:${priceChange}${result.price.regularMarketChange.fmt} (${result.price.regularMarketChangePercent.fmt})</span>`


        document.querySelector('#stockTable').innerHTML =
            `<div class='row'>
                <div class='col-6'>Open</div>
                <div class='col-6'>${result.price.regularMarketOpen.fmt}</div>
            </div>
            <div class='row'>
                <div class='col-6'>High</div>
                <div class='col-6 '>${result.price.regularMarketDayHigh.fmt}</div>
            </div>
            <div class='row'>
                <div class='col-6'>Low</div>
                <div class='col-6'>${result.price.regularMarketDayLow.fmt}</div>
            </div>
            <div class='row'>
                <div class='col-6'>Prev close</div>
                <div class='col-6'>${result.price.regularMarketPreviousClose.fmt}</div>
            </div>
            <div class='row'>
                <div class='col-6'>Forward PE</div>
                <div class='col-6'>${(result.summaryDetail.forwardPE.fmt)? result.summaryDetail.forwardPE.fmt : '-'}</div>
            </div>
            <div class='row'>
                <div class='col-6'>Div yield</div>
                <div class='col-6'>${(result.summaryDetail.dividendYield.fmt)? result.summaryDetail.dividendYield.fmt : '-'}</div>
            </div>
            <div class='row'>
                <div class='col-6'>Mkt cap</div>
                <div class='col-6'>${(result.summaryDetail.marketCap.fmt)? result.summaryDetail.marketCap.fmt : '-'}</div>
            </div>
            <div class='row'>
                <div class='col-6'>52-wk high</div>
                <div class='col-6'>${result.summaryDetail.fiftyTwoWeekHigh.fmt}</div>
            </div>
            <div class='row'>
                <div class='col-6'>52-wk low</div>
                <div class='col-6'>${result.summaryDetail.fiftyTwoWeekLow.fmt}</div>
            </div>`

    })

}


async function getMarket(){
    document.querySelector('#marketTable').innerHTML = ''
    const fetchData = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            // "x-rapidapi-key": "136d7ef57fmsh15abb122659599ep14c433jsn459aa9664a7f"
             "x-rapidapi-key": "6fba543529msh3f6092c0334a9e6p181793jsn6328bee4e307" //second API
        }
    })
    
    fetchData.json().then(function(data){
        const result = data.marketSummaryResponse.result

        console.log(result)
        let allMarket =[]

        result.forEach(function(market){
            const jsonConvert = eval(`JSON.stringify({0:"${market.exchangeTimezoneName}", 1:"${market.exchangeTimezoneShortName}"})`)
            allMarket.push(jsonConvert)
        })

        allMarket = [...new Set(allMarket)]
        allMarket.forEach(function(market){
            const getRegion = JSON.parse(market)
            document.querySelector('#marketTable').innerHTML += 
                `<div class='row'>
                    <div class='col' id='${getRegion[1]}'>
                        <b>${getRegion[0]}</b>
                    </div>
                </div>`
        })

        result.forEach(function(exchange){
            const color = (exchange.regularMarketChangePercent.raw < 0)? 'red': 'green'
            document.querySelector(`#${exchange.exchangeTimezoneShortName}`).innerHTML += 
                `<div class='row'>
                    <div class='col-6'>${exchange.fullExchangeName}</div>
                    <div class='col-3'>${exchange.regularMarketPrice.fmt}</div>
                    <div class='col-3' style="color:${color} !important; text-align:right !important">${exchange.regularMarketChangePercent.fmt}</div>
                </div>`
        })
    })
}

//Search Quote Button onClick
document.querySelector('#stockBtn').addEventListener('click',function(){
    const quote = document.querySelector('#searchQuote').value
    getFinance(quote)
    document.querySelector('#searchQuote').value = ''
})
