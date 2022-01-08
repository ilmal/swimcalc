import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "./scss/main.scss";
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducer from "./redux/reducers"

import useCalc from "./calculator/calc"
import useKvaltider from "./kvaltider/kvaltider";
import useLandingPage from "./landing/landing";

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)) //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


const LandingPage = () => {

    const [pageSelector, setPageSelector] = useState("kval")
    const landingPage = useLandingPage()
    const calcComponent = useCalc()
    const kvaltiderComponent = useKvaltider()

    const [mainTitle, setMainTitle] = useState(<span>SwimCalc.u1.se</span>)

    useEffect(() => { // for localStorage cookies
        if (localStorage.getItem("user") !== "null" || localStorage.getItem("user") !== undefined) {
            store.dispatch({
                type: "USER",
                payload: JSON.parse(localStorage.getItem("user"))
            })
        }

    }, [])

    useEffect(() => {
        if (store.getState()?.user?.info !== undefined) {
            let status = store.getState().user.info.status
            if (status.indexOf(",") > -1) status = status.split(",")[0]

            let active = true
            if (status.indexOf("Ej")) active = false


            setMainTitle(
                <div>
                    <span>{store.getState().user.info.name + " " + store.getState().user.info.sur_name}</span>
                    <div>
                        <span>STATUS</span>
                        <span style={active ? { color: "#DC143C" } : { color: "#00FF00" }}>{status}</span>
                    </div>
                </div>
            )
        } else {
            setMainTitle(<span>SwimCalc.u1.se</span>)
        }

    }, [store.getState()])

    const showPage = () => {
        switch (pageSelector) {
            case "landing":
                return landingPage
            case "calc":
                return calcComponent
            case "kval":
                return kvaltiderComponent
            default:
                break;
        }
    }

    return (
        <div className="mainBody">
            <div className="headerMenuContainer">
                <div className="headerMenuInnerContainer">
                    <div onClick={() => setPageSelector("landing")}>
                        <span>LOGIN</span>
                    </div>
                    <div onClick={() => setPageSelector("calc")}>
                        <span>CALC</span>
                    </div>
                    <div onClick={() => setPageSelector("kval")}>
                        <span>KVALTIDER</span>
                    </div>
                </div>
            </div>
            <div className="titleContainer">
                {mainTitle}
            </div>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#fff" d="M0,96L80,101.3C160,107,320,117,480,149.3C640,181,800,235,960,229.3C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            {
                showPage()
            }
        </div >

    )
}




ReactDOM.render(
    <Provider store={store}>
        <LandingPage />
    </Provider>
    , document.querySelector("#root")
)