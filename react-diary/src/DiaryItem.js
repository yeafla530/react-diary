const DiaryItem = ({onDelete, author, contents, emotion, created_date, id}) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수 : {emotion}</span>
                <br />
                <span className="date">작성시간: {new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">{contents}</div>
            <button onClick={() => { 
                console.log(id)
                if (window.confirm(`${id+1}번째 일기를 정말 삭제하겠습니다?`)) {
                    onDelete(id)
                }
            }}>삭제하기</button>
        </div>
    )
}

export default DiaryItem;