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

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "#d6f3ee",
    secondary: "#334c48",
    tertiary: "b7c3c2",
    quaternary: "#5cb5a6"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
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
          <List>
            <ListItem>
              On devices, movement is simulated by a series of frames
            </ListItem>
            <Appear>
              <ListItem>Most devices will refresh at 60 fps</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                60 fps means we must deliver a frame within 1/60 second ≈ 16 ms
                or user will experience jank!
              </ListItem>
            </Appear>
          </List>
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
}
