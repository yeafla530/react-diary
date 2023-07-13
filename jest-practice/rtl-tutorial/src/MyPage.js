export default function MyPage() {
    return (
        <div>
            <div>
                <h1>안녕</h1>
                <h2>world</h2>
            </div>
            <div>
                <label htmlFor="username">이름</label>
                <input type="text" id="username" value="Tom" readOnly/>
            </div>
            {/* 의미없는요소 */}
            <div data-testid="my-div"/>
            <div>
                <label htmlFor="profile">자기소개</label>
                <textarea id="profile"/>
            </div>
        </div>
    )
}