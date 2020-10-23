import styled from 'styled-components'
import Flex from 'components/Flex'
import TextareaAutosize from 'react-textarea-autosize'

export const InputWrapper = styled(Flex)`
  height: 50px;
  border-radius: 24px;
  padding: 12px 16px 10px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  width: 420px;
  transition: width 0.3s ease-out;
  ${(props) =>
    props.active &&
    `
    width: 450px;
  `}
`

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 18px;
`

export const Input = styled(TextareaAutosize)`
  border: none;
  margin: -12px -16px -10px;
  padding: 12px 16px 10px;
  width: 100%;
  background: transparent;
  border-radius: 24px;
`

export const SendButton = styled.button`
  background: #4375fc;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  border-radius: 6px;
  padding: 12px 28px;
  margin-top: 12px;
  color: white;
  font-weight: 500;
  font-size: 15px;
  background: #7057d2;

  opacity: 0;
  ${(props) =>
    props.active &&
    `
    opacity: 1;
  `}
`

export const SendIcon = styled.svg``
