import React,{Component,Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../styles/Login.css';
import {Link} from 'react-router-dom';
import {signup} from '../../redux/login';
import {connect} from 'react-redux';
import{Redirect} from 'react-router-dom';

class Registration extends Component{
  state={
    userName: '',
    userContact: '',
    userAddress: '',
    userEmail: '',
    userPassword: ''
  }
  handleEvent = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  signup = () => {
    this.props.signup(this.state)
  }
  render(){
    return(
      <Fragment>
        {this.state.redirect ? <Redirect to='/' /> : null}
        <div className='registration col-lg-3'>
          <h4 className='title'><b>Registration</b></h4>
          <form noValidate autoComplete="off">
            <TextField className='col-lg-12' name='userName' value={this.state.userName} onChange={this.handleEvent} label="Name" /><br></br>
            <TextField className='col-lg-12' name='userContact' value={this.state.userContact} onChange={this.handleEvent} type='number' label="Contact" /><br></br>
            <TextField className='col-lg-12' name='userAddress' value={this.state.userAddress} onChange={this.handleEvent} label="Address" /><br></br>
            <TextField className='col-lg-12' name='userEmail' value={this.state.userEmail} onChange={this.handleEvent} label="Email" /><br></br>
            <TextField className='col-lg-12' name='userPassword' value={this.state.userPassword} onChange={this.handleEvent} type='password' label="Password" /><br></br>
          </form>
          <div className='registration-buttons'>
            <Link to='/'><Button variant="contained" color='primary' onClick={this.signup}>SignUp</Button></Link>
          </div>
          <h6>Already account ? <Link to='/'>Login</Link></h6>
        </div>
      </Fragment>
    )
  }
}
const mapDispatchToProps = {
  signup: signup
}

export default connect(null,mapDispatchToProps)(Registration)