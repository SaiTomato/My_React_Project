import styled from 'styled-components';

interface ButtonProps {
  $primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 8px 16px;
  background: ${({ $primary }) => ($primary ? 'blue' : 'gray')};
  color: white;
`;

export default Button;