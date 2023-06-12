import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 280px;
  background-color: #36393f;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content:center;
  height: 90vh; 
  position: fixed;
  margin-top:25px;
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
    background-color: #202225;
  }
`;

const ContactName = styled.span`
  margin-left: 8px;
`;

const Sidebar = () => {
  const contacts = ["John", "Jane", "Mike", "Emily"];

  const handleContactClick = (contact) => {
    console.log("Clicked on contact:", contact);
  };

  return (
    <Container>
      <Header>Contacts</Header>
      <ContactList>
        {contacts.map((contact, index) => (
          <ContactItem key={index} onClick={() => handleContactClick(contact)}>
            <span>#</span>
            <ContactName>{contact}</ContactName>
          </ContactItem>
        ))}
      </ContactList>
    </Container>
  );
};

export default Sidebar;
