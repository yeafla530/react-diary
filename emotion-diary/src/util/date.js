export const getStringDate = (date) => {
    // ISO형식의 문자를 반환
    // YYYY-MM-DDHH:mm:ss.sssZ
    // 지역별 오차 발생 => 다른 방법으로 
    // return date.toISOString().slice(0, 10)

    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = `0${month}`
    } 
    if (day < 10) {
        day = `0${day}`
    }
    return `${year}-${month}-${day}`


}