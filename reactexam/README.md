# 📍 React

## React 사용하는 이유

1. 공통요소 : 컴포넌트 화 방식

   * React는 Component 기반의 UI 라이브러리다

   * 공통적으로 사용될 것으로 예상되는 것들을 컴포넌트로 묶어 사용

   * 유지보수, 재사용 용이

   * Shotgun Surgery : 중복 코드 삭제

     

2.  선언형 프로그래밍

   * 목적을 바로 말하는 프로그래밍
   * 명령형 프로그래밍 : 절차를 하나하나 다 나열해야함 (jquery)



3. Virtual DOM
   * DOM(Document Object Model)이란 문서 객체 모델
   * 잦은 업데이트 상황에서는 브라우저는 필요이상의 연산을 해야되고 성능저하로 이어짐
   * 가상 돔을 사용함으로써 발생하는 변화를 가상돔에 미리 업데이트 시키고 (화면에 그리지 않음) 한번에 업데이트 시킴
     * State Change > Compute Diff(업데이트 상황) > Re-render
     * Compute Diff과정이 Browser DOM과 Virtual DOM의 차이점



## Get Started

```
cd reactexam
npm start
```



## document structure

```
ㄴ node_modules : node.js 구성요소중 하나로 외부 모듈을 저장하고 있는 폴더
ㄴ public
	ㄴ fabicon.ico : 웹사이트 아이콘
	ㄴ index.html : 전체 html 코드
	ㄴ manifest.json : 홈화면에 추가 같은 아이콘 설정
	ㄴ robots.txt : 검색 엔진 수집 설정
ㄴ src
	ㄴ App.css : style 파일
	ㄴ App.js : 컴포넌트, jsx문법 사용
	ㄴ package-lock.json : node_modules에 있는 목록이 작성되어있음
	ㄴ package.json : node_modules에 있는 목록이 작성되어있음
	
```



## es module system

> `export default App`
>
> => 다른 파일에서 `import name from '경로'`로 사용할 수 있음



## useEffect

> class형에서 사용할 수 있었던 lifecycle을 hook을 통해  함수형 코드에서도 작성할 수 있게 됐다 (useEffect)



1. mount

   > 의존성 배열 ㅣ 배열 내 들어가있는값이 변화하면 콜백함수가 수행됨

   ```
   useEffect(()=>{
   	// todo
   	mount될 때 실행시킬 함수
   },[]) // 의존성배열
   ```

   

2. update

   ```
   useEffect(()=>{
   	// todo
   	update될 때 실행시킬 함수
   })
   ```

   

3. unmount

   ```
   useEffect(()=>{
   	return () => {
   		// todo
   		unmount될 때 실행시킬 함수
   	}
   },[])
   ```

   

## React.memo

> 함수형 컴포넌트에 업데이트 조건 걸어줌
>
> react.memo는 고차컴포넌트(HOC)이다

* 같은 props를 받으면 rerendering하지 않는 강화된 component를 돌려준다

```
const MyComponent = React.memo(function MyComponent(props) {
  /* props를 사용하여 렌더링 */
});
```



### example

1. React.memo 적용 x
   * 둘중에 하나라도 변화하면 둘다 rerendering됨

```js
// 둘중에 하나라도 변화하면 둘다 rerendering됨
const TextView = ({text}) => {
    useEffect(()=>{
        console.log(`UseEffect :: Text : ${text}`)
    })
    return <div>{text}</div>
}

const CountView = ({count}) => {
    useEffect(()=>{
        console.log(`UseEffect :: Count : ${count}`)
    })
    return <div>{count}</div>
}

```

2. React.memo 적용
   * 각각 text나 count가 바뀔때만 작동됨 

```js
const TextView = React.memo(({text}) => {
    useEffect(()=>{
        console.log(`UseEffect :: Text : ${text}`)
    })
    return <div>{text}</div>
})

const CountView = React.memo(({count}) => {
    useEffect(()=>{
        console.log(`UseEffect :: Count : ${count}`)
    })
    return <div>{count}</div>
})
```

