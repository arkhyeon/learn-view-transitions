# View Transitions API

# View Transitions API 개요

View Transitions API는 안드로이드에서 사용되는 뷰 전환 애니메이션을 Web에서 쉽게 구현할 수 있도록 해주는 API입니다. 이 API는 개발자가 불필요한 코드를 작성하지 않고도 뷰 전환 효과를 쉽게 구현하며 다양한 효과를 적용할 수 있게 도와줍니다.

Chrome 111(2023.03.27) ~ Latest 지원

# View Transitions API 진행

<aside>
<img src="/icons/activity_gray.svg" alt="/icons/activity_gray.svg" width="40px" /> 현재 화면 캡쳐 후 새 화면으로 애니메이션 효과로 전환하며 이전 화면 제거

</aside>

1. document.startViewTransition() API 호출 시 현재 페이지를 캡쳐합니다.
2. startViewTransition()으로 전달된 callback 호출, 이 경우 displayNewImage가 실행되어 DOM이 변경됩니다. callback이 성공적으로 실행되면 DOM 업데이트에 응답할 수 있도록 ViewTransition.updateCallbackDone promise가 실행됩니다.
3. API는 페이지의 새로운 상태 캡처하고 다음과 같은 구조로 pseudo-element tree를 구성합니다.

```jsx
::view-transition
	└─ ::view-transition-group(root)
		└─ ::view-transition-image-pair(root)
			├─ ::view-transition-old(root)
			└─ ::view-transition-new(root)
```

1. ::view-transition은 View Transitions overlay의 루트로, 모든 View Transitions을 포함하며 모든 페이지 콘텐츠의 위에 위치합니다.
    - ::view-transition-old : 이전 페이지 뷰의 캡쳐
    - ::view-transition-new : 새로운 페이지 뷰의 캡쳐
2. old page view는 opacity가 1에서 0으로 애니메이션화되고, new page view는 opacity 0에서 1로 애니메이션화되므로 fade효과가 생성됩니다.
3. 위의 애니메이션이 종료 상태에 도달하면 ViewTransition.finished promise 실행됩니다.

# View Transitions API 기본 예제

다음은 View Transitions API를 사용하여 이미지를 전환하는 기본적인 예제입니다.

아무 설정도 하지 않을 시 fade효과를 나타냅니다.

- App.jsx

```jsx
const ITEMS = [
  { src: "/src/img/green.png", name: "green", desc: "초록색 사진" },
  { src: "/src/img/skyblue.png", name: "skyblue", desc: "하늘색 사진" },
  { src: "/src/img/lightgreen.png", name: "lightgreen", desc: "연두색 사진" },
];

function App() {
  const [currentViewItem, setCurrentViewItem] = useState(ITEMS[0]);

  const handleClickItem = (item) => {
    document.startViewTransition(() => setCurrentViewItem(item));
  };

  return (
    <MainWrap>
      <ViewMain item={currentViewItem} />
      <ViewAsideList onClickItem={handleClickItem} itemList={ITEMS} />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  align-items: center;
`;

export default App;
```

- ViewMain : 선택된 메인 이미지를 보여줄 컴포넌트

```jsx
function ViewMain({ item }) {
  return (
    <ViewMainWrap>
      <img src={item.src} />
      <h1>{item.name}</h1>
      <h2>{item.desc}</h2>
    </ViewMainWrap>
  );
}

const ViewMainWrap = styled.div`
  & img {
    width: 600px;
		height: 600px;
  }
`;

export default ViewMain;
```

- ViewAsideList : 보여줄 메인 이미지를 선택할 수 있는 컴포넌트

```jsx
function ViewAsideList({ onClickItem, itemList }) {
  return (
    <AsideWrap>
      {itemList.map((item) => {
        return (
          <Card key={item.name}>
            <img src={item.src} onClick={() => onClickItem(item)} />
            {item.name} {item.desc}
          </Card>
        );
      })}
    </AsideWrap>
  );
}

const AsideWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  margin: 10px 20px;
  & img {
    width: 300px;
    height: 300px;
  }
`;

export default ViewAsideList;
```

# View Transitions API 심화 예제

다음은 View Transitions APi에서 애니메이션 효과를 변경한 예제입니다.

- App.css : 다른 애니메이션 효과를 지정

```css
@keyframes pop-out-to-right {
  to {
    opacity: 0;
    transform: scale(1);
  }
}
@keyframes pop-in-from-right {
  from {
    opacity: 0;
    transform: scale(0.1);
  }
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateX(15px);
  }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
}

.view-title {
  view-transition-name: view-title;
}
.view-description {
  view-transition-name: view-desc;
}
.view-counter {
  view-transition-name: view-count;
}

::view-transition-old(view-count) {
  animation-name: pop-out-to-right;
}
::view-transition-new(view-count) {
  animation-name: pop-in-from-right;
}

::view-transition-old(view-title),
::view-transition-old(view-desc) {
  animation-name: slideOut;
}
::view-transition-new(view-title),
::view-transition-new(view-desc) {
  animation-name: slideIn;
}
```

- ViewMain : 기본 예제에 className 설정
