import { Link, Container, Text } from "@chakra-ui/react";
import * as React from "react";

function Footer() {
  return (
    <Container as="footer" role="contentinfo" color="white">
      <Text fontSize="sm" color="subtle" align="center">
        &copy; {new Date().getFullYear()}{" "}
        <Link
          href="http://recepbatuhandikmen.vercel.app"
          isExternal
          fontWeight={500}
        >
          Recep Batuhan Dikmen
        </Link>
        . All rights reserved.
      </Text>
    </Container>
  );
}

export default Footer;
