/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StudentAction } from '../../Store/Actions/studentAction';

const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validPhoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const validPassRegex=  /^[A-Za-z]\w{7,14}$/;

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    //console.log("errors :", valid);
    return valid;
}

class SignUp extends Component {

    state = {
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            checkEmail: '',
            phone: '',
            address: '',
            dateOfBirth: '',
            degree: '',
            skills: '',
            experience: '',
            password: '',
            conPassword: ''
        },
        firstName: '',
        lastName: '',
        email: '',
        checkEmail: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        degree: '',
        skills: [],
        experience: '',
        password: '',
        conPassword: ''
    }

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let errors = this.state.errors;

        if(name === 'skills'){
            let newVal = [];
            let options = e.target.options;
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    newVal.push(options[i].value);
                }
            }
            this.setState({
                skills: newVal
            })
            switch (name) {
                case 'skills':
                    errors.skills =
                        newVal.length < 2
                            ? 'You need to select atleast 2 skill!'
                            : '';
                    break;
                default:
                    break;
            }
        }

        if(name === 'email'){
            let allData = JSON.parse(localStorage.getItem('student'));
            let emailStatus;
            if(localStorage.getItem('student') !== null){
                emailStatus = allData.filter((data)=>{
                    if(data.email === value){
                        return true
                    }else{
                        return false
                    }
                })
            }else{
                emailStatus = false;
            }
            
            
            if(validEmailRegex.test(value) !== true){
                errors.email = 'Email is not valid!';
            }else if(emailStatus === true){
                errors.checkEmail = 'Email is already exist';
            }
            console.log("emailerror: ", errors.email);
        }

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 2
                        ? 'First Name must be 2 characters long!'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 2
                        ? 'Last Name must be 2 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value) 
                        ? ''
                        : 'Email is not valid!';  
                break;
           
            case 'phone':
                errors.phone =
                    value.match(validPhoneRegex)
                        ? ''
                        : 'Phone Number is not valid!';
                break;
            case 'address':
                errors.address =
                    value.length > 9
                        ? ''
                        : 'Address must contain 10 charecters!';
                break;
            case 'dateOfBirth':
                errors.dateOfBirth =
                    value !== null
                        ? ''
                        : 'Date of birth is required!';
                break;
            case 'degree':
                errors.degree =
                    value.length > 2
                        ? ''
                        : 'Degree must contain 3 charecters!';
                break;
            case 'experience':
                errors.experience =
                    value !== null
                        ? ''
                        : 'You should select your experience!';
                break;
            case 'password':
                errors.password =
                    value.match(validPassRegex)
                        ? ''
                        : 'Password should  minimum 8 long, which contain only characters, numeric digits, underscore and first character must be a letter';
                break;
                
            case 'conPassword':
                errors.conPassword =
                    this.state.password === value
                        ? ''
                        : 'Confirm passowrd should match password!';
                break;
            default:
                break;
        }
        if(name!== 'skills'){
            this.setState({errors, [name]: value}, ()=> {
                console.log(value.length)
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(this.state.errors)) {
            this.props.addStudent(this.state);
            this.props.changePage("login");
        }
    }

    render() {
        const { errors } = this.state;
        console.log("name :", this.state.firstName);
        return (
            <div className="row shiftCenter-signUp" >
                <div className="col-md-8">
                    <div className="card" >
                        <div className="card-header">
                            SignIn
                            </div>
                        <div className="card-body" style={{ textAlign: "left" }}>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" name="firstName" value={ this.state.firstName} onChange={this.handleChange} className="form-control" />
                                            {
                                                errors.firstName.length > 0 && 
                                                <span className='error'>{errors.firstName}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" name="lastName" value={ this.state.lastName } onChange={this.handleChange} className="form-control" />
                                            {
                                                errors.lastName.length > 0 && 
                                                <span className='error'>{errors.lastName}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
                                            {
                                                errors.email !== ''  && 
                                                <span className='error'>{errors.email}</span>
                                            }
                                            {
                                                errors.checkEmail !=='' &&
                                                <span className='error'>{errors.checkEmail}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="number" name="phone" value={this.state.phone} onChange={this.handleChange} className="form-control" />
                                            {
                                                errors.phone.length > 0 && 
                                                <span className='error'>{errors.phone}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea className="form-control" name="address" value={this.state.address} onChange={this.handleChange} rows="3">
                                            </textarea>
                                            {
                                                errors.address.length > 0 && 
                                                <span className='error'>{errors.address}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Date Of Birth</label>
                                            <input type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} className="form-control" />
                                            {
                                                errors.dateOfBirth.length > 0 && 
                                                <span className='error'>{errors.dateOfBirth}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Degree of Graduation</label>
                                            <input type="text" name="degree" value={this.state.degree} onChange={this.handleChange} className="form-control" />
                                            {
                                                errors.degree.length > 0 && 
                                                <span className='error'>{errors.degree}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Skills</label>
                                            <select multiple className="form-control" name="skills" onChange={this.handleChange}>
                                                <option value="C" selected={(this.state.skills === 'C')? true : false}>C</option>
                                                <option value="Dot Net" selected={(this.state.skills === 'Dot Net')? true : false} onChange={this.handleChange}>Dot Net</option>
                                                <option value="Javascript" selected={(this.state.skills === 'Javascript')? true : false}>Javascript</option>
                                                <option value="PHP" selected={(this.state.skills === 'PHP')? true : false}>PHP</option>
                                                <option value="Python" selected={(this.state.skills === 'Python')? true : false}>Python</option>
                                            </select>
                                            {
                                                errors.skills.length > 0 && 
                                                <span className='error'>{errors.skills}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Experience</label>
                                            <select className="form-control" name="experience" onChange={this.handleChange}>
                                                <option value="0" selected={(this.state.experience === '0')? true : false}>0</option>
                                                <option value="1" selected={(this.state.experience === '1')? true : false}>1</option>
                                                <option value="2" selected={(this.state.experience === '2')? true : false}>2</option>
                                                <option value="3" selected={(this.state.experience === '3')? true : false}>3</option>
                                                <option value="4" selected={(this.state.experience === '4')? true : false}>4</option>
                                                <option value="5" selected={(this.state.experience === '5')? true : false}>5</option>
                                            </select>
                                            {
                                                errors.experience.length > 0 && 
                                                <span className='error'>{errors.experience}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row" >
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" name="password" onChange={this.handleChange} className="form-control" />
                                                {
                                                    errors.password.length > 0 && 
                                                    <span className='error'>{errors.password}</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input type="password" name="conPassword" onChange={this.handleChange} className="form-control" />
                                                {
                                                    errors.conPassword.length > 0 && 
                                                    <span className='error'>{errors.conPassword}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                
                                <button className="btn btn-primary btn-block">Sign Up</button>
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
        student: state.student.student
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (student) => dispatch(StudentAction(student))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
