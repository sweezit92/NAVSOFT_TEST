import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StudentDelete } from '../../Store/Actions/studentAction';
import { StudentEdit } from '../../Store/Actions/studentAction';
import { AuthLogout } from '../../Store/Actions/authAction'
import EditDetails from './EditDetails'

class Table extends Component {
    state= {
        pageState : "table"
    }

    handleEdit = (email) => {
        let editStatus = {
            status: true,
            email
        }
        this.setState({
            pageState: "edit"
        })
        this.props.editStudent(editStatus);
    }

    handleDelete = (email) => {
        this.props.delStudent(email);
    }

    logoutUser = () => {
        this.props.logOut();
    }

    changeState = (pageState) => {
        this.setState({pageState})
    }

    render() {
        const studentData = this.props.student;
        const myData = this.props.authData[0];
        return (
            <>
                {
                    this.state.pageState === "edit"
                        ?
                        <EditDetails checkStat={this.changeState}/>
                        :
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>My Profile</h5>
                                    </div>
                                    <div className="card-body" style={{ textAlign: "left" }}>
                                        <h5>{myData.firstName} {myData.lastName}</h5>
                                        <span><b>EMail :</b> {myData.email}</span>
                                        <br />
                                        <span><b>Phone :</b> {myData.phone}</span>
                                        <br />
                                        <span><b>Address :</b> {myData.address}</span>
                                        <br />
                                        <span><b>Experience :</b> {myData.experience} Years</span>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger" onClick={this.logoutUser}>Logout</button>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-9">
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
                                                            <td>
                                                                {
                                                                    data.skills.map((data) => {
                                                                        return (
                                                                            <span className="badge badge-primary" key={data}>{data}</span>
                                                                        )
                                                                    })
                                                                }
                                                            </td>
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
                }


            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        student: state.student.student,
        authData: state.auth.authData,
        editStatus: state.student.editStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delStudent: (email) => dispatch(StudentDelete(email)),
        editStudent: (editStatus) => dispatch(StudentEdit(editStatus)),
        logOut: () => dispatch(AuthLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
