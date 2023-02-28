const DiaryItem = ({author, contents, emotion, created_date, id}) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수 : {emotion}</span>
                <br />
                <span className="date">작성시간: {new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">{contents}</div>
        </div>
    )
}

export default DiaryItem;