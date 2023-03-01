import './App.css'
import DiaryEditor from "./DiaryEditor"
import DiaryList from './DiaryList';
import {useRef, useState, useEffect} from 'react'

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

// https://jsonplaceholder.typicode.com/comments
function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0)
  // api 호출
  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json())
    console.log(res)

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        contents: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id : it.id
      }
    })
    setData(initData)

  }

  // mount시 api호출
  useEffect(()=>{
    getData();
  },[])

  
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

  // 일기 삭제 함수
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`)
    const newDiaryList = data.filter((it) => it.id !== targetId)
    setData(newDiaryList)
  };

  // 일기 수정 함수
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, contents: newContent} : it)
    )
  }


  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

export default App;
