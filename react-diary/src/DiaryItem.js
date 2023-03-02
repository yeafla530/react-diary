import {useState, useRef} from 'react'

const DiaryItem = ({onRemove, onEdit, author, contents, emotion, created_date, id}) => {
    
    const [isEdit, setIsEdit] = useState(false)
    const toggleIsEdit = () => setIsEdit(!isEdit)

    // textarea의 input을 핸들링할 state => 기본값 contents로
    const [localContent, setLocalContent] = useState(contents)
    const localContentInput = useRef()

    const handleRemove = () => { 
        if (window.confirm(`${id+1}번째 일기를 정말 삭제하겠습니다?`)) {
            onRemove(id)
        }
    }
    
    // 수정 취소
    const handleQuitEdit = () => {
        setLocalContent(contents);
        setIsEdit(false);
        if (localContent.length < 5) {
            localContentInput.current.focus()
            return;
        }
    }

    const handleEdit = () => {
        if (localContent.length < 5) {
            localContentInput.current.focus()
            return;
        }
        if (window.confirm(`${id+1}번째 일기를 수정하시겠습니까`)) {
            onEdit(id, localContent)
            toggleIsEdit()
        }
        
    }
    
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수 : {emotion}</span>
                <br />
                <span className="date">작성시간: {new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">
                {isEdit ? (
                <>
                    <textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/>
                </>
                ) : (<>{contents}</>)}
            </div>
            {isEdit ? <>
                <button onClick={handleQuitEdit}>수정취소</button>
                <button onClick={handleEdit}>수정완료</button>
            </> : 
            <>
                <button onClick={toggleIsEdit}>수정하기</button>
                <button onClick={handleRemove}>삭제하기</button>
            </>}
            
        </div>
    )
}

export default DiaryItem;