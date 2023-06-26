import { useNavigate } from 'react-router-dom';
import { useState, useRef, useContext, useEffect } from 'react';

import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';

import {getStringDate} from "../util/date"
import { emotionList } from '../util/emotion';





const DiaryEditor = ({isEdit, originData}) => {
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
    const {onCreate, onEdit} = useContext(DiaryDispatchContext)
    
    
    // App.js의 onCreate작동
    const handleSubmit = () => {
        if (emotion.length < 1) {
            contentRef.current.focus();
            alert("일기 내용을 작성해주세요!")
            return 
        }

        if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "일기를 추가하시겠습니까?")) {
            if (!isEdit) {
                // 일기 생성
                onCreate(date, content, emotion)
            } else {
                // 일기 수정
                onEdit(originData.id, date, content, emotion)
            }
        }


        // 작성완료 후 뒤로가기로 작성페이지 오지 못하도록 막음
        navigate('/', {replace:true})
    }

    useEffect(()=>{
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion)
            setContent(originData.content)
        }

    }, [isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"} 
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