const initState = {
    user: {
        id: null,
        name: null,
        password: null
    }
}

export const userReducer = (state = initState, action) => {
    if (action.type === "add") {
        return {
            ...state,
            user: {
                id: action.id,
                name: action.name,
                password: action.password
            }
        }
    } else if (action.type === "delete") {
        return {
            ...state,
            user: {
                id: null,
                name: null,
                password: null
            }
        }
    } else {
        return {
            ...state
        }
    }
}