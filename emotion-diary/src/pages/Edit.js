import {useNavigate, useSearchParams} from "react-router-dom"

const Edit = () => {
    const navigate = useNavigate()
    // 실시간으로 query string을 바꿀수 있는 상태변화 함수도 제공
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id')

    const mode = searchParams.get('mode')
    console.log(id)
    console.log(mode)

    return (
        <div>
            <h1>Edit</h1>
            <p>이곳은 일기 수정 페이지입니다</p>
            <button onClick={()=>setSearchParams({who:"winterlood"})}>QS 바꾸기</button>
            {/* 로그인 안된 사용자가 홈으로 가려할 때, 로그인 체크하여 강제로 로그인페이지로 보내버릴 수 있음 */}
            {/* 링크 태그를 클릭안했을 때도 의도적으로 페이지를 바꿀 수 있다 */}
            <button onClick={()=>{
                navigate('/')
            }}>HOME으로 가기</button>
            <button onClick={()=>{
                navigate(-1)
            }}>뒤로가기</button>
        </div>
    )
}

export default Edit