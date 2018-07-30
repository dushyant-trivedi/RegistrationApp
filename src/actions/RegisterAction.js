

export function registerUser(users) {
    
    return (dispatch) => {
        dispatch({type: 'REGISTER_USER', users});
        

    }
}

