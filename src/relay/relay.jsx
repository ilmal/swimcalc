import { store } from ".."
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import _ from "lodash"
import moment from "moment"

const User_login = ({setPage, store})=>{

    const getPage = async (name, sur_name) => {
        store.getState().loading = true
        await axios.post("/tempus/find", {
            name,
            sur_name
        })
            .then(res => {
                store.dispatch({
                    type: "USER_SEARCH_FIELDS",
                    payload: res.data
                })
            })
    }

    const selectUser = async (index) => {

        await store.dispatch({ //adding user gender
            type: "RELAY_USER_INFO",
            payload: {
                gender: store.getState().user.searchField[index].gender,
                name: store.getState().user.searchField[index].name,
                sur_name: store.getState().user.searchField[index].sur_name,
                age: store.getState().user.searchField[index].age,
                status: store.getState().user.searchField[index].status
            }
        })

        axios.post("/tempus/selectUser", {
            id: store.getState().user.searchField[index].id
        })
            .then(res => {
                store.dispatch({
                    type: "RELAY_USER_DATA",
                    payload: res.data
                })
                // add session storage
                localStorage.setItem("relay", JSON.stringify(store.getState().relay))
            })
        

        setPage("main")
    }

    const inputHandler = (e) => {
        e.preventDefault()
        if (e.target.name.value === "") {
            getPage("nils", "malmberg")
            return
        }
        getPage(e.target.name.value, e.target.surName.value)
    }

    const displayList = () => {
        let retrunArr = []
        if (store.getState()?.user?.searchField === undefined) return
        store.getState().user.searchField.forEach((element, index) => {
            const e = (
                <div key={_.uniqueId()} className="listEDefault" onClick={() => selectUser(index)} style={{ gridRow: `${index + 1}/${index + 2}` }}>
                    <div key={_.uniqueId()} className="nameDiv">
                        <span key={_.uniqueId()}>{element.name + " " + element.sur_name}</span>
                    </div>
                    <div key={_.uniqueId()} className="ageDiv">
                        <span key={_.uniqueId()}>{element.age}</span>
                    </div>
                    <div key={_.uniqueId()} className="genderDiv">
                        <span key={_.uniqueId()}>{element.gender}</span>
                    </div>
                    <div key={_.uniqueId()} className="organization">
                        <span key={_.uniqueId()}>{element.organization}</span>
                    </div>
                </div>
            )
            retrunArr.push(e)
        });
        return retrunArr
    }


    return (
        <div className="landingPageMainDiv">
            <div className="titleDiv">
                {/* <span onClick={() => getPage()}>Enter your name to login</span>
                <span onClick={() => selectUser("AI3504")}>CLICK ME!</span> */}
                {/* <span onClick={()=> selectUser("AI6711")}>CLICK ME!</span> */}
                <span>Add user to relay pool</span>
                <div className="titleLine" />
            </div>
            <div className="inputMainDiv">
                <form className="inputContainer" onSubmit={inputHandler}>
                    <div className="inputDefault nameContainer">
                        <span>Name</span>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="inputDefault surNameContainer">
                        <span>Surname</span>
                        <input type="text" name="surName" id="surName" />
                    </div>
                    <div className="inputDefault OrganizationContainer">
                        <span>Organization</span>
                        <input type="text" name="organization" id="organization" />
                    </div>
                    <div className="inputButton">
                        <button type="submit">Go!</button>
                    </div>
                </form>
            </div>
            <div className="userListMainDiv">
                {store.getState() ?
                    displayList() :
                    null
                }
                <div className="extraSpace" />
            </div>
        </div>
    )
}

const useRelay = ()=>{

    // get course, distance

    // get info from swimmer

        // create page to login multiple swimmers
        // send loged in swimmers to a favorites list and save to cookies

    // calc every outcome from pool of swimmers
    
    // choose the amount of teams generated

    // generate and display teams

    // profit

    const [page, setPage] = useState("main")
    const [pool, setPool] = useState("25")
    const [distance, setDistance] = useState(25)
    const [stroke, setStroke] = useState("fr")
    const [calcTeamBtn, setCalcTeamBtn] = useState(false)
    const [team_list, setTeam_list] = useState(null)

    const remove_user_from_pool= (index)=>{
        
        let data = store.getState().relay?.data
        let info = store.getState().relay?.info

        data.splice(index, 1)
        info.splice(index, 1)

        store.dispatch({ //adding user gender
            type: "RELAY_REMOVE_USER",
            payload: {
                data: data,
                info: info
            }
        })
        // update session storage
        localStorage.setItem("relay", JSON.stringify(store.getState().relay))
    }

    const displayList = () => {
        let retrunArr = []
        if (store.getState()?.relay?.info === undefined) return
        store.getState().relay.info.forEach((element, index) => {
            const e = (
                <div key={_.uniqueId()} className="listEDefault">
                    <div className="info_pool">
                        <div key={_.uniqueId()} className="nameDiv">
                            <span key={_.uniqueId()}>{element.name + " " + element.sur_name}</span>
                        </div>
                        <div key={_.uniqueId()} className="ageDiv">
                            <span key={_.uniqueId()}>{element.age}</span>
                        </div>
                        <div key={_.uniqueId()} className="organization">
                            <span key={_.uniqueId()}>{element.organization}</span>
                        </div>
                    </div>
                    <button key={index} onClick={()=>{remove_user_from_pool(index)}}>Remove</button>
                </div>
            )
            retrunArr.push(e)
        });
        return retrunArr
    }

    const calc_teams = ()=>{
        setCalcTeamBtn(true)

        console.log("pool: ", pool)
        console.log("distance: ", distance)
        console.log("stroke: ", stroke)


        if (store.getState()?.relay?.info === undefined) return 

        if (store.getState()?.relay?.data?.length < 4){
            console.log("Not enough swimmers for a team")
            return
        }

        let time_arr = []
        let tot_time = moment.duration()

        store.getState().relay.data.forEach((elm, index) =>{
            if (elm[pool]?.[stroke]?.[distance]?.time === undefined){
                console.log("NOT ALL SWIMMERS HAVE SWAM THIS DISTANCE")
                tot_time = "NO TIME"
                time_arr.push([
                    index,
                    0,
                    "NO TIME",
                ])
                return
            }
            const info = store.getState().relay.info[index]
            console.log("Name: ", info.name)
            console.log("Time: ", elm[pool][stroke][distance].time)

            let time = elm[pool][stroke][distance].time

            if (moment.isDuration(tot_time)){
                tot_time.
                    add(parseInt(time.split(":").splice(0)), "m").
                    add(parseInt(time.split(":").splice(1)), "s").
                    add(parseInt(time.split(".").splice(1)), "ms")
            }

            time_arr.push([
                index,
                moment(time, "mm:ss.SS").valueOf(),
                time,
            ])
        })


        function sortFunction(a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] < b[1]) ? -1 : 1;
            }
        }

        time_arr.sort(sortFunction)

        let returnArr = []

        time_arr.forEach((elm)=>{
            let index = elm[0]
            let element = store.getState().relay.info[index]
            const e = (
                <div key={_.uniqueId()} className="listEDefault">
                    <div className="info_pool">
                        <div key={_.uniqueId()} className="nameDiv">
                            <span key={_.uniqueId()}>{element.name + " " + element.sur_name}</span>
                        </div>
                        <div key={_.uniqueId()} className="ageDiv">
                            <span key={_.uniqueId()}>{elm[2]}</span>
                        </div>
                    </div>
                    <div className="stroke_header">
                        <span>{stroke.toUpperCase()}</span>
                    </div>
                </div>
            )
            returnArr.push(e)

        })

        let time_str = tot_time
        if (moment.isDuration(tot_time)){
            time_str = `${tot_time.get("m")}:${tot_time.get("s")}.${tot_time.get("ms").toString().slice(0, -1)}`
            if (parseInt(tot_time.get("s")) < 10){
                time_str = `${tot_time.get("m")}:0${tot_time.get("s")}.${tot_time.get("ms").toString().slice(0, -1)}`
            }
        }


        console.log(time_str)

        returnArr.push(
            <>
            <div className="team_info">
                <div className="result_menu">
                    <span className="header">Total time</span>
                    <span className="time">{time_str}</span>
                </div>
                <div className="reset_teams">
                    <button onClick={()=>{setCalcTeamBtn(false)}}>Reset Teams</button>
                </div>
            </div>
            </>
        )

        setTeam_list(returnArr)

    }

    const main_page = ()=>{
        return (
            <div className="relayMainBody">
                <div className="info">
                    <div className="course select_default">
                        <span>COURSE:</span>
                        <select onChange={(e) => setPool(e.target.value)} name="course" id="course">
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="distance select_default">
                        <span>DISTANCE</span>
                        <select onChange={(e) => setDistance(e.target.value)} name="distance" id="distance">
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                    <div className="stroke select_default">
                        <span>STROKE</span>
                        <select onChange={(e) => setStroke(e.target.value)} name="stroke" id="stroke">
                            <option value="fr">FREE</option>
                            <option value="br">BREST</option>
                            <option value="ry">BACK</option>
                            <option value="fj">FLY</option>
                        </select>
                    </div>
                </div>
                <div className="swimmer_pool">
                    <div className="pool_info">
                        <span>Swimmer pool</span>
                        <button onClick={()=>{setPage("user_login")}}>Add +</button>
                    </div>
                    {
                        store.getState()?.relay?.info?.[0] ? 
                        <div className="swimmer_pool_list">
                            {store.getState() ?
                                displayList() :
                                null
                            }
                        </div>
                        :
                        null
                    }
                </div>
                {
                    store.getState()?.relay?.info?.[0] ? 
                    <div className="result_div">
                        <div className="menu">
                            {
                                calcTeamBtn ? 
                                <>
                                    <span>TEAMS</span>
                                    <div className="line_seperator"/>
                                </>
                                :
                                <button onClick={()=>{calc_teams()}}>Go!</button>
                            }
                        </div>
                        <div className="teams">
                            {
                                calcTeamBtn ? 
                                <div className="teams_list">
                                        {team_list}
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
    const show_page = ()=>{
        switch(page){
            case "main":
                return main_page()
            case "user_login":
                return <User_login setPage={setPage} store={store}/>
        }
    }


    return show_page()

} 

export default useRelay