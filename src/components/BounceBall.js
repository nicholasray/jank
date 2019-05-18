import React, { useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const BALL_WIDTH = 80; // in px

const Ball = styled.div`
  background: ${props => props.color};
  width: ${BALL_WIDTH}px;
  height: ${BALL_WIDTH}px;
  border-radius: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const SliderContainer = styled.div`
  padding-top: 50px;
  .rangeslider-horizontal .rangeslider__fill {
    background-color: #c57070;
  }
`;

const Caption = styled.div`
  font-size: 1.5rem;
`;

function useAnimationFrame(callback) {
  const savedCallback = useRef();
  let rafId;

  // Remember the latest callback.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useLayoutEffect(() => {
    function tick() {
      savedCallback.current();
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);
}

function runJank(duration) {
  const startTime = performance.now();

  // simulate a running task
  while (performance.now() - startTime < duration) {}
}

export default function({ color }) {
  const [x, setX] = useState(0);
  const [frameBudget, setFrameBudget] = useState(0);
  const [jank, setJank] = useState(0);
  const containerEl = useRef();
  const containerWidth = useRef();
  const startTime = useRef(performance.now());
  const velocity = useRef(500); // 500 pixels / second
  const lastUpdatedFrameBudget = useRef(startTime.current);

  useLayoutEffect(() => {
    containerWidth.current = containerEl.current.clientWidth;
  }, []);

  useAnimationFrame(() => {
    runJank(jank);

    const now = performance.now();

    requestIdleCallback(
      deadline => {
        if (now - lastUpdatedFrameBudget.current >= 200) {
          lastUpdatedFrameBudget.current = now;
          setFrameBudget(deadline.timeRemaining().toFixed(0));
        }
      },
      { timeout: 16 }
    );

    if (x + BALL_WIDTH >= containerWidth.current && velocity.current > 0) {
      // reset the clock and change velocity direction
      startTime.current = now;
      velocity.current = -velocity.current;
    }

    if (x <= 0 && velocity.current < 0) {
      // reset the clock and change velocity direction
      startTime.current = now;
      velocity.current = Math.abs(velocity.current);
    }

    const elapsedTime = (now - startTime.current) / 1000;

    if (velocity.current < 0) {
      setX(
        containerWidth.current - BALL_WIDTH + elapsedTime * velocity.current
      );
      return;
    }

    if (velocity.current > 0) {
      setX(elapsedTime * velocity.current);
    }
  });

  return (
    <Container ref={containerEl}>
      <Ball color={color} style={{ transform: `translateX(${x}px)` }} />
      <div>
        <strong>Frame Budget</strong>:{" "}
        {frameBudget > 0 ? `${frameBudget} ms` : "😭"}
      </div>
      <SliderContainer>
        <Slider
          min={0}
          max={500}
          value={jank}
          onChange={value => {
            setJank(value);
          }}
        />
        <Caption>
          <strong>Task Cost</strong>: {jank} ms
        </Caption>
      </SliderContainer>
    </Container>
  );
}
