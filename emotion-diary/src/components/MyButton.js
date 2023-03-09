const MyButton = ({text, type, onClick}) => {
    // 없는 type이 들어오게 될 경우 default로 전달
    const btntype = ['positive', 'nagative'].includes(type) ? type : 'default'
    
    return (
        <button className={["MyButton", `Mybutton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    )

}
MyButton.defaultProps = {
    type: "default",
}
export default MyButton