import React from 'react';
// import './App.css';
import Counter from './Counter'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import Container from './Container'

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
  
  const counterProps = {
    a: 1,
    b: 2, 
    c: 3,
    d: 4,
    e: 5,
    // initialValue: 5
  }
  const number = 5

  return (
  
    <Container>
      {/* Container의 자식요소 => children prop으로 전달됨*/}
      <div>
        <MyHeader/>
        <Counter {...counterProps}/>
      </div>
    </Container>
    
  );
}

export default App;
