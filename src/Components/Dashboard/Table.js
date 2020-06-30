import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StudentDelete } from '../../Store/Actions/studentAction';
import { StudentEdit } from '../../Store/Actions/studentAction';

class Table extends Component {

    handleEdit = (email) => {
        let editStatus = {
            status: true,
            email
        }
        this.props.editStudent(editStatus);
    }

    handleDelete = (email) => {
        this.props.delStudent(email);
    }

    render() {
        const studentData = this.props.student;
        console.log("table",this.props.student );
        return (
            <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Date Of Birth</th>
                                    <th>Address</th>
                                    <th>Degree of Graduation</th>
                                    <th>Skills</th>
                                    <th>Experienced</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentData.map((data) => {
                                        return (
                                            <tr key={data.email}>
                                                <td>{data.firstName} {data.lastName}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td>{data.dateOfBirth}</td>
                                                <td>{data.address}</td>
                                                <td>{data.degree}</td>
                                                <td>{data.skills}</td>
                                                <td>{data.experience} Years</td>
                                                <td>
                                                    <button className="btn btn-success mr-3" onClick={() => this.handleEdit(data.email)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => this.handleDelete(data.email)}>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        student: state.student.student
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delStudent: (email) => dispatch(StudentDelete(email)),
        editStudent: (editStatus) => dispatch(StudentEdit(editStatus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
