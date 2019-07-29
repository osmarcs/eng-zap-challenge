import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  align-items: center;
  color: var(--white);
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`;
const Logo = styled.img`
  max-width: 360px;
`;
const Filter = styled.nav`
  display: flex;
  align-items: center;
  img {
    height: auto;
    width: 150px;
    margin: 0 10px;
  }
`;
const LogoVivaReal = styled.img`
  background-color: var(--vivareal);
  border-radius: 10px;
  padding: 10px 15px;
`;

function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo
          alt="Logo Grupo ZAP"
          src="https://v.fastcdn.co/t/3854b641/7a7f287a/1558965795-30797501-220x38-logo.png"
        />
      </Link>
      <h1>Teste de engenharia do GrupoZap</h1>
      <h3>Clique abaixo para filtrar os imóveis por portal</h3>
      <Filter>
        <Link to="/vivareal">
          <LogoVivaReal
            alt="Viva Real"
            src="https://www.vivareal.com.br/anunciar-imoveis/img/vivareal.svg"
          />
        </Link>
        <Link to="/zap">
          <img
            alt="ZAP Imóveis"
            src="https://cjs.zapcorp.com.br/Content/img/logotipo_novo_zap.png"
          />
        </Link>
      </Filter>
    </HeaderContainer>
  );
}

export default Header;
