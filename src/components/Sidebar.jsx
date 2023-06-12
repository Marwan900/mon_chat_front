import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #D3CCE3;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: black;
  display: flex;
  flex-direction: column;
  justify-content:center;
  height: 87vh; 
  position: fixed;
  margin-top:25px;
  width:20vh;
  box-shadow: 1px 1px 0px #999;
  2px 2px 0px #999,
  3px 3px 0px #999,
  4px 4px 0px #999,
  5px 5px 0px #999,
  6px 6px 0px #999;
  
  font-family: "Lucida Console", "Courier New", monospace;
`;

const Header = styled.div`
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #202225;
`;

const ContactList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: purple;
  }
`;

const ContactName = styled.span`
  margin-left: 8px;
`;

const Sidebar = () => {
  const contacts = ["Marwan", "Autres"];

  const handleContactClick = (contact) => {
    console.log("Clicked on contact:", contact);
  };

  return (
    <Container>
      <Header>Contacts</Header>
      <ContactList>
        {contacts.map((contact, index) => (
          <ContactItem key={index} onClick={() => handleContactClick(contact)}>
            <span>🧑‍💻</span>
            <ContactName>{contact}</ContactName>
          </ContactItem>
        ))}
      </ContactList>
    </Container>
  );
};

export default Sidebar;
