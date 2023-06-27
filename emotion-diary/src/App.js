import React, { useEffect, useReducer, useRef } from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

// 변화할때마다 localStorage에 일기 저장
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
  console.log(newState)
  localStorage.setItem('diary', JSON.stringify(newState))
  return newState;
}
// 2. component 데이터 관리
export const DiaryStateContext = React.createContext();
// 3. dispatch context 세팅
export const DiaryDispatchContext = React.createContext()


function App() {

  const [data, dispatch] = useReducer(reducer, [])

  useEffect(()=>{
    const localData = localStorage.getItem('diary')
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a,b)=>parseInt(b.id) - parseInt(a.id))
      dataId.current = parseInt(diaryList[0].id) + 1

      console.log(diaryList)
      console.log(dataId)

      dispatch({type: "INIT", data: diaryList})
    }
  }, [])

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
              <Route path='/edit/:id' element={<Edit/>}/>
              <Route path='/diary/:id' element={<Diary/>}/>

            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
