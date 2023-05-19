import { useState } from "react";
import ViewMain from "./ViewMain.jsx";
import ViewAsideList from "./ViewAsideList.jsx";
import styled from "@emotion/styled";
import "./App.scss";

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
