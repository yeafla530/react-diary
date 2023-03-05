import './App.css'
import DiaryEditor from "./DiaryEditor"
import DiaryList from './DiaryList';
import React, {useRef, useReducer, useEffect, useMemo, useCallback} from 'react'


const reducer = (state, action) => {
  switch(action.type) {
    // return 값이 data의 값이 됨
    // 1. 초기화
    case "INIT": {
      return action.data
    }
    case "CREATE": {
      const created_date = new Date().getTime()
      const newItem = {
        ...action.data,
        created_date
      }

      return [newItem, ...state]
    }

    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId)
    }

    case "EDIT": {
      return state.map((it) => it.id === action.targetId ? {...it, contents:action.newContent} : it)
    }

    default:
      return state 
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


// https://jsonplaceholder.typicode.com/comments
const  App = () => {
  // const [data, setData] = useState([]);

  // useReducer로 변화
  const [data, dispatch] = useReducer(reducer, [])

  const dataId = useRef(21)
  // api 호출
  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json())

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        contents: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id : it.id
      }
    })
    dispatch({type: "INIT", data:initData});
    // setData(initData) : setData가 할일을 reducer함수가 하게됨

  }

  // mount시 api호출
  useEffect(()=>{
    getData();
  },[])

  
  // 일기 데이터 추가함수
  // useCallback : 함수의 재생성
  const onCreate = useCallback((author, contents, emotion) => {
    dispatch({type:"CREATE", data:{author, contents, emotion, id: dataId.current}})
    dataId.current += 1
    
    // const created_date = new Date().getTime()
    // const newItem = {
    //   author,
    //   contents,
    //   emotion,
    //   created_date,
    //   id: dataId.current
    // }
    // setData([newItem, ...data])
    // 함수형 업데이트 : 값을 전달하지 않고 함수를 전달
    // data의 현재값을 참조할 수 있도록 함
    // 항상 최신의 state를 참조할 수 있도록 도와주는 함수형 업데이트
    // setData((data)=>[newItem, ...data])
  }, [] ) // depth 전달 - 빈배열이면 mount되는 시점 한번만 만들고 재사용함
  //빈 배열로 전달 시 다이어리 추가했을 때, 20개 => 빈배열에 1개 추가한 data가 보임


  // 일기 삭제 함수
  const onRemove = useCallback((targetId) => {
    console.log(`${targetId}가 삭제되었습니다`)
    dispatch({type: "REMOVE", targetId})
    // 최신 state사용
    // setData((data)=>data.filter((it) => it.id !== targetId))
  }, []);

  // 일기 수정 함수
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: "EDIT", targetId, newContent})
    
    // setData((data) =>
    //   data.map((it) => it.id === targetId ? {...it, contents: newContent} : it)
    // )
  },[])

  // 재생성 됨
  // const dispatches = {
  //   onCreate, onRemove, onEdit
  // }

  // useMemo사용
  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onEdit}
  }, [])


  // useMemo를 쓰면 함수가 아닌 값을 return 하게 됨
  // 연산최적화 
  const getDiaryAnalysis = useMemo(
    () => {
    console.log("일기 분석 시작")

    const goodCount = data.filter((it) => it.emotion >= 3).length
    const badCount = data.length - goodCount
    const goodRatio = (goodCount / data.length) * 100
    return {goodCount, badCount, goodRatio}
  }, [data.length] // data.length가 변화해야만 return 값을 다르게 호출해줌
  )

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    // state Provider
    <DiaryStateContext.Provider value={data}>
      {/* dispatch Provider */}
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          

          <DiaryList/>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
