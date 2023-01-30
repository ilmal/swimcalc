import { store } from ".."
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import _ from "lodash"


const useKvaltider = () => {

    const [competitionList, setCompetitionList] = useState()
    const [selectedCompetition, setSelectedCompetition] = useState("")
    const [list, setlist] = useState(null)

    const [pool, setPool] = useState("25")

    useEffect(async () => {
        await axios.post("/competitions")
            .then((res) => {
                store.dispatch({
                    type: "COMPETITIONS",
                    payload: res.data
                })
            })


        let returnList = []
        Object.keys(store.getState().competitions).forEach(key => {
            const option = (
                <option value={key}>{key}</option>
            )
            returnList.push(option)
        });
        setCompetitionList(returnList)
    }, [])

    const checkAge = (age) => { // types: intager, span, lower, upper, open

        const get_type = (input_age)=>{

            if (input_age.includes("_lower")) return "upper"

            if (input_age.includes("_upper")) return "lower"

            if (input_age.includes("open")) return "open"

            if (input_age > 200) return "span"

            return "intager"

        }

        const type = get_type(age)

        console.log(type)

        let age_lower
        let age_upper

        console.log("TYPE: ", type)

        if (type == "span"){
            age_lower = parseInt(age.toString().slice(0,2))
            age_upper = parseInt(age.toString().slice(2,4))
        }else if (type == "intager"){
            age_lower = age
            age_upper = age
        }else if (type == "lower") {
            age_lower = parseInt(age.slice(0,2))
            age_upper = 1000
        }else if (type == "upper") {
            age_lower = 0
            age_upper = parseInt(age.slice(0,2))
        }else if (type == "open"){
            age_lower = 0
            age_upper = 1000
        }

        const date = new Date()
        const userAge = parseInt(date.getFullYear()) - parseInt(store.getState().user.info.age)

        console.log("USER_AGE: ", userAge, "LOWER: ", age_lower, "UPPER: ", age_upper)

        if (userAge <= age_upper && userAge >= age_lower) {
            return age
        }
        return false
    }

    const checkQ = (qtime, ytime) => {
        if (qtime > ytime) return true
        return false
    }

    useEffect(() => {
        //console.log("store.getState()?.user?.data: ", store.getState()?.user?.data)
        if (store.getState()?.competitions[selectedCompetition] !== undefined && store.getState()?.user?.data !== undefined && store.getState()?.user?.info?.gender !== undefined) {
            let returnArr = []
            let ageGroupFound = false
            let duplicateCheck = []
            let value = store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][pool]
            if (Object.keys(store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()]).length > 2) value = store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][Object.keys(store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()])[0]]
            console.log("VALUE: ", value, Object.keys(store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()])[0], store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][Object.keys(store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()])[0]])
            Object.keys(value).forEach(age => { // to age
                age = checkAge(age)
                if (!age) {
                    return
                }
                Object.keys(store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][pool][age]).forEach(style => { // to style
                    ageGroupFound = true
                    Object.keys(store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][pool][age][style]).forEach(distance => { // to distance
                        //console.log("Time: ", store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][pool][age][style][distance], "Style: ", style, "Distance: ", distance)
                        //console.log("USERDATA: ", store.getState().user.data?.[pool]?.[style]?.[distance]?.time)

                        let isDuplicate = false
                        duplicateCheck.forEach(element => {
                            if (element === distance + style) isDuplicate = true
                        })
                        duplicateCheck.push(distance + style)
                        if (isDuplicate) return

                        if (store.getState().user.data?.[pool]?.[style]?.[distance]?.time !== undefined) { // making sure the swimmer has a valid time 
                            let addClass = "not_qualified"
                            let Qmessage = "NOT QUALIFIED"
                            if (checkQ(store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][pool][age][style][distance], store.getState().user.data[pool][style][distance].time)) {
                                addClass = "qualified"
                                Qmessage = "QUALIFIED"
                            }

                            const div = (
                                <div key={_.uniqueId()} className={"listDiv " + addClass}>
                                    <div key={_.uniqueId()} className="distanceDiv">
                                        <span key={_.uniqueId()}>{distance}</span>
                                        <span key={_.uniqueId()}>{style.toUpperCase()}</span>
                                    </div>
                                    <div key={_.uniqueId()} className="Qmessage">
                                        <span key={_.uniqueId()} >{Qmessage}</span>
                                    </div>
                                    <div key={_.uniqueId()} className="QtimeDiv">
                                        <span key={_.uniqueId()}>Q-Time</span>
                                        <span key={_.uniqueId()}>{store.getState().competitions[selectedCompetition][store.getState().user.info.gender.toLowerCase()][pool][age][style][distance]}</span>
                                    </div>
                                    <div key={_.uniqueId()} className="YtimeDiv">
                                        <span key={_.uniqueId()}>Your-Time</span>
                                        <span key={_.uniqueId()}>{store.getState().user.data[pool][style][distance].time}</span>
                                    </div>
                                </div>
                            )
                            returnArr.push(div)
                        }
                    })
                })
            })
            if (!ageGroupFound) {
                console.log("NO AGE FOUND")
                return setlist(
                    <div className="toOldDiv">
                        <span>TO OLD</span>
                    </div>
                )
            }
            setlist(returnArr)
        } else {
            setlist(null)
        }
    }, [selectedCompetition])


    return (
        <div className="kvaltiderMainDiv">
            <div className="selectCompetition">
                <span>COMPETITION</span>
                <select name="competition" id="competition" selected={selectedCompetition} onChange={(e)=> setSelectedCompetition(e.target.value)}>
                    <option value=""/>
                    {competitionList}
                </select>
            </div>
            <div className="selectPool">
                <span>POOL</span>
                <select onChange={(e) => setPool(e.target.value)} name="pool" id="pool">
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div className="kvalList">
                {list}
            </div>
        </div>
    )
}

export default useKvaltider