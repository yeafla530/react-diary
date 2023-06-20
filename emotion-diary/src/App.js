import React, { useReducer, useRef } from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

const reducer = (state, action) => {
  // 1. useReducer 상태 관리
  let newState = []
  switch(action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      
      newState = [action.data, ...state]
      break
    }
    case "REMOVE": {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it)=> it.id === action.data.id ? {...action.data} : it)
      break;
    }
    default: 
      return state;    
  }
  return newState;
}
// 2. component 데이터 관리
export const DiaryStateContext = React.createContext();
// 3. dispatch context 세팅
export const DiaryDispatchContext = React.createContext()

const dummyData = [
  {
    id: 1,
    emotion: 1,
    contents: '오늘의 일기1',
    date: 1687240995575, // new Date().getTime()
  },
  {
    id: 2,
    emotion: 2,
    contents: '오늘의 일기2',
    date: 1687240995576, // new Date().getTime()
  },
  {
    id: 3,
    emotion: 3,
    contents: '오늘의 일기3',
    date: 1687240995585, // new Date().getTime()
  },
  {
    id: 4,
    emotion: 4,
    contents: '오늘의 일기4',
    date: 1687240995586, // new Date().getTime()
  },
  {
    id: 5,
    emotion: 5,
    contents: '오늘의 일기5',
    date: 1687240995587, // new Date().getTime()
  },
  {
    id: 6,
    emotion: 3,
    contents: '오늘의 일기6',
    date: 1687240995588, // new Date().getTime()
  },
  {
    id: 7,
    emotion: 2,
    contents: '오늘의 일기7',
    date: 1687240995589, // new Date().getTime()
  },

]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData)
  console.log(new Date().getTime())
  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, contents, emotion) => {
    dispatch({type: "CREATE", data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      contents,
      emotion
    }})
    dataId.current += 1
  }

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }

  // EDIT
  const onEdit = (targetId, date, contents, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        contents,
        emotion
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      {/* dataState를 변화시키는 dispatch함수들을 객체로 넘김 */}
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onEdit,
        onRemove
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* url 경로와 component를 mapping시켜줌 */}
              <Route path='/' element={<Home/>}/>
              <Route path='/new' element={<New/>}/>
              <Route path='/edit' element={<Edit/>}/>
              <Route path='/diary/:id' element={<Diary/>}/>

            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
