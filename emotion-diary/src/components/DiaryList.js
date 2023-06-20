import {useState} from "react"

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된순"},

]
// 정렬기능
// onChange : select가 변화했을 때 바꿀 기능을 하는 함수
// optionList : select tag에 들어가는 옵션
const ControlMenu = ({value, onChange, optionList})=>{
    return <select value={value} onChange={(e)=>onChange(e.target.value)}>
        {optionList.map((it, idx)=><option key={idx} value={it.value}>{it.name}</option>)}
    </select>
}

const DiaryList = ({diaryList})=> {

    const [sortType, setSortType] = useState('latest');

    // DiaryList정렬된 리스트 반환하는 함수
    const getProcessDiaryList = () => {
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
        const sortedList = copyList.sort(compare)
        return sortedList;
    }


    return <div>
        <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
        {getProcessDiaryList().map((it)=>(
            <div key={it.id}>{it.contents}</div>
        ))}
    </div>
}

DiaryList.defaultProps = {
    diaryList: [],
}
export default DiaryList