const initailState = {
    user: {
        data: {},
        searchField: {}
    },
}

const Reducer = (state = initailState, action) => {
    switch (action.type) {
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
    }
}

export default Reducer