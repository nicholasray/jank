// Import React
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
`;

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

const Toggler = styled.div`
  display: ${props => (props.show ? "block" : "none")};
`;

export default () => {
  const [show, setShow] = useState(false);

  const divs = [];

  for (var i = 0; i < 1000; i++) {
    divs.push(<div key={i}>{i}</div>);
  }

  return (
    <Container onScroll={() => {}}>
      <button
        onClick={() => {
          setShow(!show);
        }}
        style={{ width: "100%" }}
      >
        {show ? "Hide" : "Show"}
      </button>
      <Toggler show={show}>
        <ContentContainer>
          <Content>{divs}</Content>
        </ContentContainer>
        <Input placeholder="Search" type="text" />
      </Toggler>
    </Container>
  );
};
