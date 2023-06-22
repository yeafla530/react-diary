import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import MyHeader from './MyHeader';
import MyButton from './MyButton';

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '완전 좋음'
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '좋음'
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '그럭저럭'
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '나쁨'
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '끔찍함'
    },
]


const getStringDate = (date) => {
    // ISO형식의 문자를 반환
    // YYYY-MM-DDHH:mm:ss.sssZ
    // 지역별 오차 발생 => 다른 방법으로 
    // return date.toISOString().slice(0, 10)

    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = `0${month}`
    } 
    if (day < 10) {
        day = `0${day}`
    }
    return `${year}-${month}-${day}`


}


const DiaryEditor = () => {
    const navigate = useNavigate()
    
    const [date, setDate] = useState(getStringDate(new Date()))
    console.log("getStringDate", getStringDate(new Date()))

    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={"새 일기쓰기"} 
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}/>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className="input_date" value={date} onChange={(e) => setDate(e.target.value)} type="date"/>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="inpu_box emotion_list_wrapper">
                        {emotionList.map((it)=><div key={it.emotion_id}>{it.emotion_descript}</div>)}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor