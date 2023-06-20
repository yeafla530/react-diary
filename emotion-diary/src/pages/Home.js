import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import MyHeader from '../components/MyHeader'
import MyButton from './../components/MyButton';
import DiaryList from './../components/DiaryList'

const Home = () => {
    const diaryList = useContext(DiaryStateContext)

    const [data, setData] = useState([])
    const [curDate, setCurDate] = useState(new Date())    
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`
   
    useEffect(()=>{
        if (diaryList.length >= 1) {

        
            // 해당 월의 1일이 됨
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            // 오늘 월의 마지막 날 (30/31/28일)
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth()+1,
                0
            ).getTime()

            // 바뀐 년월에 따라 리스트 불러오기
            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
        }


    },[diaryList, curDate]) // diaryList를 넣어주어야 일기 생성, 수정, 삭제시 다이어리 리스트도 변경됨

    useEffect(()=>{
        console.log(data)
    },[data])
   
   
   
    // 한달씩 미래로
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
    }
    // 한달씩 과거로
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
    }

    return (
        <div>
            <MyHeader 
            headText={headText} 
            leftChild={<MyButton text={'<'} onClick={decreaseMonth}/>} 
            rightChild={<MyButton text={'>'} onClick={increaseMonth}/>}/>

            <DiaryList diaryList={data}/>
        </div>
    )
}

export default Home