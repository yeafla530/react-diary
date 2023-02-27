// component자체도 props로 전달 가능
const OddEvenResult = ({count}) => {
    // count변화가 없어도 자식요소가 rerender된다
    // console.log('render')
    return <>{count % 2 === 0 ? "짝수" : "홀수"}</>
}


export default OddEvenResult