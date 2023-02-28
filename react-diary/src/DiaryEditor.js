import {useState} from 'react';

const DiaryEditor = () => {

    const [state, setState] = useState({
        author: "",
        contents: "",
        emotion: 1,
    })

    const handleChangeState = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        console.log(state)
        alert('저장 성공')
    }

    // const [author, setAuthor] = useState("")
    // const [contents, setContents] = useState("") 

    return <div className="DiaryEditor">
        <h2>일기장</h2>
        {/* 변화가 일어났을 때 setAuthor */}
        <div>
            <input name="author"type="text" value={state.author} onChange={handleChangeState}/>
        </div>
        <div>
            <textarea name="contents" value={state.contents} onChange={handleChangeState}/>
        </div>
        <div>
            <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
        <div><button onClick={handleSubmit}>일기 저장하기</button></div>
    </div>
}

export default DiaryEditor