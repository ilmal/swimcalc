const initailState = {
    loading: false,
    user: {
        data: {},
        searchField: []
    },
    competitions: {},
    relay: {
        data: [],
        info: []
    }
}

const Reducer = (state = initailState, action) => {
    switch (action.type) {
        case "LOADING": {
            return {
                ...state,
                loading: action.payload
            }
        }
        case "USER": {
            return {
                ...state,
                user: action.payload
            }
        }
        case "USER_SEARCH_FIELDS":
            return {
                ...state,
                user: {
                    ...state.user,
                    searchField: action.payload
                }
            }
        case "USER_DATA":
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload
                }
            }
        case "USER_INFO":
            return {
                ...state,
                user: {
                    ...state.user,
                    info: action.payload
                }
            }
        case "COMPETITIONS":
            return {
                ...state,
                competitions: action.payload
            }
        case "CLR_USER":
            return {
                ...state,
                user: {}
            }
        case "RELAY": {
            return {
                ...state,
                relay: action.payload
            }
        }
        case "RELAY_USER_INFO":
            return {
                ...state,
                relay:{
                    ...state.relay,
                    info:[
                        ...state.relay.info,
                        action.payload
                    ]
                }
            }
        case "RELAY_USER_DATA":
            return {
                ...state,
                relay:{
                    ...state.relay,
                    data: [
                        ...state.relay.data,
                        action.payload
                    ]
                }
            }    
        case "RELAY_REMOVE_USER":
            return {
                ...state,
                relay: action.payload
            }       
        default:
            return {
                ...state
            }
    }
}

export default Reducer