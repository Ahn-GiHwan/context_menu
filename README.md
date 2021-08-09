# 바닐라 자바스크립트를 이용하여 context_menu 표시 및 삭제

## 조건

- 목록을 클릭하면 해당 아이템에 대한 컨텍스트메뉴가 나타나고,
- 메뉴를 선택하거나 그 외의 부분을 클릭하면 사라지는
- 팝오버 컴포넌트를 구현하세요.
- 팝오버는 한 번에 하나만 보여야 합니다.

## TODO

| 번호 | 내용                                                                                                           |
| :--: | -------------------------------------------------------------------------------------------------------------- |
|  1   | .item 클릭 시 context가 표시되고, 다시 같은 .item을 클릭 시 사라진다.                                          |
|  2   | .item 클릭 시 context가 표시되고, 다른 .item을 클릭 기존의 context는 사라지고 다른 .item의 context가 표시된다. |
|  3   | .item 클릭 시 context가 표시되고, 다른 공간(.item을 제외)을 클릭하면 context는 사라진다.                       |
|  4   | context 클릭 시 아무 변화가 없어야 한다.                                                                       |

## 배운점

### 1. class 추가 및 제거 방법(className vs classList)

#### **className**

class를 아예 지정한 이름으로 바꿔준다.
다시 되돌리려면 원래 class이름을 지정해 주면된다.

```js
const item = document.querySelector('.item')

item.addEventListener("click", () => {
    item.className === "item open"
      ? (item.className = "item")
      : (item.className = "item open");
}
```

#### **classList**

기존 class에 class를 추가할 때 사용한다.
toggle()을 사용하면 이벤트시 toggle안의 class가 포함되어 있으면 자동으로 제거해준다.

```js
const item = document.querySelector('.item')

item.addEventListener("click", () => {
    item.classList.toggle("open")
}
```

### 2. 이벤트 버블링(위임)을 통한 이벤트 설정

이벤트리스너를 적게 설정하는 것이 성능 저하를 막는다.

```js
const wrapper = document.querySelector(".wrapper");
const items = document.querySelectorAll(".item");

// 이벤트 버블링(위임)을 이용하여 하위의 node(element)에도 event가 동작한다.
wrapper.addEventListener("click", (e) => {
  const targetElem = e.target;

  if (!targetElem.classList.contains("item")) return;
  // item class만 뒤의 로직 수행

  // 클릭한 div에만 open 추가하기
  targetElem.classList.toggle("open");

  // 나머지 item class에는 open 제거하기
  items.forEach((item) => {
    item !== targetElem && item.classList.remove("open");
  });
});
```

### 3. body에 이벤트리스너를 설정하여 모든 이벤트 관리

#### **body에 이벤트리스너를 설정 시**

| 구분 | 내용                                                                                                                                                                       |
| :--: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 장점 | 1. 이벤트리스너가 하나라서 성능이 좋아진다.                                                                                                                                |
| 단점 | 1. 이벤트리스너가 하나라서 내부에 조건문이 많아질 수 있다. <br>2. 이벤트리스너가 body에 걸려있어서 모든 이벤트를 여기서 관리해서 add or remove로 메모리 관리를 할 수 없다. |
