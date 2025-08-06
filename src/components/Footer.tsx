import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  margin: 10px auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const LinkTo = styled.a`
  margin-left: 10px;
`;

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container>
      <p>&copy;{year} Eileen. All rights reserved.</p>
      <LinkTo
        href="https://github.com/eileen819"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </LinkTo>
      <LinkTo href="mailto:eileen.ju.8819@gmail.com">E-mail</LinkTo>
    </Container>
  );
}

export default Footer;
