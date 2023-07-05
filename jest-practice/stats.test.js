const stats = require('./stats')

describe('stats', () => {
    it('최댓값 찾기', () => {
        expect(stats.max([1, 2, 3, 4])).toBe(4);
    })

    it('최솟값 찾기', () => {
        expect(stats.min([1, 2, 3, 4])).toBe(1)
    })

    it('평균값 찾기', () => {
        expect(stats.avg([1, 2, 3, 4, 5])).toBe(3)
    })

    // toEqual : 객체 또는 배열을 비교할 때 사용
    describe('median', () => {
        it('정렬하기', () => {
            expect(stats.sort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5])
        })
        it('홀수 길이의 중앙값', () => {
            expect(stats.median([1, 2, 3, 4, 5])).toBe(3)
        })
        it('짝수 길이의 중앙값', () => {
            expect(stats.median([1, 2, 3, 4, 5, 6])).toBe(3.5)
        }) 
    })
})