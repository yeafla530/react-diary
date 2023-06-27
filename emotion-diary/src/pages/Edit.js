import {useState, useContext, useEffect} from "react"
import {useNavigate, useParams } from "react-router-dom"
import { DiaryStateContext } from "../App"
import DiaryEditor from "../components/DiaryEditor"

const Edit = () => {

    const [originData, setOriginData] = useState()
    const navigate = useNavigate()
    const {id} = useParams();

    const diaryList = useContext(DiaryStateContext)
    // console.log(diaryList)

    // mount되었을 때 타이틀 변경
    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `옒의 감정일기장 - ${id}번 수정`
    },[])

    // Edit component Mount됐을때 실행
    // id나 diaryList가 변화하면 꺼내온다
    useEffect(()=>{
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it)=> parseInt(it.id) === parseInt(id))
            console.log(targetDiary)
            
            // undefineded일때 
            if (!targetDiary) { 
                navigate('/', {replace:true})
            } else {
                setOriginData(targetDiary)
            }
        }
    }, [id, diaryList])
    return (
        <div>
           {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    )
}

export default Edit