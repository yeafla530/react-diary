# π React

## React μ¬μ©νλ μ΄μ 

1. κ³΅ν΅μμ : μ»΄ν¬λνΈ ν λ°©μ

   - Reactλ Component κΈ°λ°μ UI λΌμ΄λΈλ¬λ¦¬λ€

   - κ³΅ν΅μ μΌλ‘ μ¬μ©λ  κ²μΌλ‘ μμλλ κ²λ€μ μ»΄ν¬λνΈλ‘ λ¬Άμ΄ μ¬μ©

   - μ μ§λ³΄μ, μ¬μ¬μ© μ©μ΄

   - Shotgun Surgery : μ€λ³΅ μ½λ μ­μ 

2. μ μΈν νλ‘κ·Έλλ°

   - λͺ©μ μ λ°λ‘ λ§νλ νλ‘κ·Έλλ°
   - λͺλ Ήν νλ‘κ·Έλλ° : μ μ°¨λ₯Ό νλνλ λ€ λμ΄ν΄μΌν¨ (jquery)

3. Virtual DOM
   - DOM(Document Object Model)μ΄λ λ¬Έμ κ°μ²΄ λͺ¨λΈ
   - μ¦μ μλ°μ΄νΈ μν©μμλ λΈλΌμ°μ λ νμμ΄μμ μ°μ°μ ν΄μΌλκ³  μ±λ₯μ νλ‘ μ΄μ΄μ§
   - κ°μ λμ μ¬μ©ν¨μΌλ‘μ¨ λ°μνλ λ³νλ₯Ό κ°μλμ λ―Έλ¦¬ μλ°μ΄νΈ μν€κ³  (νλ©΄μ κ·Έλ¦¬μ§ μμ) νλ²μ μλ°μ΄νΈ μν΄
     - State Change > Compute Diff(μλ°μ΄νΈ μν©) > Re-render
     - Compute Diffκ³Όμ μ΄ Browser DOMκ³Ό Virtual DOMμ μ°¨μ΄μ 

## Get Started

```
cd react-diary
npm start
```

## document structure

```
γ΄ node_modules : node.js κ΅¬μ±μμμ€ νλλ‘ μΈλΆ λͺ¨λμ μ μ₯νκ³  μλ ν΄λ
γ΄ public
	γ΄ fabicon.ico : μΉμ¬μ΄νΈ μμ΄μ½
	γ΄ index.html : μ μ²΄ html μ½λ
	γ΄ manifest.json : ννλ©΄μ μΆκ° κ°μ μμ΄μ½ μ€μ 
	γ΄ robots.txt : κ²μ μμ§ μμ§ μ€μ 
γ΄ src
	γ΄ App.css : style νμΌ
	γ΄ App.js : μ»΄ν¬λνΈ, jsxλ¬Έλ² μ¬μ©
	γ΄ package-lock.json : node_modulesμ μλ λͺ©λ‘μ΄ μμ±λμ΄μμ
	γ΄ package.json : node_modulesμ μλ λͺ©λ‘μ΄ μμ±λμ΄μμ

```

## es module system

> `export default App`
>
> => λ€λ₯Έ νμΌμμ `import name from 'κ²½λ‘'`λ‘ μ¬μ©ν  μ μμ

## useEffect

> classνμμ μ¬μ©ν  μ μμλ lifecycleμ hookμ ν΅ν΄ ν¨μν μ½λμμλ μμ±ν  μ μκ² λλ€ (useEffect)

1. mount

   > μμ‘΄μ± λ°°μ΄ γ£ λ°°μ΄ λ΄ λ€μ΄κ°μλκ°μ΄ λ³ννλ©΄ μ½λ°±ν¨μκ° μνλ¨

   ```
   useEffect(()=>{
   	// todo
   	mountλ  λ μ€νμν¬ ν¨μ
   },[]) // μμ‘΄μ±λ°°μ΄
   ```

2. update

   ```
   useEffect(()=>{
   	// todo
   	updateλ  λ μ€νμν¬ ν¨μ
   })
   ```

3. unmount

   ```
   useEffect(()=>{
   	return () => {
   		// todo
   		unmountλ  λ μ€νμν¬ ν¨μ
   	}
   },[])
   ```

## React.memo

> ν¨μν μ»΄ν¬λνΈμ μλ°μ΄νΈ μ‘°κ±΄ κ±Έμ΄μ€
>
> React.memoλ κ³ μ°¨μ»΄ν¬λνΈ(HOC)μ΄λ€

- κ°μ propsλ₯Ό λ°μΌλ©΄ rerenderingνμ§ μλ κ°νλ componentλ₯Ό λλ €μ€λ€

```
const MyComponent = React.memo(function MyComponent(props) {
  /* propsλ₯Ό μ¬μ©νμ¬ λ λλ§ */
});
```

### example

1. React.memo μ μ© x
   - λμ€μ νλλΌλ λ³ννλ©΄ λλ€ rerenderingλ¨

```js
// λμ€μ νλλΌλ λ³ννλ©΄ λλ€ rerenderingλ¨
const TextView = ({ text }) => {
  useEffect(() => {
    console.log(`UseEffect :: Text : ${text}`);
  });
  return <div>{text}</div>;
};

const CountView = ({ count }) => {
  useEffect(() => {
    console.log(`UseEffect :: Count : ${count}`);
  });
  return <div>{count}</div>;
};
```

2. React.memo μ μ©
   - κ°κ° textλ countκ° λ°λλλ§ μλλ¨

```js
const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`UseEffect :: Text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`UseEffect :: Count : ${count}`);
  });
  return <div>{count}</div>;
});
```

3. objectμ μμ λΉκ΅

```js
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Counter A Update: ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
  // κ°μ²΄λ μμ λΉκ΅ > μ£Όμλ₯Ό λΉκ΅
  useEffect(() => {
    console.log(`Counter B Update: ${obj.count}`);
  });

  return <div>{obj.count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>counter A</h2>
        <CounterA count={count} />
        {/* μνκ° λ°λμ§ μμ */}
        <button onClick={() => setCount(count)}>A Button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <CounterB obj={obj} />
        {/* countκ° λ³κ²½λμ§ μμλλ° rerenderλ¨ */}
        {/* μμ λΉκ΅λ₯Ό  νκΈ° λλ¬Έμ μ£Όμκ° λ³κ²½λ¨*/}
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};
```

4. React.memoμ areEqual
   - next Propsμ pre Propsκ° λμΌν κ°μ κ°μ§λ©΄ True, μλλ©΄ False
   - React.memoμμ areEqualμ κ°μ΄ trueλ©΄ rerenderingνμ§ μμ

```js
function MyComponent(props) {
  /* propsλ₯Ό μ¬μ©νμ¬ λ λλ§ */
}
function areEqual(prevProps, nextProps) {
  /*
  nextPropsκ° prevPropsμ λμΌν κ°μ κ°μ§λ©΄ trueλ₯Ό λ°ννκ³ , κ·Έλ μ§ μλ€λ©΄ falseλ₯Ό λ°ν
  */
}
export default React.memo(MyComponent, areEqual);
```

```javascript
const CounterB = ({ obj }) => {
  // κ°μ²΄λ μμ λΉκ΅ > μ£Όμλ₯Ό λΉκ΅
  useEffect(() => {
    console.log(`Counter B Update: ${obj.count}`);
  });

  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // if (prevProps.obj.count === nextProps.obj.count) {
  //     return true // μ΄μ  νλ‘­μ€ νμ¬ νλ‘­μ€κ° κ°λ€ => λ¦¬λ λλ₯Ό μΌμΌν€μ§ μμ
  // }
  // return false // rerenderλ₯Ό μΌμΌμΌλΌ

  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter B</h2>
        // μμ λ³΅μ¬μΌλλ rerenderingλμ§ μμ
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};
```

## μ»΄ν¬λνΈ μ΅μ ν : useCallBack

> λ©λͺ¨μ΄μ μ΄μλ μ½λ°±μ λ°ννλ€
>
> μ΄λ €μ΄ κ°λμ΄μλ€,,

### μ΅μ ν λ¬Έμ  κ³ μ°°

1. DiaryListμμ μ­μ  λλ₯Ό μ DiaryEditor Componentλ κ°μ΄ rerenderingλ¨

![image-20230302192422819](./images/image-20230302192422819.png)

2. μ­μ λ₯Ό λλ₯Έλ€κ³  DiaryEditorκΉμ§ rerenderingλλ κ²μ λΆνμ
3. λΆνμν λ λλ§ λ°©μ§μν΄ useCallbackμ¬μ©

### useCallback

> `useCallback(fn, deps)`λ `useMemo(()=>fn, deps)`μ κ°λ€
>
> κ°μ λ°ννλκ² μλ λ©λͺ¨μ΄μ μ΄μλ callbackν¨μλ₯Ό λ°ν

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b] // dependency array => a, bμ κ°μ΄ λ³νν΄μΌλ§ μΆλ ₯λ¨
);
```

- ν¨μλ₯Ό μ¬μμ±ν¨
- [] : depth, λΉ λ°°μ΄μ΄λ©΄ mountλλ μμ μ νλ²λ§ μ€νλ¨

### ν΄κ²°λ°©λ²

1. DiaryEditor Componentλ₯Ό React.memoλ‘ κ°μΈμ£Όμ΄ λ³νκ° μμ λλ§ renderνλλ‘ λ°κΏ
2. App.jsμμ μλ‘κ³ μΉ¨ νμ λ DiaryEditorμμ Rerenderκ° 2λ² μΌμ΄λ¨
   - App.jsμμ dataμ μ΄κΈ°κ° []
   - mountλλ μμ μμ μ΄κΈ°ν μμ μΌμ΄λ¨ (initData) => setDataμ μ λ¬λλ©΄μ λ λλ§ μΌμ΄λ¨
   - DiaryEditorμ μ λ¬λλ onCreateν¨μκ° 2λ² μμ±λμ΄ μ λ¬λ¨
3. DiaryEditorλ‘ μ λ¬λλ onCreateν¨μ useCallbackμΌλ‘ κ°μΈμ€
4. depsλ λΉλ°°μ΄λ‘ μ λ¬νμ¬ mountλλ μμ μ νλ²λ§ μλλλλ‘ ν΄μ€, κ·Έ λ€μμ μ²«λ²μ§Έ ν¨μλ₯Ό κ³μ μ¬μ¬μ©ν  μ μλλ‘ λ§λ¦

```js
const onCreate = useCallback((author, contents, emotion) => {
  const created_date = new Date().getTime();
  const newItem = {
    author,
    contents,
    emotion,
    created_date,
    id: dataId.current,
  };
  dataId.current += 1;
  setData([newItem, ...data]);
}, []);
```

### λ¬Έμ μ 1

> μΌκΈ° μμ± μ 20κ°μ μΌκΈ°κ° μ¬λΌμ§κ³  μμ±ν 1κ°μ μΌκΈ°λ§ λ¨λ μ€λ₯κ° λ°μ

![image-20230302200208464](./images/image-20230302200208464.png)

#### μμΈ

- onCreateμ depsλ₯Ό λΉλ°°μ΄λ‘ μ€μ νκΈ° λλ¬Έ
- mountνμ λμ λ°°μ΄μ λΉλ°°μ΄,,! dataμ λ§μ§λ§μ΄ []μ΄κΈ° λλ¬Έμ 1κ°λ§ μμ±λ κ²
- ν¨μλ μ»΄ν¬λνΈκ° μ¬μμ±λ  λ λ€μ μμ±λλ μ΄μ κ° μμ
  - νμ¬ stateκ°μ μ°Έμ‘°ν  μ μμ΄μΌνκΈ° λλ¬Έμ

#### ν΄κ²°λ°©λ²1

- depsμ dataλ₯Ό λ£μ΄μ€λ€

```js
const onCreate = useCallback(
  (author, contents, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      contents,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  },
  [data]
);
```

**λ¬Έμ μ ** | dataκ° λ³νν  λλ§λ€ μλλλ―λ‘ μ°λ¦¬κ° μνλ λμμ΄ μ΄λ€μ§ μ μμ

**μ°λ¦¬κ° μνλ λμ** | dataκ° λ³νν΄λ onCreateν¨μκ° μμ±λμ§ μλλ‘ νκΈ°

#### ν΄κ²°λ°©λ²2

- ν¨μν μλ°μ΄νΈ μ§ν
- setDataμ κ°μ΄ μλ ν¨μλ₯Ό μ λ¬
- ν­μ μ΅μ μ stateλ₯Ό μΈμλ₯Ό ν΅ν΄ μ λ¬λ°κ² λλ©΄μ depsλ₯Ό λΉμΈ μ μλλ‘ λμμ€

```js
const onCreate = useCallback((author, contents, emotion) => {
  const created_date = new Date().getTime();
  const newItem = {
    author,
    contents,
    emotion,
    created_date,
    id: dataId.current,
  };
  dataId.current += 1;
  // ν¨μν μλ°μ΄νΈ
  setData((data) => [newItem, ...data]);
}, []);
```

## useReducer

> μ»΄ν¬λνΈμμ μνλ³ν λ‘μ§ λΆλ¦¬
>
> λ³΅μ‘ν μνλ³ν λ‘μ§μ μ»΄ν¬λνΈ λ°μμ κ΄λ¦¬ν  μ μλλ‘ ν¨

```js
const [count, dispatch] = useReducer(reducer, 1)
const reducer = (state, action) => {
	switch (action.type) {
		case 1:
			return state + 1
		default:
			return state
	}
}

return() {
	<div>
		{count}
		<button onClick={() => dispatch({type : 1})}>add 1</button>
	<div>
}
```

- count : μν
- dispatch : μν λ³ν ν¨μ, μν λ³νλ₯Ό μΌμΌν΄
- reducer : μνλ³ν μ²λ¦¬ν¨μ
- 1: countμ μ΄κΈ°κ°
- (state, action) : state - κ°μ₯ μ΅μ  state, action : μ‘μ κ°μ²΄μ κ°
- {type : 1}: μ‘μ κ°μ²΄ = μν λ³ν

### νΉμ§

- ν¨μν μλ°μ΄νΈ νμ μμ΄ νΈμΆνλ©΄ μμμ νμ¬ stateλ₯Ό reducerν¨μκ° μ°Έμ‘°ν΄μ λ³κ²½ν΄μ€λ€
  - dipendency array μ κ²½ μμ¨λ λλ€

## Context

> μ»΄ν¬λνΈ νΈλ¦¬μ λ°μ΄ν° κ³΅κΈνκΈ°
>
> props drilling λ¬Έμ  ν΄κ²°

[νμ ν¬κΈ°λ‘ μλΌλ¨Ήλ λ¦¬μ‘νΈ μ€]

![μΈνλ° - νμ ν¬κΈ°λ‘ μλΌλ¨Ήλ λ¦¬μ‘νΈ](./images/image-20230305233606136.png)

[Context μ μ©]

![image-20230305234342393](images/image-20230305234342393.png)

1. λͺ¨λ  λ°μ΄ν°λ₯Ό κ°μ component
2. κ³΅κΈμ μ­ν μ νλ Providerμ data λκΉ
3. Provider μμμ ν΄λΉνλ λͺ¨λ  Componentμ μ§ν΅μΌλ‘ λ°μ΄ν°λ₯Ό μ€ μ μμ
4. Provider μμ μ»΄ν¬λνΈλ€μ μ§ν΅μΌλ‘ dataλ₯Ό μ λ¬λ°μ

**=> Props Drilling λ¬Έμ  ν΄κ²°**

![image-20230305234729208](images/image-20230305234729208.png)

### μ¬μ© λ°©λ²

**App.js**

```js
// Context μμ±
const MyContext = React.createContext(defaultValue)

// Context Providerλ₯Ό ν΅ν λ°μ΄ν° κ³΅κΈ
<MyContext.Provider value={μ μ­μΌλ‘ μ λ¬νκ³ μνλ κ°}>
	{/*μ΄ Contextμμ μμΉν  μμ μ»΄ν¬λνΈλ€*/}
</MyContext.Provider>
```

**μμ component.js**

```js
import { DiaryStateContext } from "./App";

const value = useContext(MyContext);
```

### λ¬Έμ μ 

- stateλ³ν ν¨μλ€μ valueμ κ·Έλ₯ μ λ¬ν΄μ£Όλ©΄ λ  κ² κ°μ§λ§ Contextλ componentμ΄κΈ° λλ¬Έμ **propμ΄ λ°λκ² λλ©΄ rerenderingλλ€. νμ μμλ€λ ν¨κ» rerenderingλ¨**
  - μ΅μ νκ° λ€ νλ¦¬κ² λ¨

### ν΄κ²°λ°©λ² : Contextλ₯Ό μ€μ²©μΌλ‘ μ¬μ©νλ€

1. state Providerμ dispatch Providerλ₯Ό λ°λ‘ λμ΄ μ€μ²©μΌλ‘ μ¬μ©ν΄μ€λ€

2. DiaryStateContextμ Providerμ propsμΈ dataκ° λ³κ²½λ  λλ§λ€ rerenderingμ§νλλ€.

3. DiaryDispatchContextλ₯Ό μ€μ²©μΌλ‘ λμ΄ onCreate, onRemove, onEditμ λ°λ‘ μ λ¬ν΄μ€λ€
4. dataμ dispatchλ₯Ό λ°λ‘ μ λ¬νμ¬ Providerλ₯Ό μ€μ²©μΌλ‘ λκ² λ  κ²½μ° dataκ° λ³κ²½λμ΄λ onCreate, onRemove, onEditμ λν νμ Providerμλ λ³λμ΄ μμ΄ μ΅μ νλ₯Ό μ μ§ν  μ μλ€

```
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// useMemoμ¬μ©
const memoizedDispatches = useMemo(() => {
	return {onCreate, onRemove, onEdit}
}, [])

return(
<DiaryStateContext.Provider value={data}>
    {/* dispatch Provider */}
    <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
            <DiaryEditor />
            <div>μ μ²΄μΌκΈ° : {data.length}</div>
            <div>κΈ°λΆ μ’μ μΌκΈ° κ°μ : {goodCount}</div>
            <div>κΈ°λΆ λμ μΌκΈ° κ°μ : {badCount}</div>
            <div>κΈ°λΆ μ’μ μΌκΈ° λΉμ¨ : {goodRatio}</div>
            <DiaryList/>
        </div>
    </DiaryDispatchContext.Provider>
</DiaryStateContext.Provider>
)
```

### μλ¬Έμ  : Context APIμ Reduxμ μ°¨μ΄μ μ?

https://sewonzzang.tistory.com/53μ κΈμ μ°Έκ³ νμ¬ κ°λ¨νκ² μ λ¦¬ν΄λ΄€μ΅λλ€

1. λ―Έλ€μ¨μ΄
   - λ¦¬λμ€λ‘ μνκ΄λ¦¬ μ λ¦¬λμ ν¨μλ₯Ό μ¬μ©νλ€
   - λ¦¬λμ€μ λ―Έλ€μ¨μ΄λ₯Ό μ¬μ©νλ©΄ μ‘μ κ°μ²΄κ° λ¦¬λμμμ μ²λ¦¬λκΈ° μ μ μ°λ¦¬κ° μνλ μμμ μνν  μ μλ€
   - λ―Έλ€μ¨μ΄λ μ£Όλ‘ λΉλ©κΈ° μμ μ²λ¦¬μ λ§μ΄ μ¬μ©λλ€
2. Hooks
   - Context APIλ₯Ό μ¬μ©ν  λ μ»€μ€ν Hookμ λ§λ€μ΄ μ¬μ©ν΄μΌνλλ° λ¦¬λμ€μλ μ¬λ¬ κΈ°λ₯μ΄ μ‘΄μ¬νλ€
   - connect ν¨μ μ¬μ©νλ©΄ useSelector, useDispatch, useStoreκ°μ Hooksλ₯Ό μ¬μ©νλ©΄ μ½κ² μν μ‘°ν, μ‘μμ λμ€ν¨μΉ ν  μ μλ€
   - connectν¨μμ useSelectorν¨μλ₯Ό μ¬μ©νλ©΄ μ€μ  μνκ° λ°λ λλ§ μ»΄ν¬λνΈκ° λ¦¬λλλ§λ¨
   - λ°λ©΄ Contextλ Contextκ° μ§λκ³  μλ μνκ° λ°λλ©΄ ν΄λΉ Contextμ Providerλ΄λΆ μ»΄ν¬λνΈλ€μ΄ λͺ¨λ λ¦¬λ λλ§ λλ€
3. μν
   - Contextμ¬μ©ν΄μ κΈλ‘λ² μνλ₯Ό κ΄λ¦¬ν  λ κΈ°λ₯λ³λ‘ Contextλ₯Ό λ§λ€μ΄ μ¬μ©νλ€
   - λ¦¬λμ€λ λͺ¨λ  κΈλ‘λ² μνλ₯Ό νλμ μ»€λ€λ μν κ°μ²΄μ λ£μ΄ μ¬μ©νμ¬ κ°νΈνλ€

=> Vueμ Vuexμ EventBusκ°μ λλμ΄λ€
