import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";

const MainComponent = () => {


    React.useEffect(() => {
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

    const test = () => {
        console.log("hello")
    }

    const time = () => {
        const returnArray = []
        for (let i = 2; i < 18; i++) {
            console.log(i)
            returnArray.push(
                <div key={`key${i}`} style={{
                    gridColumn: "2 / 3",
                    gridRow: `${i} / ${i + 1}`
                }} className="colorDiv timeInputDiv">
                    <input onFocus={test} type="text" placeholder="min:sec.dec" />
                </div>
            )
        }
        return returnArray
    }

    return (
        <div className="mainBody">
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
