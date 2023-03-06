import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'
import RouteTest from './components/RouteTest'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          {/* url 경로와 component를 mapping시켜줌 */}
          <Route path='/' element={<Home/>}/>
          <Route path='/new' element={<New/>}/>
          <Route path='/edit' element={<Edit/>}/>
          <Route path='/diary/:id' element={<Diary/>}/>

        </Routes>
        <RouteTest/>
      </div>
    </BrowserRouter>
  );
}

export default App;
