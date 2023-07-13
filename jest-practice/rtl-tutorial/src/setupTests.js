// jreact-testing-library: jsdom 도구 사용해 document.body 에 리액트 컴포넌트를 렌더링
// clean-up-after-each: 각 테스트 케이스가 끝날때마다 기존에 가상의 화면에 남아있는 UI를 정리
import '@testing-library/react'
// jest에서 DOM관련된 'matcher'를 사용할 수 있게 해줌
// import 'jest-dom/extend-expect'
import '@testing-library/jest-dom'

