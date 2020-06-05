import React,{Component,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Join from './Join';
import {connect} from 'react-redux';
import {getCurrentUser} from '../../redux/login';

import '../../styles/ChatDashboard.css';

class ChatDashboard extends Component{
  componentDidMount(){
    const id = localStorage.getItem('userId')
    this.props.getCurrentUser(id)
  }
  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  componentDidUpdate(){
    console.log(this.props.currentUser)
  }
  render(){
    return(
      <Fragment>
        <div>
          <div className='chatDashboardContainer'>
            <h2>Welcome {this.props.currentUser && this.props.currentUser.userName} to Chat Application</h2>
            <Link to='/'><Button onClick={this.logout}>Logout</Button></Link>
          </div>
          <Join name={this.props.currentUser && this.props.currentUser.userName}/>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = {
  getCurrentUser: getCurrentUser
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatDashboard)