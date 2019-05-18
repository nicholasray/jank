import React, { useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";

const BALL_WIDTH = 80;

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

export default function({ color }) {
  const [x, setX] = useState(0);
  const containerEl = useRef();
  const containerWidth = useRef();
  const startTime = useRef(performance.now());
  const velocity = useRef(500); // 500 pixels / second

  useLayoutEffect(() => {
    containerWidth.current = containerEl.current.clientWidth;
  });

  useAnimationFrame(() => {
    const now = performance.now();

    if (x + BALL_WIDTH >= containerWidth.current && velocity.current > 0) {
      startTime.current = now;
      velocity.current = -velocity.current;
    }

    if (x <= 0 && velocity.current < 0) {
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
    </Container>
  );
}
