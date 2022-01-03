import axios from "axios"

const useLandingPage = () => {

    const getPage = () => {
        axios.post("")
            .then(res => {
                console.log(res)
            })
    }


    return (
        <div className="landingPageMainDiv">
            <div className="landingPageTitleDiv">
                <span onClick={() => getPage()}>Enter your name to login</span>
            </div>
        </div>
    )

}

export default useLandingPage