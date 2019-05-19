import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./styles.css";

const BALL_WIDTH = 80; // in px

const Ball = styled.div`
  background: ${props => props.color};
  width: ${BALL_WIDTH}px;
  height: ${BALL_WIDTH}px;
  border-radius: 100%;
  will-change: transform;
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

export default function({ color }) {
  const [x, setX] = useState(0);
  const [frameBudget, setFrameBudget] = useState(0);
  const [jank, setJank] = useState(0);
  const containerEl = useRef();
  const containerWidth = useRef();
  const startTime = useRef(performance.now());
  const speed = useRef(500); // 500 pixels / second
  const lastUpdatedFrameBudget = useRef(startTime.current);
  const expectedTravelTime = useRef();
  const rICQueue = useRef([]);

  useLayoutEffect(() => {
    setupRIC();
  }, []);

  useLayoutEffect(() => {
    containerWidth.current = containerEl.current.clientWidth - BALL_WIDTH;
    expectedTravelTime.current =
      containerWidth.current / (speed.current / 1000);
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

    const now = performance.now();

    rICQueue.current.push(
      requestIdleCallback(
        deadline => {
          rICQueue.current.shift();

          if (
            deadline.didTimeout ||
            now - lastUpdatedFrameBudget.current >= 200
          ) {
            lastUpdatedFrameBudget.current = now;
            setFrameBudget(deadline.timeRemaining().toFixed(0));
          }
        },
        { timeout: 16 }
      )
    );

    const direction =
      Math.floor(now / expectedTravelTime.current) % 2 === 0 ? 1 : -1;
    const distanceFromEdge =
      (now % expectedTravelTime.current) * (speed.current / 1000);

    if (direction === 1) {
      setX(distanceFromEdge);
      return;
    }

    // traveling backwards
    setX(containerWidth.current - distanceFromEdge);
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
