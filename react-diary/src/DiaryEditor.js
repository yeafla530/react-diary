import React, {useContext, useRef, useState} from 'react';
import { DiaryDispatchContext } from './App';

// onCreate App Component가 변경될 때마다 렌더링됨
const DiaryEditor = () => {

    // 비구조화할당으로 받기
    const {onCreate} = useContext(DiaryDispatchContext)

    const authorInput = useRef()
    const contentInput = useRef()

    const [state, setState] = useState({
        author: "",
        contents: "",
        emotion: 1,
    })

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        // console.log(state)
        if (state.author.length < 1) {
            // alert("작성자는 최소 1글자 이상 입력해주세요")
            // focus
            authorInput.current.focus();
            return
        }

        if (state.contents.length < 5) {
            // alert("일기 본문은 최소 5글자 이상 입력해주세요")
            // focus
            contentInput.current.focus();
            return
        }

        onCreate(state.author, state.contents, state.emotion);
        alert('저장 성공')
        setState({
            author: "",
            contents: "",
            emotion: 1
        })
    }


    return <div className="DiaryEditor">
        <h2>일기장</h2>
        {/* 변화가 일어났을 때 setAuthor */}
        <div>
            <input ref={authorInput} name="author"type="text" value={state.author} onChange={handleChangeState}/>
        </div>
        <div>
            <textarea ref={contentInput} name="contents" value={state.contents} onChange={handleChangeState}/>
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

export default React.memo(DiaryEditor);