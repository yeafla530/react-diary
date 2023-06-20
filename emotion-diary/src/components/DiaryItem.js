import MyButton from "./MyButton";
import {useNavigate} from "react-router"


const DiaryItem = ({id, emotion, contents, date}) => {
    const navigate = useNavigate()
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    
    const goDetail = () => {
        navigate(`/diary/${id}`)
    }

    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    // ms rlwnsdmfh; 
    const strDate = new Date(parseInt(date)).toLocaleDateString()

    return <div className="DiaryItem">
        <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")} onClick={goDetail}>
            {/* public 폴더 경로 */}
            <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="" />
        </div>
        <div className="info_wrapper" onClick={goDetail}>
            <div className="diary_date">{strDate}</div>
            <div className="diary_content_preview">
                {contents.slice(0, 25)}
            </div>
        </div>
        <div className="btn_wrapper">
            <MyButton text={"수정하기"} onClick={goEdit}/>
        </div>
    </div>
}

export default DiaryItem