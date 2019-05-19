// Import React
import React, { useState } from "react";
import styled from "styled-components";
import OverflowDiv from "./OverflowDiv";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
`;

const Toggler = styled.div`
  display: ${props => (props.show ? "block" : "none")};
`;

export default () => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <button
        onClick={() => {
          setShow(!show);
        }}
        style={{ width: "100%" }}
      >
        {show ? "Hide" : "Show"}
      </button>
      <Toggler show={show}>
        <OverflowDiv />
      </Toggler>
    </Container>
  );
};
