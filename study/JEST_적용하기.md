# JEST 적용하기



## ✅ Get Start

* install

```bash
-- jest 설치
npm install --save-dev jest

-- babel 관련 모듈 설치
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react

-- .ts,.tsx 파일을 트랜스파일 해주는 babel plugin
npm install --save-dev @babel/preset-typescript
```

* babel.config.js

```
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
```

* **typeChecking 기능 관련 모듈 설치**
  * `ts-jest`를 이용하여 typeChecking 기능을 사용하려면 jest configuration를 정의해주어야 한다.

```
npm install --save-dev ts-jest
```

* **Jest 관련 Type 정의 모듈 설치**

```
-- test 파일에서 사용되는 jest 관련 Type이 정의되어있다
npm install --save-dev @types/jest

-- 스냅샷 테스트를 도와주는 react-test-renderer 
npm install --save-dev react-test-renderer

-- jest-environment-jsdom
npm install --save-dev jest-environment-jsdom
```

* Jest's configuration 정의하기
  * React 에서 진행되는 Test 는 Node환경이 아닌 브라우저 환경에서도 Test 할 수 있어야 한다. 따라서 `package.json` 안에 `jest:{}` 필드를 삽입하거나, `jest.config.js`를 만들어서 테스트 환경을 `Node`로 할것인지 `jsdom`으로 할것인지 정의해야한다.

```json
{
  ...
  "devDependencies": {
    ...
  },
  "dependencies": {
    ...
  },
  "jest" : {                    // 이 부분
    "testEnvironment": "jsdom"  // Default : "node"
  }                             //
}
```

* test scripts 정의

```json
// package.json
{
    "scripts" : {                    
        "test": "jest --watchAll --verbose"
	}
}
```

* @testing-library/react 설치

```
npm install --save-dev @testing-library/react
```

* download vscode "Jest" extension 



#### 설치 요약

```
npm install --save-dev jest babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript ts-jest @types/jest react-test-renderer jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```





## ✅ jest 기본 개념

### 기본 구조

`sum.js`

```js
function sum(a, b) {
  return a + b;
}

module.exports = sum; // 내보내기
```



`sum.test.js`

* test: 새로운 테스트 케이스 만드는 함수
* expect : 특정 값이 ~~일 것이다 사전에 정의 하고 통과하면 테스트 성공시키고 통과하지 않으면 테스트 실패시킴
* toBe : matchers라고 부르는 함수, 

```js
const sum = require('./sum');

test('1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```



`실행결과`

```bash
$ npm test

> test
> jest

 PASS  ./sum.test.js
  √ 1+2=3 (20 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.555 s
Ran all test suites.
```



### test 대신 it

test대신 it라는 키워드를 사용하게 되면 테스트케이스 설명을 영어로 작성하게 되는 경우 "말이 되게" 작성할 수 있다.

한국어로 작성하는것도 가능하다

```js
const sum = require('./sum')

// test('1+2=3', () => {
//     expect(sum(1, 2)).toBe(3)
// })

it('calculates 1 + 2', () => {
    expect(sum(1, 2)).toBe(3)
})

```



### describe

> 여러개의 테스트케이스를 묶을수 있음

`sum.js`

```
function sum(a, b) {
    return a + b
}

function sumOf(numbers) {
    let result = 0
    numbers.forEach(n => {
        result += n
    })
    return result
}

// 각각 내보내기
exports.sum = sum
exports.sumOf = sumOf
```



`sum.test.js`

```
const {sum, sumOf} = require('./sum')

describe('sum', ()=> {
	it('calc 1 + 2', () => {
		expect(sum(1, 2)).toBe(3)
	})
	
	it('calc all numbers', () => {
		let array = [1, 2, 3, 4, 5]
		expect(sumOf(array)).toBe(15)
	})
})
```



## ✅TDD

> Test Driven Development : 테스트 주도 개발

<img src="images/wcbaeLC.png" alt="img" style="zoom: 25%;" />

* 선 테스트코드 작성 후 구현



### 실패

* 첫번째 절차
* 프로젝트의 전체 기능에 대해 처음부터 모든 테스트케이스를 만드는 것이 아니라, 지금 가장 먼저 구현할 기능 하나씩 테스트 케이스를 작성한다
* 상황에 따라서 한꺼번에 여러 테스트케이스를 먼저 작성하기도함



### 성공

* 우리가 작성하는 실패하는 테스트케이스를 통과시키기 위해 코드를 작성해 테스트 통과시키기



### 리팩토링

* 우리가 구현한 코드에 중복되는 코드가 있거나 더 개선시킬 방법이 있다면 리팩토링 진행
* 리팩토링 진행하고 나서도 TC가 성공하는지 확인
* 절차가 끝나면 다시 처음 절차로 돌아가서 실패하는 TC를 작성



### 장점

1. 테스트 케이스를 작성할 때 주로 작은 단위로 만들기 때문에 코드 작성할 때 코드가 방대해지지 않고 코드의 모듈화가 자연스럽게 이루어면서 개발이 진행됨
2. 테스트 커버리지가 높아짐 => 리팩토링도 쉬워지고 유지보수도 쉬워짐 => 프로젝트의 퀄리티가 높아짐
3. 협업에도 도움이됨
4. 버그에 낭비하는 시간도 최소한으로 할 수 있으며 구현한 기능이 요구사항을 충족하는지 쉽게 확인 가능



## 예시

`stats.ts`

```ts
// 최대값
export const max = (numbers: number[]): number => Math.max(...numbers)
// 최소값
export const min = (numbers: number[]): number => Math.min(...numbers)
// 평균값
export const avg = (numbers: number[]): number => {
    return numbers.reduce((acc:number, cur: number, index: number, {length}) => acc + cur / length, 0) 
}
// 정렬
export const sort = (numbers: number[]): number[] => {
    return numbers.sort((a, b) => a - b)
}
// 중앙값
export const median = (numbers: number[]): number => {
    const {length} = numbers
    const middle = Math.floor(length / 2)
    return length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2
}
```



`stats.test.js`

```js
const stats = require('./stats')
//test
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
```



## ✅ react-test-library

### 🔴 특징

1. 렌더링 결과에 집중
2. 실제 DOM에 대해 신경을 많이 쓰고 컴포넌트의 인스턴스에 대해 신경쓰지 않고, 실제 화면에 무엇이 보여지는지, 어떤 이벤트가 발생했을 때 화면에 원하는 변화가 생겼는지 이런것을 확인하기에 더 최적화 되어 있음
3. jest-dom을 이용해 DOM에 관련된 `matcher`를 추가해줌
4. react 공식문서에서도 추천하는 testing방법
5. react-test-library 모듈이 @testing-library/react로 옮겨짐



### 🔴 react 폴더 생성

```
-- create react app 
npx create-react-app rtl-tutorial
npm install @testing-library/any-framework
```



### 🔴 기본 문법: 찾기

#### getBy : 하나의 요소만 가져올 수 있다

* getByText(): text로 가져오기

  * `/로그인 해주세요/` : 일부 text만 작성가능
  * `"로그인 해주세요"` : `""`로 작성할 경우 일부 text만 적으면 찾지 못함

  ```js
  test("제목이 있다", () => {
      render(<MyPage />)
      const titleEl = screen.getByText("안녕")
      expect(titleEl).toBeInTheDocument()
  })
  ```

  

* getByRole(): HTML 요소로 가져오기

  > 요소가 여러개일때는 못가져옴 
  >
  > level을 통해 몇번째 인자를 가져올지 설정가능

  * h1 ~ h6 : heading
  * button: button
  * input, textarea : textbox
  * a : link
  * checkbox: checkbox
  * radio: radio
  * select: combobox

  ```jsx
  export default function MyPage() {
      return (
          <div>
              <div>
                  <h1>안녕</h1>
                  <h2>world</h2>
              </div>
              <div>
                  <label htmlFor="username">이름</label>
                  <input type="text" id="username"/>
              </div>
              <div>
                  <label htmlFor="profile">자기소개</label>
                  <textarea id="profile"/>
              </div>
          </div>
      )
  }
  ```

  ```js
  import {render, screen} from "@test-library/react"
  import MyPage from "./MyPage"
  
  // 요소가 여러개일 때 level을 통해 하나의 요소만 정함 
  test("제목이 있다", () => {
      render(<MyPage />)
      // getByRole : heading이 여러개면 못가져옴
      // level: heading요소중 첫번째것 (h1)
      const titleEl = screen.getByRole("heading", {
          level: 1,
      })
      expect(titleEl).toBeInTheDocument()
  })
  
  
  // textbox가 여러개일 경우 label의 name을 통해 하나의 요소만 찾아낸다
  test("input요소가 있다", () => {
      render(<MyPage/>)
      const inputEl = screen.getByRole("textbox", {
          name: "자기소개",
      })
      expect(inputEl).toBeInTheDocument();
  })
  ```

  

* getByAltText(): 이미지의 alt text가져오기

  ```js
  test("로고 이미지가 잘 나온다", () => {
  	render(<App/>)
  	const logoEl = screen.getByAltText("logo")
  	expect(logoEl).toBeInTheDocument()
  })
  ```

  

* getByLabelText(): label의 text를 이용해 textbox를 찾아준다

  ```jsx
   <div>
       <label htmlFor="profile">자기소개</label>
       <textarea id="profile"/>
   </div>
  ```

  ```js
  test("input요소가 있다", () => {
      render(<MyPage/>)
  	// label의 textbox를 찾아줌
  	// 자기소개 label이 여러개일 때, selector를 이용해 textarea인지 input인지 설정가능
  	// readOnly가 아닐 경우 onChange를 넣어야 에러가 나지 않음
  	const inputEl = screen.getByLabelText("자기소개", {
  		selector: "textarea"
  	})
      expect(inputEl).toBeInTheDocument();
  })
  ```



* getByDisplayValue() : textbox의 value를 찾아줌

  ```jsx
  <div>
      <label htmlFor="username">이름</label>
      <input type="text" id="username" value="Tom" readOnly/>
  </div>
  ```

  ```js
  test("getByDisplayValue로 요소찾기", () => {
      render(<MyPage/>)
      const inputEl = screen.getByDisplayValue("Tom")
      expect(inputEl).toBeInTheDocument();
  })
  ```



* getByTextId(): 요소안의 data-testid의 값으로 찾아줌

  ```jsx
  {/* 의미없는요소 */}
  <div data-testid="my-div"/>
  ```

  ```js
  // 최후의 수단
  test("my div가 있다", () => {
      render(<MyPage/>)
      const inputEl = screen.getByTestId("my-div")
      expect(inputEl).toBeInTheDocument()
  })
  ```



#### getAllBy: DOM특정 모든 요소들 가져오기

> 매칭되는 요소들의 배열을 반환하고 일치하는게 없다면 에러가 난다

![image-20230713200954993](images/image-20230713200954993.png)



* getByAllRole(listitem)

  * toHaveLength로 개수 체크 가능
  * 만약 빈 배열로 넘겨줬다면, li가 생성되지 않아 에러가 남

  ```js
  const users = ["Tom", "Jane", "Mike"]
  test("li는 3개 있다", () => {
      render(<UserList users={users}/>)
      const liElements = screen.getAllByRole("listitem")
      expect(liElements).toHaveLength(users.length); // 개수 체크
  })
  ```



#### queryBy / queryAllBy: 없는 요소 찾기에 적합

> 요소가 없는 경우 에러를 반환하지 않고, null이나 빈배열을 반환한다 
>
> 없는 요소를 찾는 경우 적합하다

* queryByRole / queryAllByRole

  ```
  // null 반환
  test("queryByRole 빈 배열을 넘겨준 경우 요소에 없다", () => {
      render(<UserList users={[]}/>)
      const liElements = screen.queryByRole("listitem")
      expect(liElements).not.toBeInTheDocument()
  })
  
  // 빈 배열을 반환한다
  test("queryAllByRole 빈 배열 넘겨준 경우0개", () => {
      render(<UserList users={[]}/>)
      const liElements = screen.queryAllByRole("listitem")
      expect(liElements).toHaveLength(0); // 개수 체크
  })
  ```



#### findBy : Promise반환

> Promise를 반환, 찾는 요소가 있으면 resolve, 없으면 reject
>
> 최대 1초를 기다리며 해당 요소가 있는지 판별



* findByRole : 요소를 시간 안에 찾을 수 있는지 체크

```jsx
import {useState, useEffect} from "react"

export default function UserList({users}) {
    const [showTitle, setShowTitle] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setShowTitle(true)
        }, 500)
    }, [])
    return (
        <>
            {showTitle && <h1>사용자 목록</h1>}
            <ul>
                {users.map(user => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </>
    )
}
```

```js
test("잠시 후 제목이 나타난다", async () => {
    render(<UserList users={users}/>)
     const titleEl = await screen.findByRole("heading", {
     name: "사용자 목록"
     }, {
    	// 시간 변경하고 싶은 경우 timeout요소 추가
    	timeout: 2000
	})
	expect(titleEl).toBeInTheDocument();
})

```



### 🔴 기본 문법 : 유저 이벤트

> package.json "@testing-library/user-event": "^13.5.0", 13버전은 더이상 지원 안함
>
> 14버전으로 업데이트

```bash
// package.json에서 user-event삭제 후
npm install --save @testing-library/user-event
```



* userEvent

  * Promise를 반환하기 때문에 async, await 비동치 처리

  > 버튼을 누를때마다 login, logout이 변경되는 코드 테스트

  ```jsx
  import {useState} from "react"
  
  export default function Login() {
      const [isLogin, setIsLogin] = useState(false)
  
      const onClickHandler = () => {
          setIsLogin(!isLogin)
      }
  
      return(
          <>
              <button onClick={onClickHandler}>{isLogin ? "Logout" : "Login"}</button>
          </>
      )
  
  }
  
  
  ```

  ```js
  import userEvent from '@testing-library/user-event'
  
  describe("Login test", () => {
      test("처음에는 Login버튼이 있다", () => {
          render(<Login/>)
  
          const btnEl = screen.getByRole("button")
          expect(btnEl).toHaveTextContent("Login")
      })
  
      const user = userEvent.setup()
      test("click button", async () => {
          render(<Login/>)
          const btnElement = screen.getByRole("button")
          await user.click(btnElement)
          expect(btnElement).toHaveTextContent("Logout")
      
      })
  
      test("tab, space, enter 동작", async () => {
          render(<Login />)
          const btnEl = screen.getByRole("button")
          expect(btnEl).toBeInTheDocument()
          await user.tab()
          screen.debug()
          await user.keyboard(" ")
          await user.keyboard(" ")
          screen.debug()
          await user.keyboard("{Enter}")
          screen.debug()
          expect(btnEl).toHaveTextContent("Logout")
      })
  })
  ```

  





### 🔴 에러 수정

#### 문제1. debug 

* Unexpected debug statement

![image-20230712200516568](images/image-20230712200516568.png)

#### 원인

참고 자료: [no-debugging-utils](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-debugging-utils.md)

console.log 문이 브라우저의 출력을 오염시키는 것처럼 debug도 push되어서는 안된다

아래 코드들은 push되어선 안되기 때문에 red line이 쳐진 것. 주석처리 후 push하면 된다

```js
// 1
const { debug } = render(<Hello />);
debug();

// 2
const utils = render(<Hello />);
utils.debug();

// 3
import { screen } from '@testing-library/dom';
screen.debug();

// 4
const { screen } = require('@testing-library/react');
screen.debug();
```



#### 문제2. toBeInTheDocument is not function

*  expect(...).toBeInTheDocument is not function 에러 확인



##### 원인

jest관련 import 문 없음



##### 해결방법

> 루트 위치에 setUpTests.js 파일 생성하여 jest관련 설정을 중앙 집중화 시킨다

* 각 테스트 파일에서 @testing-library를 사용하기 위해 필요한 코어를 import한다.

* 이는 Jest의 config파일에서 사용되며 이를 통해 import의 반복을 줄일 수 있다.



0. 라이브러리 설치

   ```
   @testing-library/jest-dom
   @types/testing-library__jest-dom
   ```

1. app/src/setupTests.js 파일 생성

   ```js
   // jreact-testing-library: jsdom 도구 사용해 document.body 에 리액트 컴포넌트를 렌더링
   // clean-up-after-each: 각 테스트 케이스가 끝날때마다 기존에 가상의 화면에 남아있는 UI를 정리
   import '@testing-library/react'
   // jest에서 DOM관련된 'matcher'를 사용할 수 있게 해줌
   import 'jest-dom/extend-expect'
   import '@testing-library/jest-dom'
   
   ```

2. app/jest.config.js 생성 후 코드 작성

   ```js
   const config = {
       testEnvironment: 'jsdom',
       setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
   }
   
   module.exports = config
   ```

3. multiple jest erro => package.json 코드 삭제

   ```
   "jest": {
   	"testEnvironment": "jsdom"
   },
   ```

   







## ✅ 참고자료

* https://gatsbybosungblogmain.gatsbyjs.io/tdd2/

* https://learn-react-test.vlpt.us/#/01-javascript-testing?id=%ec%b2%ab%eb%b2%88%ec%a7%b8-%ed%85%8c%ec%8a%a4%ed%8a%b8-%ec%9e%91%ec%84%b1%ed%95%98%ea%b8%b0

* https://www.youtube.com/watch?v=K1w6WN7q6k8
* https://www.youtube.com/watch?v=pGOjg4hMf3A