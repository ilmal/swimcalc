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
import useRelay from "./relay/relay"

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)) //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


const LandingPage = () => {
    
    const [update, setUpdate] = useState(false)
    const unsubscribe = store.subscribe(()=>setUpdate(!update))

    useEffect(()=>{
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
            setMainTitle(<span>SwimCalc.se</span>)
        }

        if (store.getState().loading) set_is_page_loading(true)
        if (!store.getState().loading) set_is_page_loading(false)
        unsubscribe()
    }, [update])

    const [pageSelector, setPageSelector] = useState("calc")
    const [is_page_loading, set_is_page_loading] = useState(false)
    const landingPage = useLandingPage()
    const calcComponent = useCalc()
    const kvaltiderComponent = useKvaltider()
    const relayComponent = useRelay()

    const [mainTitle, setMainTitle] = useState(<span>SwimCalc.se</span>)

    useEffect(() => { // for localStorage cookies
        console.log("1")
        if (localStorage.getItem("user") !== "null" || localStorage.getItem("user") !== undefined) {
            store.dispatch({
                type: "USER",
                payload: JSON.parse(localStorage.getItem("user"))
            })
        }
        if (localStorage.getItem("relay") !== "null" || localStorage.getItem("relay") !== undefined) {
            if (JSON.parse(localStorage.getItem("relay"))?.data === undefined || JSON.parse(localStorage.getItem("relay"))?.info === undefined) return
            store.dispatch({
                type: "RELAY",
                payload: JSON.parse(localStorage.getItem("relay"))
            })
        }

    }, [])

    const showPage = () => {
        switch (pageSelector) {
            case "landing":
                return landingPage
            case "calc":
                return calcComponent
            case "kval":
                return kvaltiderComponent
            case "relay":
                return relayComponent
            default:
                break;
        }
    }

    const loading_handler = (state)=>{

        const random_loader = ()=>{
            const loaders = [
                "dot-elastic",
                "dot-pulse",
                "dot-flashing",
                "dot-collision",
                "dot-revolution",
                "dot-carousel",
                "dot-typing",
                "dot-windmill",
                "dot-bricks",
                "dot-floating",
                "dot-fire",
                "dot-spin",
                "dot-falling",
                "dot-stretching"
            ]
            return loaders[Math.floor(Math.random() * loaders.length)];
        }

        function disableScroll() {
            // Get the current page scroll position
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
          
            // if any scroll is attempted, set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
        }
          
        function enableScroll() {
            window.onscroll = function() {};
        }

        if (state){
            //document.getElementById("root").classList.add("stop_scroll")

            disableScroll()

            return(
                <div className="loading_container" style={{top:`${window.pageYOffset}px`}}>
                    <div class={random_loader()}/>
                </div>
            )
        }
        //document.getElementById("root").classList.remove("stop_scroll")
        enableScroll()
        return null
    }

    return (
        <>
            {
                loading_handler(is_page_loading)
            }
            {
                console.log("Loading")
            }
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
                        {/* 
                        
                        RELAY FUNCTION IS UNSTAGED 

                        <div onClick={()=> setPageSelector("relay")}>
                            <span>RELAY</span>
                        </div> */}
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
        </>
    )
}




ReactDOM.render(
    <Provider store={store}>
        <LandingPage />
    </Provider>
    , document.querySelector("#root")
)