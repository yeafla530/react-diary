import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router"
import MyButton from "./MyButton"
import DiaryItem from "./DiaryItem"

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된순"},

]

const selectEmotionList = [
    {value: "all", name:"모든 감정"},
    {value: "good", name:"좋은 감정만"},
    {value: "bad", name:"안좋은 감정만"},

]


// 정렬기능
// onChange : select가 변화했을 때 바꿀 기능을 하는 함수
// optionList : select tag에 들어가는 옵션

// 최적화 1. 날짜가 넘어갈때마다 controlMenu도 같이 렌더링됨
// React.memo를 통해 고착 컴포넌트로 만든다
const ControlMenu = React.memo(({value, onChange, optionList})=>{
    useEffect(()=>{
        console.log("Control Menu")
    })
    return <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
        {optionList.map((it, idx)=><option key={idx} value={it.value}>{it.name}</option>)}
    </select>
})


const DiaryList = ({diaryList})=> {
    const navigate = useNavigate();
    // set함수는 자체만으로 useCallback처리가됨
    // 그래서 ControlMenu에 setSortType정의시 React.memo작동
    // 아래처럼 handle함수를 따로 만들어 적용하면 React.memo 작동 안함
    const [sortType, setSortType] = useState('latest');
    const [emotionType, setEmotionType] = useState('all');

    // 이처럼 사용하기 위해서는 useCallback까지 적용해주어야함
    // const handleSetSortType = (sortType) => {
    //     setSortType(sortType)
    // }


    // DiaryList정렬된 리스트 반환하는 함수
    const getProcessDiaryList = () => {
        // 감정을 필터링해주는 함수
        const filterCallBack = (item)=>{
            if (emotionType === 'good') {
                return parseInt(item.emotion) <= 3
            } else {
                return parseInt(item.emotion) > 3
            }
        }
        // 최신순, 오래된순 정렬해주는 함수
        const compare = (a, b) => {
            // 최신순 정렬
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date)
            } else {
                return parseInt(a.date) - parseInt(b.date)
            }
        }

        // diaryList를 JSON화 시켜서 문자로 바꾸고 다시 JSON화 시켜줌
        const copyList = JSON.parse(JSON.stringify(diaryList))
        const filterredList = emotionType === 'all' ? copyList : copyList.filter((it)=>filterCallBack(it))
        const sortedList = filterredList.sort(compare)
        return sortedList;
    }




    return <div className="DiaryList">
        <div className="menu_wrapper">
            <div className="left_col">
                <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
                <ControlMenu value={emotionType} onChange={setEmotionType} optionList={selectEmotionList}/>

            </div>
            <div className="right_col">
                <MyButton type={'positive'} text="새 일기 쓰기" onClick={()=>navigate('/new')}/>
            </div>

        </div>
        
        {getProcessDiaryList().map((it)=>(
            <DiaryItem key={it.id} {...it}/>
        ))}
    </div>
}

DiaryList.defaultProps = {
    diaryList: [],
}
export default DiaryList