import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-rangeslider";
import SliderContainer from "./SliderContainer";

const Button = styled.button`
  color: #fff;
  background: ${props =>
    props.isOn ? props.activeColor : props.inactiveColor};
  height: 100px;
  width: 100%;
`;

const Caption = styled.div`
  font-size: 1.5rem;
  margin-bottom: 100px;
`;

function runJank(duration) {
  const startTime = performance.now();

  // simulate a running task
  while (performance.now() - startTime < duration) {}
}

export default function({ inactiveColor, activeColor }) {
  const [isOn, setIsOn] = useState(false);
  const [jankDuration, setJankDuration] = useState(0);

  return (
    <div>
      <Button
        inactiveColor={inactiveColor}
        activeColor={activeColor}
        onClick={() => {
          runJank(jankDuration);
          setIsOn(!isOn);
        }}
        isOn={isOn}
      >
        {isOn ? "Off" : "On"}
      </Button>
      <SliderContainer>
        <Slider
          min={0}
          max={500}
          value={jankDuration}
          onChange={value => {
            setJankDuration(value);
          }}
        />
        <Caption>
          <strong>JS Cost</strong>: {jankDuration} ms
        </Caption>
      </SliderContainer>
    </div>
  );
}
