import DiaryEditor from "../components/DiaryEditor"
import { useEffect } from "react";

const New = () => {

    // mount되었을 때 타이틀 변경
    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `옒의 감정일기장 - 일기작성`
    },[])

    return <div>
        <DiaryEditor/>

    </div>
}

export default New