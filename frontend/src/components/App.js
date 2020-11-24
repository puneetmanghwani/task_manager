
// *****Library Functions Import******
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

// *****Components Imports*******
import AddUser from './user/AddUser';
import UsersList from './user/UsersList';
import EditUser from './user/EditUser';
import AddTask from './task/AddTask';
import TasksList from './task/TasksList';
import EditTask from './task/EditTask';
import TaskManager from './TaskManager';
import Home from './Home';

// *****Css for root Component****
import './App.css';

var navStyle= { paddingRight:'30px' }

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar  bg="light" expand="lg">

          {/* Navbar */}
          <Link style={navStyle} to={'/adduser'} >Add User</Link>
          <Link style={navStyle} to={'/users'} >Users List</Link>
          <Link style={navStyle} to={'/addtask'} >Add Task</Link>
          <Link style={navStyle} to={'/tasks'} >Tasks List</Link>
          <Link style={navStyle} to={'/taskmanager'} >Task Manager</Link>

        </Navbar>

        <Switch>

          {/* All routes */}
          <Route exact path='/' component={Home} />
          <Route path='/adduser' component={AddUser} />
          <Route path='/users' component={UsersList} />
          <Route path='/user/:USER' component={EditUser} />
          <Route path='/addtask' component={AddTask} />
          <Route path='/tasks' component={TasksList} />
          <Route path='/task/:TASK' component={EditTask} />
          <Route path='/taskmanager' component={TaskManager} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
