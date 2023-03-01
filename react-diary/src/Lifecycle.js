import React, {useEffect, useState} from 'react'

const Lifecycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("")

    // mount (탄생)
    useEffect(()=>{
        console.log("mount!");
    }, [])

    // update (변화)
    useEffect(()=>{
        console.log("update!")
    })

    // count 변화
    useEffect(()=>{
        console.log(`count is update: ${count}`)
        if (count > 5) {
            alert("count가 5를 넘었습니다 따라서 1로 초기화 됩니다")
            setCount(1)
        }
    },[count])

    // text변화
    useEffect(()=> {
        console.log(`text is update: ${text}`)
    },[text])

    return <div style={{padding: 20}}>
        <div>
            {count}
            <button onClick={() => setCount(count+1)}>+</button>
        </div>
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
    </div>
}

export default Lifecycle