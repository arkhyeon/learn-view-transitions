import React from "react";
import styled from "@emotion/styled";
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
