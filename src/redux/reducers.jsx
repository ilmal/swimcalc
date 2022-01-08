const initailState = {
    user: {
        data: {},
        searchField: []
    },
    competitions: {}
}

const Reducer = (state = initailState, action) => {
    switch (action.type) {
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
        default:
            return {
                ...state
            }
    }
}

export default Reducer