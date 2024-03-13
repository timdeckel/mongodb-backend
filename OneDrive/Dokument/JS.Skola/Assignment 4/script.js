async function getData(resolve, reject) {
    const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json"

    fetch(API_URL).then((res) => {
        console.log(`server status: ${res.status}`)
        
        if (res.ok) {
            resolve(res.json());
        } else {
            reject(res.status)
        }
    }).catch((err) => {
        reject(err);
    })
}


function updateData() {
    new Promise(getData).then((data) => {
        $(`h1`).text(data.chartName)
        $(`h3`).text(data.disclaimer)        
        $(`.time`).text(data.time.updated)
        $(`.timeISO`).text(data.time.updatedISO)
        $(`.timeduk`).text(data.time.updateduk)
        $(`.USDrate`).text(data.bpi.USD.rate)
        $(`.USDdesc`).text(data.bpi.USD.description)
        $(`.USDfloat`).text(data.bpi.USD.rate_float)
        $(`.GBPrate`).text(data.bpi.GBP.rate)
        $(`.GBPdesc`).text(data.bpi.GBP.description)
        $(`.GBPfloat`).text(data.bpi.GBP.rate_float)
        $(`.EURrate`).text(data.bpi.EUR.rate)
        $(`.EURdesc`).text(data.bpi.EUR.description)
        $(`.EURfloat`).text(data.bpi.EUR.rate_float)
    }).catch((err) => {
        console.error(err)
    })
}

updateData()