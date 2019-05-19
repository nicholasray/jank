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
  Appear,
  Fill,
  Layout,
  Image,
  CodePane
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

import "./responsive.css";
import videoSrc from "./videos/record.mp4";
import noJankPng from "./images/bounce-no-jank-profile.png";
import fullJankPng from "./images/bounce-full-jank-profile.png";
import frameAnatomySvg from "./images/anatomy-of-a-frame.svg";
import compositorThreadExample from "./code/compositorAnimation.example";
import mainThreadExample from "./code/mainThreadAnimation.example";
import phabTicket from "./images/phab-ticket.png";
import Video from "./components/Video";
import styled from "styled-components";
import BounceBall from "./components/BounceBall";
import ScrollDiv from "./components/ScrollDiv";
import BigButton from "./components/BigButton";

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "#d6f3ee",
    secondary: "#334c48",
    tertiary: "#7f5ef9",
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
  flex-direction: column;
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
`;

const FullImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const Credit = styled.div`
  padding-top: 15px;
  padding-left: 15px;
  font-size: 1.5rem;
  font-style: italic;
  text-align: left;
  align-self: flex-start;
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
        <Text margin="140px 0 0" textColor="secondary" size={1} bold>
          Nick Ray
        </Text>
      </Slide>
      <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
        <BlockQuote>
          <Quote>Why am I presenting this?</Quote>
        </BlockQuote>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <FullScreenContainer>
          <Image src={phabTicket} />
        </FullScreenContainer>
      </Slide>
      <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
        <BlockQuote>
          <Quote>
            A fast load time doesn't matter if a page is unuseable at runtime
          </Quote>
        </BlockQuote>
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
          For an animation running on the main thread:
        </Heading>
        <List>
          <Appear>
            <ListItem>Most screens will refresh 60 times per second</ListItem>
          </Appear>
          <Appear>
            <ListItem>
              The browser must deliver a new frame within 1/60 second ≈{" "}
              <strong>16 ms</strong>. If we exceed this budget, there will be
              dropped frames and jank!
            </ListItem>
          </Appear>
        </List>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <BounceBall color={theme.screen.colors.quaternary} />
        <Heading size={6} fit caps textColor="secondary">
          User input is also affected
        </Heading>
        <Layout>
          <Fill>
            <ScrollDiv />
          </Fill>
        </Layout>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <FullScreenContainer>
          <ContentContainer>
            <Heading size={6} fit caps textColor="secondary">
              Without jank{" "}
              <span role="img" aria-label="crying">
                😄
              </span>
            </Heading>
          </ContentContainer>
          <FullImage src={noJankPng} />
        </FullScreenContainer>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <FullScreenContainer>
          <ContentContainer>
            <Heading size={6} fit caps textColor="secondary">
              With a lot of jank{" "}
              <span role="img" aria-label="crying">
                😭
              </span>
            </Heading>
          </ContentContainer>
          <FullImage src={fullJankPng} />
        </FullScreenContainer>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <FullScreenContainer>
          <ContentContainer>
            <Heading size={6} fit caps textColor="secondary">
              What goes on in a frame
            </Heading>
          </ContentContainer>
          <FullImage src={frameAnatomySvg} />
          <Credit>
            <Link
              href="https://aerotwist.com/blog/the-anatomy-of-a-frame/"
              textColor="tertiary"
              target="_blank"
            >
              "Anatomy of a frame”
            </Link>
            {" by "}
            <Link
              href="https://aerotwist.com"
              textColor="tertiary"
              target="_blank"
            >
              Paul Lewis
            </Link>
            {" is licensed under "}
            <Link
              href="https://creativecommons.org/licenses/by/3.0/"
              textColor="tertiary"
              target="_blank"
            >
              CC BY 3.0
            </Link>
          </Credit>
        </FullScreenContainer>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <BounceBall
          runOnCompositor={true}
          color={theme.screen.colors.quaternary}
        />
        <Heading size={6} fit caps textColor="secondary">
          Animations running on the compositor thread are jank resistant!
        </Heading>
        <Layout>
          <Fill>
            <CodePane
              padding="0 20px 0 0"
              textSize="1.5rem"
              theme="light"
              source={mainThreadExample}
              height="100%"
            />
          </Fill>
          <Fill>
            <CodePane
              textSize="1.5rem"
              theme="light"
              source={compositorThreadExample}
              height="100%"
            />
          </Fill>
        </Layout>
      </Slide>
      <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
        <BigButton
          activeColor={theme.screen.colors.quaternary}
          inactiveColor={theme.screen.colors.tertiary}
        />
        <Heading size={6} fit caps textColor="secondary">
          Input responses must be within 100 ms or user can notice
        </Heading>
      </Slide>
      <Slide transition={["fade"]} textColor="secondary" bgColor="primary">
        <FullScreenContainer>
          <Video playsInline autoPlay muted>
            <source src={videoSrc} type="video/mp4" />
          </Video>
        </FullScreenContainer>
      </Slide>
    </Deck>
  );
}
