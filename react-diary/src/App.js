import './App.css'
import DiaryEditor from "./DiaryEditor"
import DiaryList from './DiaryList';
import {useRef, useState} from 'react'

// const dummyList = [
//   {
//     id: 1,
//     author: "이예림",
//     contents: "하이1",
//     emotion: "1",
//     created_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     author: "이정",
//     contents: "하이12",
//     emotion: "4",
//     created_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author: "김정환",
//     contents: "하이13",
//     emotion: "5",
//     created_date: new Date().getTime()
//   },
//   {
//     id: 4,
//     author: "이건호",
//     contents: "하이14",
//     emotion: "4",
//     created_date: new Date().getTime()
//   },
// ]

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0)
  // 일기 데이터 추가함수
  const onCreate = (author, contents, emotion) => {
    const created_date = new Date().getTime()
    const newItem = {
      author,
      contents,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1
    setData([newItem, ...data])
  }
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data}/>
    </div>
  );
}

export default App;
