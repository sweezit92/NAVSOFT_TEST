import React, { Component } from 'react'
import { connect } from 'react-redux';
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Table from "./Dashboard/Table"

import { AuthLogout } from '../Store/Actions/authAction'

class MainComp extends Component {

    logoutUser = (e) => {
        e.preventDefault();
        this.props.logOut();
    }

    render() {
        console.log("props:", this.props.authData);
        return (
            <div className="container">
                {
                    this.props.authData.length > 0 
                    ?
                    <>
                    <h5 style={{marginTop: "20px"}}>Hello {this.props.authData[0].firstName} {this.props.authData[0].lastName}</h5>
                    <button className="btn btn-danger" onClick={this.logoutUser}>Logout</button>
                    <SignUp />
                    <Table />
                    </>
                    :
                    <>
                    <SignUp />
                    <h5 style={{marginTop: "20px"}}>OR</h5>
                    <Login />
                    </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authData: state.auth.authData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(AuthLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComp)
