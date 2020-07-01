import React, { Component } from 'react'
import { connect } from 'react-redux';
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Table from "./Dashboard/Table"

import { AuthLogout } from '../Store/Actions/authAction'

class MainComp extends Component {

    state = {
        pageStatus: "login"
    }

    logoutUser = (e) => {
        e.preventDefault();
        this.props.logOut();
    }

    changeState = (pageStatus) => {
        this.setState({
            pageStatus
        })
    }

    render() {
        console.log("props:", this.props.authData);
        return (
            <div className="container">
                {
                    this.props.authData.length > 0 
                    ?
                    <Table />
                    :
                    <>
                    {
                        this.state.pageStatus === "login"
                        ?
                        <>
                        <Login />
                        <h5 style={{marginTop: "20px"}}>Don't have an acoount? <span style={{cursor: "pointer", color: "#007bff"}} onClick={()=> this.changeState("signUp")}>Sign Up</span> Now</h5>
                        </>
                        :
                        <>
                        <SignUp changePage={this.changeState}/>
                        <h5 style={{marginTop: "20px"}}>Have an acoount? <span style={{cursor: "pointer", color: "#007bff"}} onClick={()=> this.changeState("login")}>Login</span> to your account</h5>
                        </>
                    }
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
