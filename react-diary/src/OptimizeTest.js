import React, {useState, useEffect} from 'react'

const CounterA = React.memo(({count}) => {

    useEffect(() => {
        console.log(`Counter A Update: ${count}`)
    })
    return <div>{count}</div>
})

const CounterB = ({obj}) => {
    // 객체는 얕은 비교 > 주소를 비교
    useEffect(() => {
        console.log(`Counter B Update: ${obj.count}`)
    })

    return <div>{obj.count}</div>
}

const areEqual = (prevProps, nextProps) => {
    // if (prevProps.obj.count === nextProps.obj.count) {
    //     return true // 이전 프롭스 현재 프롭스가 같다 => 리렌더를 일으키지 않음
    // }
    // return false // rerender를 일으켜라

    return prevProps.obj.count === nextProps.obj.count
}

const MemoizedCounterB = React.memo(CounterB, areEqual)

const OptimizeTest = () => {

    const [count, setCount] = useState(1)
    const [obj, setObj] = useState({
        count: 1,
    })

    return <div style={{padding: 50}}>
        <div>
            <h2>counter A</h2>
            <CounterA count={count}/>    
            {/* 상태가 바뀌진 않음 */}
            <button onClick={() => setCount(count)}>A Button</button>
        </div>
        <div>
            <h2>Counter B</h2>
            <MemoizedCounterB obj={obj}/>
            {/* count가 변경되지 않았는데 rerender됨 */}
            <button onClick={()=>setObj({
                count: obj.count
            })}>B button</button>
        </div>
    </div>
}

export default OptimizeTest