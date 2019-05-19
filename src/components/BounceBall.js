import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import SliderContainer from "./SliderContainer";

const BALL_WIDTH = 80; // in px

const mainThreadAnimation = containerWidth => keyframes`
  // I want the animation to run on the main thread so that's why I'm
  // using left here instead of transform
  0%   { left: 0; }
  50%  { left: ${containerWidth}px; }
  100% { left: 0; }
`;

const compositorAnimation = containerWidth => keyframes`
  // animation with compositor thread
  0%   { transform: translateX(0); }
  50%  { transform: translateX(${containerWidth}px); }
  100% { transform: translateX(0); }
`;

const Ball = styled.div`
  position: relative;
  background: ${props => props.color};
  width: ${BALL_WIDTH}px;
  height: ${BALL_WIDTH}px;
  border-radius: 100%;
  animation: ${props =>
      props.runOnCompositor
        ? compositorAnimation(props.containerWidth)
        : mainThreadAnimation(props.containerWidth)}
    3.8s linear infinite;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
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

// polyfill for ric
function setupRIC() {
  window.requestIdleCallback =
    window.requestIdleCallback ||
    function(cb) {
      var start = Date.now();
      return setTimeout(function() {
        cb({
          didTimeout: false,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    };

  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function(id) {
      clearTimeout(id);
    };
}

function runJank(duration) {
  const startTime = performance.now();

  // simulate a running task
  while (performance.now() - startTime < duration) {}
}

function BounceBall({ color, runOnCompositor }) {
  const [frameBudget, setFrameBudget] = useState(0);
  const [jank, setJank] = useState(0);
  const containerEl = useRef();
  const containerWidth = useRef(0);
  const startTime = useRef(performance.now());
  const lastUpdatedFrameBudget = useRef(startTime.current);
  const rICQueue = useRef([]);

  useLayoutEffect(() => {
    setupRIC();
  }, []);

  useLayoutEffect(() => {
    containerWidth.current = containerEl.current.clientWidth - BALL_WIDTH;
  }, []);

  useEffect(() => {
    return () => {
      rICQueue.current.forEach(id => {
        // cancel any pending requestIdleCallbacks
        cancelIdleCallback(id);
      });
    };
  }, []);

  useAnimationFrame(() => {
    runJank(jank);

    rICQueue.current.push(
      requestIdleCallback(
        deadline => {
          rICQueue.current.shift();

          if (
            deadline.didTimeout ||
            performance.now() - lastUpdatedFrameBudget.current >= 200
          ) {
            lastUpdatedFrameBudget.current = performance.now();
            setFrameBudget(deadline.timeRemaining().toFixed(0));
          }
        },
        { timeout: 16 }
      )
    );
  });

  return (
    <Container ref={containerEl}>
      <Ball
        runOnCompositor={runOnCompositor}
        containerWidth={containerWidth.current}
        color={color}
      />
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
          <strong>JS Cost Per Frame</strong>: {jank} ms
        </Caption>
      </SliderContainer>
    </Container>
  );
}

BounceBall.defaultProps = {
  runOnCompositor: false
};

export default BounceBall;
