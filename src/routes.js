import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './components/login/Login';
import Registration from './components/login/Registration';
import ChatDashboard from './components/chat/ChatDashboard';
import Chat from './components/chat/Chat';

const routes = () => (
  <Router>
    <Route exact path='/' component={Login} />
    <Route exact path='/registration' component={Registration} />
    <Route exact path='/chatDashboard' component={ChatDashboard} />
    <Route exact path='/chat' component={Chat} />
  </Router>
)

export default routes