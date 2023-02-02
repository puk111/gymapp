import { css } from "styled-components";

export const dfCener = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GloablTitle = css`
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
  max-width: 280px;
  margin-bottom: 70px;
  @media (min-width: 768px) {
    font-weight: 500;
    font-size: 48px;
    line-height: 80px;
    max-width: 500px;
  }
  @media (min-width: 1200px) {
    font-weight: 500;
    font-size: 90px;
    line-height: 120px;
    max-width: 750px;
  }
`;

export const Wrapper = css`
  padding: 10px 20px;
  border: 5px solid var(--secondary-font-color);
  border-radius: 20px;
`;
