import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: scroll;
`;

const Input = styled.input`
  width: 100%;
`;

const Content = styled.div`
  color: #fff;
  width: 100%;
  text-align: center;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #08aeea 0%, #2af598 100%);
`;

const divs = [];

for (var i = 0; i < 1000; i++) {
  divs.push(<div key={i}>{i}</div>);
}

export default function() {
  return (
    <>
      <ContentContainer>
        <Content>{divs}</Content>
      </ContentContainer>
      <Input placeholder="Search" type="text" />
    </>
  );
}
