import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.type === 'primary' ? '#ff6b35' : 'transparent'};
  color: ${props => props.type === 'primary' ? 'white' : '#ff6b35'};
  border: ${props => props.type === 'primary' ? 'none' : '2px solid #ff6b35'};
  padding: ${props => props.size === 'large' ? '15px 30px' : '10px 20px'};
  font-size: ${props => props.size === 'large' ? '1.1rem' : '1rem'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.type === 'primary' ? '#e55a2b' : 'rgba(255, 107, 53, 0.1)'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CTAButton = ({ 
  text, 
  type = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className,
  ...props 
}) => {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CTAButton;
