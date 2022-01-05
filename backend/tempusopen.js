const router = require("express").Router()
const axios = require("axios")
const jsdom = require("jsdom");

const htmlHandler = (source, res) => {

    let result = []

    const dom = new jsdom.JSDOM(res)
    const arr = Array.from(dom.window.document.getElementsByTagName("tr"))
    arr.forEach((element, index) => {
        if (index === 0) {
            return
        }
        if (element.textContent.indexOf("GrenTävlingDatumTid") > -1) {
            //console.log(index)
        }

        const object = {}
        const arr = Array.from(element.getElementsByTagName("td"))
        if (source === "find") {
            arr.forEach((element, index) => {
                let data = element.textContent
                if (element.textContent.indexOf("Swimmer") > -1) { // remove leftover "Swimmer"
                    data = element.textContent.split("Swimmer")[0]
                }
                if (element.textContent.indexOf("\n") > -1) { // remove leftover "\n"
                    data = element.textContent.split("\n")[0]
                }
                if (element.getElementsByTagName("a")[0]?.href !== undefined) { // extract id
                    console.log("HREF: ", element.getElementsByTagName("a")[0].href)
                    object["id"] = element.getElementsByTagName("a")[0].href.split("id=")[1]
                }
                switch (index) {
                    case 0:
                        object["name"] = data
                        break;
                    case 1:
                        object["sur_name"] = data
                        break;
                    case 2:
                        object["licens"] = data
                        break;
                    case 3:
                        object["age"] = data
                        break;
                    case 4:
                        object["organization"] = data
                        break;
                    case 5:
                        object["gender"] = data
                        break;
                    case 6:
                        object["status"] = data
                        break;
                }
            });
        }
        if (source === "selectUser") {
            arr.forEach((element, index) => {
                let data = element.textContent
                if (element.textContent.indexOf("Swimmer") > -1) {
                    data = element.textContent.split("Swimmer")[0]
                }
                switch (index) {
                    case 0:
                        object["distance"] = data
                        break;
                    case 1:
                        object["competition"] = data
                        break;
                    case 2:
                        object["date"] = data
                        break;
                    case 3:
                        object["time"] = data
                        break;
                }
                object["meter"] = object["distance"].split(" ")[0].split("m")[0].toString()

                if (object["distance"].indexOf("Fjärilsim") > -1) {
                    object["type"] = "fj"
                }
                if (object["distance"].indexOf("Ryggsim") > -1) {
                    object["type"] = "ry"
                }
                if (object["distance"].indexOf("Bröstsim") > -1) {
                    object["type"] = "br"
                }
                if (object["distance"].indexOf("Frisim") > -1) {
                    object["type"] = "fr"
                }
                if (object["distance"].indexOf("Medley") > -1) {
                    object["type"] = "im"
                }
            });
        }
        result.push(object)
    });

    if (source === "find") {
        return result
    }

    let [result25, result50] = []
    result.forEach((element, index) => {
        if (Object.keys(element).length === 0) {
            console.log(index)
            result50 = result.splice(index)
            result25 = result
            return
        }
    })

    // console.log("RESULT25: ", result25)
    // console.log("RESULT50: ", result50)

    let obj25 = {}
    result25.forEach(element => {
        obj25[element.type] = obj25[element.type] || {};
        obj25[element.type][element.meter] = element
    })

    let obj50 = {}
    result50.forEach(element => {
        if (Object.keys(element).length === 0) {
            return
        }
        obj50[element.type] = obj50[element.type] || {};
        obj50[element.type][element.meter] = element
    })

    let final = {
        "25:": obj25,
        "50": obj50
    }

    return final
}


router.post("/find", async (req, res) => {


    console.log(req.body.name)
    let url = `https://www.tempusopen.se/index.php?r=swimmer%2Findex&Swimmer%5Bfirst_name%5D=${req.body.name.toLowerCase()}&Swimmer%5Blast_name%5D=${req.body.sur_name.toLowerCase()}&Swimmer%5Bswimmer_club%5D=&Swimmer%5BsearchChoice%5D=&Swimmer%5Bclass%5D=99&Swimmer%5Bis_active%5D=99&ajax=swimmer-grid&pageSize=100`
    url = "https://www.tempusopen.se/index.php?r=swimmer%2Findex&Swimmer%5Bfirst_name%5D=nils&Swimmer%5Blast_name%5D=malmberg&Swimmer%5Bswimmer_club%5D=&Swimmer%5BsearchChoice%5D=&Swimmer%5Bclass%5D=99&Swimmer%5Bis_active%5D=99&ajax=swimmer-grid&pageSize=100"

    let config = {
        method: 'get',
        url
    };

    await axios(config)
        .then(function (response) {
            res.send(htmlHandler("find", response.data))
        })
        .catch(function (error) {
            console.log(error);
        });
})


router.post("/selectUser", async (req, res) => {
    let url = `https://www.tempusopen.se/index.php?r=swimmer/view&id=${req.body.id}`
    url = "https://www.tempusopen.se/index.php?r=swimmer/view&id=302750"

    let config = {
        method: 'get',
        url
    };

    await axios(config)
        .then(function (response) {
            res.send(htmlHandler("selectUser", response.data))
        })
        .catch(function (error) {
            console.log(error);
        });
})

module.exports = router