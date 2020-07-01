const initState = {
    student: ((JSON.parse(localStorage.getItem('student')) === null)? [] : JSON.parse(localStorage.getItem('student'))),
    editStatus: ((JSON.parse(localStorage.getItem('editStatus')) === null)? [] : JSON.parse(localStorage.getItem('editStatus'))),
    authData: ((JSON.parse(localStorage.getItem('authData')) === null)? [] : JSON.parse(localStorage.getItem('authData'))),
};

const studentReducer = (state = initState, action) => {
    const newState = {...state};
    switch (action.type) {
        case "ADD_STUDENT":
          state.student.push(action.student)
          localStorage.setItem('student', JSON.stringify(state.student))
          return {
            ...state,
            student: state.student,
            editStatus: state.editStatus,
            suthData: state.authData
          };
        case "DELETE_STUDENT":
            let newAr = state.student.filter((data)=> {
                return data.email !== action.email
            })
            localStorage.setItem('student', JSON.stringify(newAr))
            return {
                ...state,
                student: newAr,
                editStatus: state.editStatus,
                suthData: state.authData
              };
        case "EDIT_STUDENT":
            let editArr = state.student.filter((data)=> {
                if(data.email === action.editStatus.email) {
                    return data;
                }
                return false;
            })
            localStorage.setItem('editStatus', JSON.stringify(editArr))
            return {
                ...state,
                student: state.student,
                editStatus: editArr,
                suthData: state.authData
              };
        case "UPDATE_STUDENT":
            let newObc = {
                firstName : action.updateData.firstName,
                lastName : action.updateData.lastName,
                email : action.updateData.email,
                phone : action.updateData.phone,
                address : action.updateData.address,
                dateOfBirth : action.updateData.dateOfBirth,
                degree : action.updateData.degree,
                skills : action.updateData.skills,
                experience : action.updateData.experience,
                password : action.updateData.password
            };
            state.student.map((data, index) => {
                if(data.email === newObc.email){
                    state.student[index] = newObc;
                    return true;
                }
                 return false;
            })
            
            console.log("new :", state.student);
            localStorage.setItem('student', JSON.stringify(state.student));
            localStorage.setItem('editStatus', null);
            return {
                ...state,
                student: JSON.parse(localStorage.getItem('student')),
                editStatus: state.editStatus,
                suthData: state.authData
              };
        default:
          return newState;
      }
}

export default studentReducer;