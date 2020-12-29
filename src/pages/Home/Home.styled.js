import styled from 'styled-components'
import Flex from 'components/atoms/flex'

export const Container = styled(Flex)`
  background: #3c3c3c;
  width: 100vw;
  height: 100vh;
`

export const Logo = styled.span`
  margin-top: 64px;
  font-size: 24px;
  color: #ae6e6e;
`

export const LogoColored = styled.span`
  color: white;
  font-size: 24px;
`

export const Infinity = styled.span`
  color: white;
  transform: rotate(90deg);
  display: inline-block;

  margin-left: -2px;
  font-size: 28px;
  margin-top: -44px;
  height: 41px;
  margin-right: 7px;
  font-weight: 300;
`

export const Content = styled(Flex)`
  margin-top: 64px;
`

export const Column = styled(Flex)`
  flex-direction: column;
  margin: 0 64px;
  color: #5a5656;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
`
