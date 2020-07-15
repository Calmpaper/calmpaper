import styled from 'styled-components'
import Flex from 'components/Flex'

export const InputWrapper = styled(Flex)`
  height: 50px;
  border-radius: 24px;
  padding: 12px 16px 10px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  width: 320px;
  transition: width 0.3s ease-out;
  ${(props) =>
    props.active &&
    `
    width: 340px;
  `}
`

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 18px;
`

export const Input = styled.input`
  border: none;
  margin: -12px -16px -10px;
  padding: 12px 16px 10px;
  width: 100%;
  background: transparent;
  border-radius: 24px;
`

export const SendButton = styled.button`
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: #4375fc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${(props) =>
    props.active &&
    `
    opacity: 1;
  `}
`

export const SendIcon = styled.svg``
