import React from 'react';
// import './App.css';
import Counter from './Counter'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'

function App() {
  let name = '이예림'
  const style = {
    App : {
      backgroundColor: 'black'
    },
    h2 : {
      color: "red"
    }, 
    bold_text: {
      color: "green"
    }
  }
  
  const number = 5

  return (
    // 2. 최상위 태그 필요
    // <React.Fragment>
    //<>
    <div>
      <MyHeader/>
      <Counter />
    </div>
    //</>
    // </React.Fragment>
    
  );
}

export default App;
