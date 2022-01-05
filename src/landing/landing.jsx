import axios from "axios"
import { store } from "../index"

const useLandingPage = () => {

    const getPage = async () => {
        await axios.post("http://localhost:3002/api/tempus/find", {
            name: "Nils",
            sur_name: "Malmberg"
        })
            .then(res => {
                console.log(res.data)
                store.dispatch({
                    type: "USER_SEARCH_FIELDS",
                    payload: res.data
                })
            })
    }

    const selectUser = async (id) => {
        await axios.post("http://localhost:3002/api/tempus/selectUser", {
            id
        })
            .then(res => {
                console.log(res.data)
                store.dispatch({
                    type: "USER_DATA",
                    payload: res.data
                })
            })
    }


    return (
        <div className="landingPageMainDiv">
            <div className="landingPageTitleDiv">
                <span onClick={() => getPage()}>Enter your name to login</span>
                <span onClick={() => selectUser("AI3504")}>CLICK ME!</span>
                {/* <span onClick={()=> selectUser("AI6711")}>CLICK ME!</span> */}
            </div>
        </div>
    )

}

export default useLandingPage