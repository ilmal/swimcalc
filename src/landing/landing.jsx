import axios from "axios"
import { useEffect, useState } from "react"
import { store } from "../index"
import _ from "lodash"

const useLandingPage = () => {

    const [isLoggedInPage, setIsLoggedInPage] = useState(false)
    const [cancelCheck, setCancelCheck] = useState(false)

    useEffect(() => {
        if (store.getState()?.user?.data !== undefined && !cancelCheck) {
            if (Object.keys(store.getState().user.data).length > 0){
                setIsLoggedInPage(true)
            } 
        }
    }, [store.getState()])

    const getPage = async (name, sur_name, organization) => {
        console.log("getPage")
        store.dispatch({
            type: "LOADING",
            payload: true
        })
        await axios.post("/tempus/find", {
            name,
            sur_name, 
            organization
        })
            .then(res => {
                store.dispatch({
                    type: "USER_SEARCH_FIELDS",
                    payload: res.data
                })
            })
        console.log("done")
        store.dispatch({
            type: "LOADING",
            payload: false
        })
    }

    const selectUser = async (index) => {
        setIsLoggedInPage(true)
        setCancelCheck(false)

        store.dispatch({
            type: "LOADING",
            payload: true
        })

        await store.dispatch({ //adding user gender
            type: "USER_INFO",
            payload: {
                gender: store.getState().user.searchField[index].gender,
                name: store.getState().user.searchField[index].name,
                sur_name: store.getState().user.searchField[index].sur_name,
                age: store.getState().user.searchField[index].age,
                status: store.getState().user.searchField[index].status
            }
        })

        await axios.post("/tempus/selectUser", {
            id: store.getState().user.searchField[index].id
        })
            .then(res => {
                store.dispatch({
                    type: "LOADING",
                    payload: false
                })
                console.log("CHANGING USER DATA")
                console.log(res.data)
                store.dispatch({
                    type: "USER_DATA",
                    payload: res.data
                })
            })

        // add to session storage
        localStorage.setItem("user", JSON.stringify(store.getState().user))
    }

    const inputHandler = (e) => {
        e.preventDefault()

        let name = e.target.name.value
        let sueName = e.target.surName.value
        let organization = e.target.organization.value

        // if (name === "" && sueName === "") {
        //     getPage("nils", "malmberg")
        //     return
        // }

        const handle_swe = (name)=>{
            name.toLowerCase()
            name = name.replaceAll("å", "%C3%A5")
            name = name.replaceAll("ä", "%C3%A4")
            name = name.replaceAll("ö", "%C3%B6")
            name = name.replaceAll(" ", "+")
            return name
        }

        name = handle_swe(name)
        sueName = handle_swe(sueName)
        organization = handle_swe(organization)

        console.log(name, sueName, organization)

        getPage(name, sueName, organization)
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

    const changeUserFunc = async () => {
        localStorage.setItem("user", null)
        setIsLoggedInPage(false)
        setCancelCheck(true)
        await store.dispatch({
            type: "CLR_USER",
            payload: []
        })
    }

    if (isLoggedInPage) {
        return (
            <div className="isLoggedInMainDiv">
                <span>Logged in as: {store.getState().user.info.name + " " + store.getState().user.info.sur_name}</span>
                <button onClick={changeUserFunc}>CHANGE USER</button>
            </div>
        )
    }
    return (
        <div className="landingPageMainDiv">
            <div className="titleDiv">
                {/* <span onClick={() => getPage()}>Enter your name to login</span>
                <span onClick={() => selectUser("AI3504")}>CLICK ME!</span> */}
                {/* <span onClick={()=> selectUser("AI6711")}>CLICK ME!</span> */}
                <span>LINK WITH TEMPUS OPEN</span>
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

export default useLandingPage