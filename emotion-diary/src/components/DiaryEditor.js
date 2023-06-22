import { useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';

import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';

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
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: '좋음'
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: '그럭저럭'
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: '나쁨'
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
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
    // 자동 포커싱
    const contentRef = useRef()
    const [content, setContent] = useState("");
    // 어떤 감정을 선택했는지
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()))

    // 감정을 클릭하면 바뀔 수 있도록
    const handleClickEmote = (emotion) => {
        setEmotion(emotion)
    }

    // 작성완료
    
    // 1. DiaryDispatchContext를 받아온다 (App.js에서)
    // 2. Context매개변수인 onCreate를 받아온다
    const {onCreate} = useContext(DiaryDispatchContext)
    
    
    // App.js의 onCreate작동
    const handleSubmit = () => {
        if (emotion.length < 1) {
            contentRef.current.focus();
            alert("일기 내용을 작성해주세요!")
            return 
        }

        // 작성 함수 실행
        onCreate(date, content, emotion)
        // 작성완료 후 뒤로가기로 작성페이지 오지 못하도록 막음
        navigate('/', {replace:true})
    }

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
                        {emotionList.map((it)=>(
                            <EmotionItem 
                                key={it.emotion_id} {...it} 
                                onClick={handleClickEmote} 
                                isSelected={it.emotion_id === emotion}/>
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                            placeholder="오늘은 어땠나요?" 
                            ref={contentRef} 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={()=>navigate(-1)}/>
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor