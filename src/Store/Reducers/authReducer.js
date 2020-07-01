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
                return false;
            });
            console.log("checkAyuth: ", state.student);
            localStorage.setItem('authData', JSON.stringify(check))
            return {
                ...state,
                authData: check,
                student: state.student
            }; 
        
        case "END_LOGIN":
            localStorage.setItem('authData', null)
            return {
                ...state,
                authData: [],
                student: state.student
            };
        default:
          return newState;
        }
}

export default authReducer;