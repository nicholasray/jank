// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Link,
  Quote,
  Slide,
  Text,
  Appear
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

import "./responsive.css";
import videoSrc from "./videos/record.mp4";
import Video from "./components/Video";
import styled from "styled-components";
import BounceBall from "./components/BounceBall";

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "#d6f3ee",
    secondary: "#334c48",
    tertiary: "#b7c3c2",
    quaternary: "#5cb5a6"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

const FullScreenContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function() {
  return (
    <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
      <Slide transition={["zoom"]} bgColor="primary">
        <Heading size={1} fit caps lineHeight={1} textColor="secondary">
          Jank
        </Heading>
        <Text margin="10px 0 0" textColor="secondary" size={1} fit bold>
          And ways we can deal with it
        </Text>
      </Slide>
      <Slide transition={["fade"]} textColor="primary" bgColor="secondary">
        <BlockQuote>
          <Quote textSize={"3rem"}>
            Jank is any stuttering, juddering or just plain halting that users
            see when a site or app isn't keeping up with the refresh rate
          </Quote>
          <Cite>
            <Link
              href="http://jankfree.org"
              textColor="primary"
              target="_blank"
            >
              http://jankfree.org
            </Link>
          </Cite>
        </BlockQuote>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <BounceBall color={theme.screen.colors.quaternary} />
        <Heading size={6} fit caps textColor="secondary">
          Let's say we have an animation
        </Heading>
        <List>
          <Appear>
            <ListItem>Most screens will refresh 60 times per second</ListItem>
          </Appear>
          <Appear>
            <ListItem>
              The browser must deliver a new frame within 1/60 second ≈ 16 ms.
              If we exceed this budget, there will be jank!
            </ListItem>
          </Appear>
        </List>
      </Slide>
      <Slide transition={["fade"]} textColor="secondary" bgColor="primary">
        <FullScreenContainer>
          <Video playsInline autoPlay muted>
            <source src={videoSrc} type="video/mp4" />
          </Video>
        </FullScreenContainer>
      </Slide>
      <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
        <BlockQuote>
          <Quote>
            A fast load time doesn't really matter if app is unuseable at
            runtime
          </Quote>
        </BlockQuote>
      </Slide>
    </Deck>
  );
}
