const initState = {
    authData: ((JSON.parse(localStorage.getItem('authData')) === null)? [] : JSON.parse(localStorage.getItem('authData'))),
    student: ((JSON.parse(localStorage.getItem('student')) === null)? [] : JSON.parse(localStorage.getItem('student')))

};

const authReducer = (state = initState, action) => {
    const newState = {...state};
    switch (action.type) {
        case "CHECK_LOGIN":
            let check = state.student.filter((data) => {
                if(data.email === action.loginData.email && data.password === action.loginData.password){
                    
                    return data;
                }
            });
            localStorage.setItem('authData', JSON.stringify(check))
            return {
                ...state,
                authData: check,
                student: state.student
            };
            break;
        case "END_LOGIN":
            localStorage.setItem('authData', null)
            return {
                ...state,
                authData: [],
                student: state.student
            };
            break;
        default:
          return newState;
          break;
        }
}

export default authReducer;