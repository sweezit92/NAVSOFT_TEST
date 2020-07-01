/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthAction } from '../../Store/Actions/authAction';

const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validPassRegex=  /^[A-Za-z]\w{7,14}$/;

class Login extends Component {
    state= {
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        },
        btnState: false
    }

    handleChange = (e) => {
        let errors = this.state.errors;
        let name = e.target.name;
        let value = e.target.value;
        switch (name) {
            case 'email':
                errors.email =
                validEmailRegex.test(value)
                        ? ''
                        : 'Invalid email type';
                break;
            case 'password':
                errors.password =
                    value.match(validPassRegex)
                        ? ''
                        : 'Password should  minimum 8 long, which contain only characters, numeric digits, underscore and first character must be a letter';
                break;
            default:
                break;
                
        }

        this.setState({errors, [name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authLogin(this.state);
        this.setState({
            btnState: true
        })
    }

    render() {
        const { errors, email, password } = this.state;
        return (
            <div className="row shiftCenter" >
                <div className="col-md-5">
                    {
                         this.props.authData.length < 1 && this.state.btnState === true &&
                         <div class="alert alert-danger">
                            <strong>Login Failed!</strong> 
                        </div>
                    }
                
                    <div className="card">
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-body" style={{ textAlign: "left" }}>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={email} onChange={this.handleChange} className="form-control" />
                                    {
                                        errors.email !== ''  && 
                                        <span className='error'>{errors.email}</span>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" value={password} onChange={this.handleChange} className="form-control" />
                                    {
                                        errors.password !== ''  && 
                                        <span className='error'>{errors.password}</span>
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
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
        authLogin: (loginData) => dispatch(AuthAction(loginData))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Login)
