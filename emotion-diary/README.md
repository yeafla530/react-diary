# Emotion Diary-기술

## Page Rounting

### Routing이란?

> 어떤 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정

- Router : 데이터의 경로를 실시간으로 지정해주는 역할을 하는 무언가

- Routing : 경로를 정해주는 행위차체와 그런 과정들을 다 포함하여 일컫는 말

### PAGE ROUTING이란?

> 요청에 명시되어 있는 경로에 따라 알맞은 페이지를 결정하고 접속하는 과정

![image-20230306150046423](C:\Users\이예림\AppData\Roaming\Typora\typora-user-images\image-20230306150046423.png)

### MPA: 웹서버가 여러개의 page를 갖고있는것

> 페이지가 이동할 때마다 새로고침되어 페이지를 이동시킴

![image-20230306150316652](C:\Users\이예림\AppData\Roaming\Typora\typora-user-images\image-20230306150316652.png)

![image-20230306150536341](C:\Users\이예림\AppData\Roaming\Typora\typora-user-images\image-20230306150536341.png)

### SPA : 단일 페이지 어플리케이션

> 페이지가 한개밖에 없음
>
> 페이지를 오가도 새로고침이 일어나지 않음

![image-20230306150611999](C:\Users\이예림\AppData\Roaming\Typora\typora-user-images\image-20230306150611999.png)

![image-20230306151135807](C:\Users\이예림\AppData\Roaming\Typora\typora-user-images\image-20230306151135807.png)

1. url 요청
2. index.html을 보내주고 React App을 던져주게 됨
3. post버튼 클릭시 React App이 알아서 페이지를 업데이트 시킴 ( 서버와 통신x)
4. 데이터만 server에서 받음
5. **CSR** (Client Side Redering) : 클라이언트 측이 렌더링 하는 방식 - **react router**가 도와줌
