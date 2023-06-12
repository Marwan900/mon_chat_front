import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

const FooterText = styled.p`
  font-size: 14px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 Mon Application. Tous droits réservés.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
