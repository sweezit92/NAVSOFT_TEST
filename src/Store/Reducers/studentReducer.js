const initState = {
    student: ((JSON.parse(localStorage.getItem('student')) === null)? [] : JSON.parse(localStorage.getItem('student'))),
    editStatus: ((JSON.parse(localStorage.getItem('editStatus')) === null)? [] : JSON.parse(localStorage.getItem('editStatus'))),
};

const studentReducer = (state = initState, action) => {
    const newState = {...state};
    switch (action.type) {
        case "ADD_STUDENT":
          localStorage.setItem('student', JSON.stringify(state.student.concat(action.student)))
          return {
            ...state,
            student: state.student.concat(action.student),
            editStatus: state.editStatus
          };
        case "DELETE_STUDENT":
            let newAr = state.student.filter((data)=> {
                return data.email !== action.email
            })
            localStorage.setItem('student', JSON.stringify(newAr))
            return {
                ...state,
                student: newAr,
                editStatus: state.editStatus
              };
        case "EDIT_STUDENT":
            let editArr = state.student.filter((data)=> {
                if(data.email === action.editStatus.email) {
                    return data;
                }
            })
            localStorage.setItem('editStatus', JSON.stringify(editArr))
            return {
                ...state,
                student: state.student,
                editStatus: editArr
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
                experience : action.updateData.experience
            };
            const newD = state.student.map((data, index) => {
                if(data.email === newObc.email){
                    state.student[index] = newObc;
                    return true;
                }
                 
            })
            
            console.log("new :", state.student);
            localStorage.setItem('student', JSON.stringify(state.student));
            localStorage.setItem('editStatus', null);
            return {
                ...state,
                student: JSON.parse(localStorage.getItem('student')),
                editStatus: state.editStatus
              };
        default:
          return newState;
      }
}

export default studentReducer;