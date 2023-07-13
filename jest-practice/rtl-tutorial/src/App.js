import React from 'react';
import Profile from './Profile';
import JoinButton from './JoinButton';
import UserList from './UserList';
import Login from './Login';

function App() {
  return(
    <div className="App">
      {/* <Profile />
      <JoinButton age={23}/>
      <UserList users={["Tom", "Mike", "Lily"]}/> */}
      <Login />
    </div>
  )
}

export default App