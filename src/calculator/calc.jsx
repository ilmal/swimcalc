import React, { useState } from "react";

const useCalc = () => {
    const [baseTimeMin, setBaseTimeMin] = useState(null)
    const [baseTimeSec, setBaseTimeSec] = useState(null)


    React.useEffect(() => {
        // console.log("baseMin: ", baseTimeMin)
        // console.log("baseSec: ", baseTimeSec)
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
                    gridRow: `${position + 1} / ${position + 2}`
                }} className="colorDiv">
                    <span>{element}</span>
                </div>
            )
        })
        return returnArray
    }

    const calculator = (e) => {
        // if (e.target.value.toString().indexOf(".") > -1) {
        //     console.log("not a number")
        //     setBaseTimeMin(null)
        //     setBaseTimeSec(null)
        //     return
        // }
        if (e.target.value.toString().charAt(0) === "0") {
            e.target.value = e.target.value.toString().replace("0", "")
        }
        if (baseTimeMin === null && baseTimeSec === null) {
            setBaseTimeMin(0)
            setBaseTimeSec(0)
        }
        if (e.target.name === "min") {
            // console.log("minutes: ", e.target.value)
        }
        if (e.target.name === "sec") {
            // console.log("seconds: ", e.target.value)
        }

        // console.log(e.target.id)

        let convert = e.target.id * 2 // value for converting time to 50 meter base
        if (convert === 0) { // if ID === 0, the division will be undefined, and so need to be manually changed
            convert = 1
        }

        if (e.target.name === "min") {
            setBaseTimeMin(e.target.value / convert) // deviding with convert to base time in 50s
        } else if (e.target.name === "sec") {
            setBaseTimeSec(e.target.value / convert) // deviding with convert to base time in 50s
        }
    }

    const time = () => {
        const returnArray = []
        for (let i = 0; i < 16; i++) {
            let min
            let sec
            let convert = i * 2 // se in function above why this is 
            if (convert === 0) {
                convert = 1
            }
            min = baseTimeMin * convert
            sec = baseTimeSec * convert

            const timeCalc = (duration) => {
                if (duration >= 60) { // if the duration is more than one minute
                    let min = ~~(duration / 60)
                    let sec = Number.parseFloat(duration % 60).toFixed(2)
                    //let sec = ~~(duration % 60)
                    console.log("SEC: ", sec)
                    console.log("MIN: ", min)
                    return [sec, min]
                }
                return [duration, 0]
            }
            let duration = (min * 60) + sec
            let [secCalc, minCalc] = timeCalc(duration)

            // console.log("CALC: ", secCalc, " ", minCalc)
            returnArray.push(
                <div key={`key${i}`} style={{
                    gridColumn: "2 / 3",
                    gridRow: `${i + 3} / ${i + 4}`
                }} className="colorDiv timeInputDiv">
                    <input value={baseTimeMin !== null ? minCalc : ""} onInput={calculator} id={i} name="min" type="number" placeholder="min" />
                    <span>:</span>
                    <input value={baseTimeSec !== null ? secCalc : ""} onInput={calculator} id={i} name="sec" type="number" placeholder="sec" />
                </div>
            )
        }
        return returnArray
    }

    const resetValues = () => {
        setBaseTimeMin(null)
        setBaseTimeSec(null)
    }

    return (
        <div className="tabellMain">
            <div className="container">
                <div className="resetButtonDiv">
                    <button onClick={resetValues}>RESET</button>
                </div>
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
    )
}

export default useCalc