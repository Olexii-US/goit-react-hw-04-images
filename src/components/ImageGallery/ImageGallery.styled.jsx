import styled from 'styled-components';

export const UlImageGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Notification = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  font-size: 20px;
  font-weight: 400;
  color: gray;
`;
