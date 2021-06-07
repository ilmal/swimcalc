import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";

const MainComponent = () => {
    const [baseTimeMin, setBaseTimeMin] = useState(null)
    const [baseTimeSec, setBaseTimeSec] = useState(null)

    React.useEffect(() => {
        console.log("baseMin: ", baseTimeMin)
        console.log("baseSec: ", baseTimeSec)
    })


    const distance = () => {
        const distanceArray = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1100", "1200", "1300", "1400", "1500"]
        const returnArray = []
        distanceArray.forEach((element) => {
            let position
            switch (element) {
                case "50":
                    position = 2
                    break;
                case "100":
                    position = 3
                    break;
                case "200":
                    position = 4
                    break;
                case "300":
                    position = 5
                    break;
                case "400":
                    position = 6
                    break;
                case "500":
                    position = 7
                    break;
                case "600":
                    position = 8
                    break;
                case "700":
                    position = 9
                    break;
                case "800":
                    position = 10
                    break;
                case "900":
                    position = 11
                    break;
                case "1000":
                    position = 12
                    break;
                case "1100":
                    position = 13
                    break;
                case "1200":
                    position = 14
                    break;
                case "1300":
                    position = 15
                    break;
                case "1400":
                    position = 16
                    break;
                case "1500":
                    position = 17
                    break;
                default:
                    position = 18
                    break;
            }
            returnArray.push(
                <div key={`key${element}`} style={{
                    gridColumn: "1 / 2",
                    gridRow: `${position} / ${position + 1}`
                }} className="colorDiv">
                    <span>{element}</span>
                </div>
            )
        })
        return returnArray
    }

    const calculator = (e) => {
        if (e.target.value.toString().indexOf(".") > -1) {
            console.log("not a number")
            setBaseTimeMin(null)
            setBaseTimeSec(null)
            return
        }
        if (e.target.value.toString().charAt(0) === "0") {
            e.target.value = e.target.value.toString().replace("0", "")
        }
        if (baseTimeMin === null && baseTimeSec === null) {
            setBaseTimeMin(0)
            setBaseTimeSec(0)
        }
        if (e.target.name === "min") {
            console.log("minutes: ", e.target.value)
        }
        if (e.target.name === "sec") {
            console.log("seconds: ", e.target.value)
        }

        console.log(e.target.id)
        switch (e.target.id) {
            case "0":
                //50
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value)
                }

                break;
            case "1":
                //100
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 2)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 2)
                }

                break;
            case "2":
                //200
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 4)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 4)
                }

                break;
            case "3":
                //300
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 6)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 6)
                }

                break;
            case "4":
                //400
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 8)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 8)
                }

                break;
            case "5":
                //500
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 10)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 10)
                }

                break;
            case "6":
                //600
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 12)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 12)
                }

                break;
            case "7":
                //700
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 14)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 14)
                }

                break;
            case "8":
                //800
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 16)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 16)
                }

                break;
            case "10":
                //900
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 18)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 18)
                }

                break;
            case "11":
                //1000
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 20)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 20)
                }

                break;
            case "12":
                //1100
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 22)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 22)
                }

                break;
            case "13":
                //1200
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 24)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 24)
                }

                break;
            case "14":
                //1300
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 26)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 26)
                }

                break;
            case "15":
                //1400
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 28)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 28)
                }

                break;
            case "16":
                //1500
                if (e.target.name === "min") {
                    setBaseTimeMin(e.target.value / 30)
                } else if (e.target.name === "sec") {
                    setBaseTimeSec(e.target.value / 30)
                }

                break;
            default:
                console.log("err with calculator function switch")
                break;
        }
    }

    const time = () => {
        const returnArray = []
        for (let i = 0; i < 16; i++) {
            let min
            let sec
            if (baseTimeMin !== null && baseTimeSec !== null) {
                switch (i) {
                    case 0:
                        //50
                        min = baseTimeMin
                        sec = baseTimeSec
                        break;
                    case 1:
                        //100
                        min = baseTimeMin * 2
                        sec = baseTimeSec * 2
                        break;
                    case 2:
                        //200
                        min = baseTimeMin * 4
                        sec = baseTimeSec * 4
                        break;
                    case 3:
                        //300
                        min = baseTimeMin * 6
                        sec = baseTimeSec * 6
                        break;
                    case 4:
                        //400
                        min = baseTimeMin * 8
                        sec = baseTimeSec * 8
                        break;
                    case 5:
                        //500
                        min = baseTimeMin * 10
                        sec = baseTimeSec * 10
                        break;
                    case 6:
                        //600
                        min = baseTimeMin * 12
                        sec = baseTimeSec * 12
                        break;
                    case 7:
                        //700
                        min = baseTimeMin * 14
                        sec = baseTimeSec * 14
                        break;
                    case 8:
                        //800
                        min = baseTimeMin * 16
                        sec = baseTimeSec * 16
                        break;
                    case 9:
                        //900
                        min = baseTimeMin * 18
                        sec = baseTimeSec * 18
                        break;
                    case 10:
                        //1000
                        min = baseTimeMin * 20
                        sec = baseTimeSec * 20
                        break;
                    case 11:
                        //1100
                        min = baseTimeMin * 22
                        sec = baseTimeSec * 22
                        break;
                    case 12:
                        //1200
                        min = baseTimeMin * 24
                        sec = baseTimeSec * 24
                        break;
                    case 13:
                        //1300
                        min = baseTimeMin * 26
                        sec = baseTimeSec * 26
                        break;
                    case 14:
                        //1400
                        min = baseTimeMin * 28
                        sec = baseTimeSec * 28
                        break;
                    case 15:
                        //1500
                        min = baseTimeMin * 30
                        sec = baseTimeSec * 30
                        break;
                    default:
                        console.log("error with switch statement in function time()")
                        break;
                }
                let done = false
                let loopCount = 0
                while (!done) {
                    console.log("baseTimeMin: ", baseTimeMin, "baseTimeSec: ", baseTimeSec)
                    if (sec >= 60) {
                        console.log("turn sec to min")
                        let addedMin = sec / 60
                        let rounded = Math.round((addedMin + Number.EPSILON) * 100) / 100;
                        let parts = rounded.toString().split('.');
                        console.log("turn sec to min MIN: ", parts[0])
                        min = min + parseInt(parts[0])
                        console.log("turn sec to min SEC: ", parts[1])
                        if (parts[1] === undefined) {
                            sec = 0
                        } else {
                            if (parts[1].toString().length === 2) {
                                sec = parts[1] * 0.6
                            } else {
                                sec = parts[1] * 6
                            }
                        }
                        console.log("sec: ", sec)
                    }
                    if (min.toString().indexOf(".") > -1) {
                        console.log("string with decimal")
                        let rounded = Math.round((min + Number.EPSILON) * 100) / 100;
                        let parts = rounded.toString().split(".")
                        console.log("string with decimal MIN: ", parts[0])
                        min = parts[0]
                        console.log("string with decimal SEC: ", parts[1])
                        if (parts[1].toString().length === 2) {
                            sec = parts[1] * 0.6 + sec
                        } else {
                            sec = parts[1] * 6 + sec
                        }
                    }
                    if (sec.toString().indexOf(".") > -1) {
                        let rounded = Math.round((sec + Number.EPSILON) * 100) / 100;
                        console.log("rounded: ", rounded)
                        sec = rounded
                    }
                    if (sec >= 60 && min.toString().indexOf(".") > -1 && sec.toString().indexOf(".") > -1) {
                        done = true
                    } else {
                        loopCount++
                        if (loopCount > 10) {
                            done = true
                            console.log("loop failed", loopCount)
                        }
                    }
                }
            }

            returnArray.push(
                <div key={`key${i}`} style={{
                    gridColumn: "2 / 3",
                    gridRow: `${i + 2} / ${i + 3}`
                }} className="colorDiv timeInputDiv">
                    <input value={baseTimeMin !== null ? min : ""} onInput={calculator} id={i} name="min" type="number" placeholder="min" />
                    <span>/</span>
                    <input value={baseTimeSec !== null ? sec : ""} onInput={calculator} id={i} name="sec" type="number" placeholder="sec" />
                </div>
            )
        }
        return returnArray
    }

    return (
        <div className="mainBody">
            <div className="titleContainer">
                <span>SwimCalc.u1.se</span>
            </div>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#fff" d="M0,96L80,101.3C160,107,320,117,480,149.3C640,181,800,235,960,229.3C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            <div className="tabellMain">
                <div className="container">
                    <div className="colorDiv distanceTitle">
                        <span>DISTANCE</span>
                    </div>
                    {distance()}
                    <div className="colorDiv TimeTitle">
                        <span>TIME</span>
                    </div>
                    {time()}
                </div>
            </div>
        </div>

    )
}

ReactDOM.render(
    <MainComponent />
    , document.querySelector("#root")
)
