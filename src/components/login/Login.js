import React,{Component,Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link,Redirect} from 'react-router-dom';
import '../../styles/Login.css';
import {signin} from '../../redux/login';
import {connect} from 'react-redux';

class Login extends Component{
  state={
    userEmail: '',
    userPassword: '',
    chatDashboard: false
  }
  handleEvent = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  signin = () => {
    this.props.signin(this.state)
  }
  componentDidUpdate(){
    console.log(this.props.token)
    if(this.props.token && this.props.userId){
      this.setState({
        chatDashboard: true
      })
      localStorage.setItem('token',this.props.token)
      localStorage.setItem('userId',this.props.userId)
    }
  }
  render(){
    return(
      <Fragment>
        {this.state.chatDashboard ? <Redirect to='/chatDashboard' /> : null}
        <div className='login col-lg-3'>
          <h4 className='title'><b>Login</b></h4>
          {this.props.error ? <h4>{this.props.error}</h4>: null}
          <form noValidate autoComplete="off">
            <TextField className='col-lg-12' name='userEmail' value={this.state.userEmail} onChange={this.handleEvent} label="Email" /><br></br>
            <TextField className='col-lg-12' name='userPassword' value={this.state.userPassword} onChange={this.handleEvent} type='password' label="Password" /><br></br>
          </form>
          <div className='login-buttons'>
            <Button variant="contained" color='primary' onClick={this.signin}>SignIn</Button>
          </div>
          <h6>Don't have an account ? Create your account <Link to='/registration'>SignUp</Link></h6>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  userId: state.userId,
  error: state.error
})

const mapDispatchToProps = {
  signin: signin
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)