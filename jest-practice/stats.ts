// export const max = (numbers: number[]): number => {
//     let result = numbers[0]

//     numbers.forEach((n: number) => {
//         if (n > result) {
//             result = n
//         }
//     })

//     return result
// }


// 최대값 구하기 리팩토링
export const max = (numbers: number[]): number => Math.max(...numbers)

export const min = (numbers: number[]): number => Math.min(...numbers)

export const avg = (numbers: number[]): number => {
    return numbers.reduce((acc:number, cur: number, index: number, {length}) => acc + cur / length, 0) 
}

export const sort = (numbers: number[]): number[] => {
    return numbers.sort((a, b) => a - b)
}

export const median = (numbers: number[]): number => {
    const {length} = numbers
    const middle = Math.floor(length / 2)
    return length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2
}