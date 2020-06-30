export const AuthAction = (loginData) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'CHECK_LOGIN', loginData});
    }
};

export const AuthLogout = () => {
    return (dispatch, getState) =>{
        dispatch({ type: 'END_LOGIN'});
    }
};
