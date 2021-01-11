1. npm VS npx
   1. npm : 그 프로그램을 설치하는 프로그램.
   2. npx : 임시로 설치하여 딱 한번만 실행하고 지운다.
      1. 최신버젼의 프로그램을 사용할 수 있다.

1. serve : npm을 통해서 설치하는 간단한 web-server
   * npx serve -s build -> npx를 통해 임시로 web-server를 설치하고 build 폴더를 루트(-s 옵션)로 하여 server를 띄우겠다.

2. 시멘틱 태그 : HTML5의 스펙으로 의미론 적인 태그를 뜻한다.
   1. example : <header><footer>

3. ES6의 class안의 function은 'function' 키워드 없이 작성해도 된다.

4. React의 Component는 하나의 최상위 태그로 감싸져 있어야 한다.

5. React의 render안의 태그를 통칭 'JSX'라 한다.

6. Component의 constructor()는 render() 이전에 Component를 초기화 해준다.

7. 상위 컴포넌트의 state값을 하위 컴포넌트의 props로 전달한다.
> props는 단순 값 뿐만 아니라 function도 전달할 수 있다.
> props는 component 안에서 read-only
> state는 변경 시 setState() 사용
> 하위 component가 상위 component를 조작할 시 event를 통해서 한다.
> ```
> <Subject 
      title={this.state.subject.title} 
      sub={this.state.subject.sub}
      onChangePage={function(){
      this.setState({
         mode : 'welcome'
      });
      }.bind(this)}>
> </Subject>
> ```

8. Each child in a list should have a unique "key" prop.
> 각각의 list 항목들은 key라는 props를 가지고 있어야 한다.
> example : <li key=key></li><a href={link}>title</a></li>

9. Component의 state, props가 변경 시 render()가 재호출된다.
> state, props가 변경된 Component뿐만 아니라 하위 Component의 render()도 재호출된다.
> * state 변경 시 단순히 this.state.value로 변경하게 되면 state의 값은 변경되지만 React가 변경되었는지
> 모르기 때문에 render()가 재호출 되지 않는다.
> 따라서, 반드시 **setState()**를 호출하여 state의 값을 변경 할 것.

10. JSX에서 사용하는 태그는 유사 HTML이기 때문에 React의 문법을 사용해야 정상 동작한다.
> example : <a href="" onclick> (x), <a href="" onClick> (o)

11. onClick의 이벤트의 경우(다른 이벤트도 마찬가지), function의 param으로 event 객체를 넘겨준다.(React의 기본 성질)
> **event.preventDefault()** : 이벤트가 발생한 태그의 기본적인 동작을 막는 function
> 해당 function을 넣지 않으면 page를 reload한다.(a태그의 기본동작)

12. 
```
<header>
   <h1><a href="" onClick={function(e) {
      e.preventDefault();
      // this.state.mode = 'welcome';
   }.bind(this)}>{this.state.subject.title}</a></h1>
   {this.state.subject.sub}
</header>

onClick={function(){
   this.state.mode      // -> this는 component를 지칭하지 않기 때문에 'undifined'가 출력된다.
   this.setState({
      mode : 'welcome'  // -> React의 state는 setState()를 통해서 접근 & 변경 할 수 있다.
   })
}.bind(this)}           // -> 따라서 해당 function에 this(Component)를 bind 해준다.(14번 참고)
```

13. render(){} 안에서 this는 해당 Component는 가르킨다.

14. bind(param)는 param을 앞의 function에 this로 주입하여 연결해준다.
> func.bind(param);
> * func.bind(para, args...)에서 args는 func(){}에서 param앞에서 부터 추가해서 적용한다.
> * 기존에 사용되던 param은 뒤로 하나씩 밀린다.
> ```
> function(id, num, e){
>  console.log(id);  //abc
>  console.log(num); //10
> }.bind(this, 'abc', 10)
> ```

15. 11번의 event 객체는 target이란 property를 가지고 있는데, 이는 해당 event가 일어난 태그의 정보를 가지고 있다.
> * "data-" 접두사를 붙인 속성은 target.dataset 특수한 property를 통해서 접근할 수 있다.

16. javascript의 기본 함수 Number(n), n을 숫자형으로 형변환 해준다.

17. UI에 영향을 주지 않는 값에 대해서는 state로 할 이유가 없다.

18. array 이용
    1.  array.push -> 원본 배열의 원소를 추가
    2.  array.concat -> 원본 배열을 변경하지 않고 원소를 추가하여 새로운 배열을 반환
        1.  같은 방식으로 const b = Array.from(a);를 사용하여 a와 같은 내용의 b 배열을 새로 할당하여 사용한다.
    3.  * React의 state에는 original data를 변경하지 않는 방식으로 개발 지향(concat)
    
19. shouldComponentUpdate(newProps, newState)
    1. render() 함수 호출 이전에 호출되는 React function
    2. newProps와 newState는 새로운 props와 state이다.
    3. return true -> render()를 호출
    4. return false -> render() 호출하지 않음
    5. * 18-2의 concat을 사용하는 이유이기도 하다
    6. ```
    shouldComponentUpdate(newProps, newState){
        if(this.props.data == newProps.data){
            return false;
        }
        return true;
    }
    ```
20. const b = Object.assign({},a);
    1. 18-2-1의 const b = array.from(a)와 같이 a와 같은 내용의 객체인 b를 새로 할당한다.
    2. 첫번째 param에 {} 빈객체가 아닌 값이 존재하는 객체를 넣을 경우, 해당 값이 b에 포함된다.
    ex) const b = Object.assign({left:1, right:2}, a);
    -> b => {left:1, right:2, a의 property}

21. JSX의 textarea에서는 HTML 처럼 태그 사이에 text를 넣는 것이 아닌 value 속성에 text를 넣는다.

22. Array.splice(startIndex, number) -> Array 안의 원소 중 startIndex부터 number개를 Array에서 빼겠다.

23. 다음 학습 
    1.  Immutable.js -> https://immutable-js.github.io/immutable-js/
    2.  React-router
    3.  Redux
    4.  React server side rendering - server쪽에서 web page를 완성한 후 에 client로 완성된 HTML를 전송하는 기술
    5.  react native - android, IOS platform을 React으로 개발 할 수 있음.
