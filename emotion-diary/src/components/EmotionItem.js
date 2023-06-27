import React from "react"

// 함수 : onClick이 들어가기 때문에 useMemo가 적용되지 않음 
// useState를 통해서 전달한 상태함수가 아니거나 useCallback으로 묶어놓은 함수 아니라면
// 컴포넌트 렌더링될때 다시 생성돼서 memo에 강화된 컴포넌트에도 다시 생성시킴 
// DiaryEditor > 함수 useCallback적용
const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClick, isSelected}) => {
    return (
        <div onClick={()=> onClick(emotion_id)} className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(" ")}>
            <img src={emotion_img} alt="" />
            <span>{emotion_descript}</span>
        </div>
    )
}

export default React.memo(EmotionItem)