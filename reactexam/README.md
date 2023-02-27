# 📍 React

## React 사용하는 이유

1. 공통요소 : 컴포넌트 화 방식

   * React는 Component 기반의 UI 라이브러리다

   * 공통적으로 사용될 것으로 예상되는 것들을 컴포넌트로 묶어 사용

   * 유지보수, 재사용 용이

   * Shotgun Surgery : 중복 코드 삭제

     

2.  선언형 프로그래밍

   * 목적을 바로 말하는 프로그래밍
   * 명령형 프로그래밍 : 절차를 하나하나 다 나열해야함 (jquery)



3. Virtual DOM
   * DOM(Document Object Model)이란 문서 객체 모델
   * 잦은 업데이트 상황에서는 브라우저는 필요이상의 연산을 해야되고 성능저하로 이어짐
   * 가상 돔을 사용함으로써 발생하는 변화를 가상돔에 미리 업데이트 시키고 (화면에 그리지 않음) 한번에 업데이트 시킴
     * State Change > Compute Diff(업데이트 상황) > Re-render
     * Compute Diff과정이 Browser DOM과 Virtual DOM의 차이점



## Get Started

```
cd reactexam
npm start
```



## document structure

```
ㄴ node_modules : node.js 구성요소중 하나로 외부 모듈을 저장하고 있는 폴더
ㄴ public
	ㄴ fabicon.ico : 웹사이트 아이콘
	ㄴ index.html : 전체 html 코드
	ㄴ manifest.json : 홈화면에 추가 같은 아이콘 설정
	ㄴ robots.txt : 검색 엔진 수집 설정
ㄴ src
	ㄴ App.css : style 파일
	ㄴ App.js : 컴포넌트, jsx문법 사용
	ㄴ index.css :
    ㄴ index.html : 
	ㄴ package-lock.json : node_modules에 있는 목록이 작성되어있음
	ㄴ package.json : node_modules에 있는 목록이 작성되어있음
	
ㄴ
```

