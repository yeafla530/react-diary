import React from 'react';
// import './App.css';
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
    <div style={style.App}>
      <MyHeader/>
      <header className="App-header">
        <h2 style={style.h2}>안녕 리액트 {name}</h2>
        <b style={style.bold_text} id="bold_text">
          {number}는 {number % 2 === 0 ? '짝수' : '홀수'}
        </b>
      </header>
      <MyFooter />
    </div>
    //</>
    // </React.Fragment>
    
  );
}

export default App;
