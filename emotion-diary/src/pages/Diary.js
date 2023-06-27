import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import {DiaryStateContext} from "../App"
import { getStringDate } from '../util/date'
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton'
import { emotionList } from '../util/emotion';

const Diary = () => {
    // 상세페이지 :id값 전달됨
    const {id} = useParams() // path variable
    const diaryList = useContext(DiaryStateContext)
    const navigate = useNavigate();
    const [data, setData] = useState();

    // mount되었을 때 타이틀 변경
    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `옒의 감정일기장 - ${id}번 일기`
    },[])

    useEffect(()=>{
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
            console.log(targetDiary)

            if (targetDiary) {
                // 일기가 존재할 때
                setData(targetDiary)
            } else {
                // 일기가 없을 때
                alert("없는 일기입니다")
                navigate('/', {replace:true})
            }
        }


    },[id, diaryList])

    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>  
    } else {

        const curEmotionData = emotionList.find((it)=>parseInt(it.emotion_id) === parseInt(data.emotion) )
        console.log(curEmotionData)
        return (
            <div className="DiaryPage">
                <MyHeader headText={`${getStringDate(new Date(data.date))} 기록`} 
                leftChild={
                    <MyButton text={"<뒤로가기"} onClick={() => navigate(-1)}/>
                }
                rightChild={
                    <MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)}/>
                }
                />

                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionData.emotion_img} alt="" />
                            <div className='emotion_descript'>
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className='diary_content_wrapper'>
                            <p>{data.contents}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }


}

export default Diary