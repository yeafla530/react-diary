import {} from './App.css'
import DiaryEditor from "./DiaryEditor"
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "이예림",
    contents: "하이1",
    emotion: "1",
    created_date: new Date().getTime()
  },
  {
    id: 2,
    author: "이정",
    contents: "하이12",
    emotion: "4",
    created_date: new Date().getTime()
  },
  {
    id: 3,
    author: "김정환",
    contents: "하이13",
    emotion: "5",
    created_date: new Date().getTime()
  },
  {
    id: 4,
    author: "이건호",
    contents: "하이14",
    emotion: "4",
    created_date: new Date().getTime()
  },
]

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
