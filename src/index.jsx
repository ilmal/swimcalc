import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";

const MainComponent = () => {

    const [sec, setSec] = useState(0)
    const [min, setMin] = useState(0)
    const [inputDistance, setInputDistance] = useState(null)
    const [baseTimeMin, setBaseTimeMin] = useState(0)
    const [baseTimeSec, setBaseTimeSec] = useState(0)

    React.useEffect(() => {
        console.log("sec: ", sec, "min: ", min, "inputDistance: ", inputDistance)
        switch (inputDistance) {
            case 0:
                //50
                setBaseTimeMin(min)
                setBaseTimeSec(sec)
                break;
            case 1:
                //100
                setBaseTimeMin(min / 2)
                setBaseTimeSec(sec / 2)
                break;
            case 2:
                //200
                setBaseTimeMin(min / 4)
                setBaseTimeSec(sec / 4)
                break;
            case 3:
                //300
                setBaseTimeMin(min / 6)
                setBaseTimeSec(sec / 6)
                break;
            case 4:
                //400
                setBaseTimeMin(min / 8)
                setBaseTimeSec(sec / 8)
                break;
            case 5:
                //500
                setBaseTimeMin(min / 10)
                setBaseTimeSec(sec / 10)
                break;
            case 6:
                //600
                setBaseTimeMin(min / 12)
                setBaseTimeSec(sec / 12)
                break;
            case 7:
                //700
                setBaseTimeMin(min / 14)
                setBaseTimeSec(sec / 14)
                break;
            case 8:
                //800
                setBaseTimeMin(min / 16)
                setBaseTimeSec(sec / 16)
                break;
            case 10:
                //900
                setBaseTimeMin(min / 18)
                setBaseTimeSec(sec / 18)
                break;
            case 11:
                //1000
                setBaseTimeMin(min / 20)
                setBaseTimeSec(sec / 20)
                break;
            case 12:
                //1100
                setBaseTimeMin(min / 22)
                setBaseTimeSec(sec / 22)
                break;
            case 13:
                //1200
                setBaseTimeMin(min / 24)
                setBaseTimeSec(sec / 24)
                break;
            case 14:
                //1300
                setBaseTimeMin(min / 26)
                setBaseTimeSec(sec / 26)
                break;
            case 15:
                //1400
                setBaseTimeMin(min / 28)
                setBaseTimeSec(sec / 28)
                break;
            case 16:
                //1500
                setBaseTimeMin(min / 30)
                setBaseTimeSec(sec / 30)
                break;
            default:
                break;
        }
        console.log("baseTimeMin: ", baseTimeMin, "baseTimeSec: ", baseTimeSec)
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
        console.log(e)
        if (e.target.name === "min") {
            console.log("minutes: ", e.target.value)
            setMin(e.target.value)
            setInputDistance(e.target.id)
        } else if (e.target.name === "sec") {
            console.log("seconds: ", e.target.value)
            setSec(e.target.value)
            setInputDistance(e.target.id)
        }
    }

    const time = () => {
        const returnArray = []
        for (let i = 0; i < 18; i++) {
            returnArray.push(
                <div key={`key${i}`} style={{
                    gridColumn: "2 / 3",
                    gridRow: `${i + 2} / ${i + 3}`
                }} className="colorDiv timeInputDiv">
                    <input onInput={calculator} id={i} name="min" type="number" placeholder="min" />
                    <span>/</span>
                    <input onInput={calculator} id={i} name="sec" type="number" placeholder="sec" />
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
