# Emotion Diary-기술

## Page Rounting

### Routing이란?

> 어떤 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정

- Router : 데이터의 경로를 실시간으로 지정해주는 역할을 하는 무언가

- Routing : 경로를 정해주는 행위차체와 그런 과정들을 다 포함하여 일컫는 말

### PAGE ROUTING이란?

> 요청에 명시되어 있는 경로에 따라 알맞은 페이지를 결정하고 접속하는 과정

![image-20230306150046423](./images/image-20230306150046423.png)

### MPA: 웹서버가 여러개의 page를 갖고있는것

> 페이지가 이동할 때마다 새로고침되어 페이지를 이동시킴

![image-20230306150316652](./images/image-20230306150316652.png)

![image-20230306150536341](./images/image-20230306150536341.png)

### SPA : 단일 페이지 어플리케이션

> 페이지가 한개밖에 없음
>
> 페이지를 오가도 새로고침이 일어나지 않음

![image-20230306150611999](./images/image-20230306150611999.png)

![image-20230306151135807](./images/image-20230306151135807.png)

1. url 요청
2. index.html을 보내주고 React App을 던져주게 됨
3. post버튼 클릭시 React App이 알아서 페이지를 업데이트 시킴 ( 서버와 통신x)
4. 데이터만 server에서 받음
5. **CSR** (Client Side Redering) : 클라이언트 측이 렌더링 하는 방식 - **react router**가 도와줌



## React router  : CSR방식

> **신규 페이지를 불러오지 않는 상황에서 각각의 url에 따라 선택된 데이터를 하나의 페이지에서 렌더링 해주는 라이브러리**
>
> Client Side Rendering 방식 이용할 수 있게 해줌

#### 설치

```
npm install react-router@6 react-router-dom@6
```



#### BrowserRouter

> 브라우저 History API를 사용해 현재 위치의 URL을 저장해주는 역할

#### Routes

> 자식 route들을 구성하고 있는 단위
>
> routes 바깥은 url변경되어도 유지됨

#### Route

> `path`를 통해 URL을 분기시킬 수 있다. 중첩해서 사용할 수 있다. **(중첩 라우팅)**
>
> url과 component를 매핑 시켜줌



※`<a></a>` : MPA 방식, url이동시 화면 전체가 렌더링됨

#### 사용방식

```js
import {BrowserRouter, Route, Routes} from 'react-router-dom'

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
          <Route path='/diary' element={<Diary/>}/>

        </Routes>
        <RouteTest/>
      </div>
    </BrowserRouter>
  );
}

export default App;
```



#### 링크 이동하기

```js
import {Link} from 'react-router-dom'

const RouteTest = () => {
    return <>
        <Link to={'/'}>Home</Link>
        <Link to={'/diary'}>Diary</Link>
        <Link to={'/new'}>New</Link>
        <Link to={'/edit'}>Edit</Link>
    </>

}
export default RouteTest
```



## React Router Dom 기능

> React에서 CSR기반 페이지 라우팅을 할 수 있게 해주는 라이브러리
>
> 사용자가 정의하는 custom hooks 사용

### 1. path variable : useParams

> 상세페이지 구현할 때 경로의 변수를 사용
>
> ex ) /diary/1 => 1번 일기



* 예시 : useParams를 사용하면 params의 값을 찾아낼 수 있다

```js
import { useParams } from "react-router-dom"

const Diary = () => {

    const {id} = useParams()
    console.log(id)

    return (
        <div>
            <h1>Diary</h1>
            <p>이곳은 일기 상세 페이지입니다</p>
        </div>
    )
}
```



### 2. Query String : useSearchParams

> 웹 페이지에 데이터를 전달하는 가장 간단한 방법
>
> ex ) /edit?id=10&mode=dark

* ?뒤에 있는 params는 page routing에 영향을 주지 않는다
* 실시간으로 query String을 바꿀 수 있는 상태변화 함수도 제공 (비구조화 할당 방식)
* setSearchParams를 이용해 query string 변경 가능

```js
import {useSearchParams} from "react-router-dom"

const Edit = () => {
    // 실시간으로 query string을 바꿀수 있는 상태변화 함수도 제공
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id')

    const mode = searchParams.get('mode')
    console.log(id, mode) // 10, dark

    return (
        <div>
            <h1>Edit</h1>
            <p>이곳은 일기 수정 페이지입니다</p>
            <button onClick={()=>setSearchParams({who:"winterlood"})}>QS 바꾸기</button>
           
        </div>
    )
}

```



### 3. Page Moving : useNavigate

> 링크 태그를 클릭안했을 때도 의도적으로 페이지를 바꿀 수 있다
>
> 로그인 안된 사용자가 홈으로 가려할 때, 로그인 체크하여 강제로 로그인페이지로 보내버릴 수 있음



* 반환되는 함수를 navigate로 받아 원하는 경로로 이동가능하게 함

```js
import {useNavigate, useSearchParams} from "react-router-dom"

const Edit = () => {
    const navigate = useNavigate()
    
    return (
        <div>
            <h1>Edit</h1>
            <p>이곳은 일기 수정 페이지입니다</p>
            <button onClick={()=>{navigate('/')}}>HOME으로 가기</button>
            <button onClick={()=>{navigate(-1)}}>뒤로가기</button>
        </div>
    )
}

```



## JSX

### prcess.env.PUBLIC_URL

> 어떤 경로에서든 public의 경로를 찾을 수 있다

```html
<img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} alt="" />
```



### className

> type에 따른 className적용
>
> className 여러개일경우 리스트로 묶고 join으로 합쳐주기

```html
<button className={["MyButton", `Mybutton_${type}`].join(" ")} onClick={onClick}></button>

```



## 기초공사

1. 상태관리 세팅

> 전반적 사용될 일기 데이터 state 관리 로직 작성
>
> useReducer를 이용한 상태관리

```jsx
const reducer = (state, action) => {
  // return state 
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

```

```jsx
function App() {

  const [data, dispatch] = useReducer([reducer, []])
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
  ...
}
```



2. 프로젝트 state context 세팅

> 일기 데이터 state공급할 context 생성하고 provider로 공급
>
> context를 이용한 component 트리에 데이터 공급

 ```jsx
// 2. component 데이터 관리
export const DiaryStateContext = React.createContext();

...

<DiaryStateContext.Provider value={data}>

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
</DiaryStateContext.Provider>
 ```



3. 프로젝트 dispatch context 세팅

> 일기 데이터 state의 dispatch 함수들 공급할 context를 생성하고 Provider로 공급하기
>
> value가 변경될때마다 리렌더 되는 현상 막기 위해 하위 Context 생성

```jsx
// 2. component 데이터 관리
export const DiaryStateContext = React.createContext();
// 3. dispatch context 세팅
export const DiaryDispatchContext = React.createContext()

return (
    <DiaryStateContext.Provider value={data}>
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
```


