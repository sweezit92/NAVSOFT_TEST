export const StudentAction = (student) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'ADD_STUDENT', student});
    }
};

export const StudentDelete = (email) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'DELETE_STUDENT', email});
    }
};

export const StudentEdit = (editStatus) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'EDIT_STUDENT', editStatus});
    }
};

export const UpdateStudent = (updateData) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'UPDATE_STUDENT', updateData});
    }
};
