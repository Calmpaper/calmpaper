import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import * as atoms from 'components/atoms'

export const Container = styled.div`
  width: 622px;
  .dzu-previewImage {
    width: 38px;
    height: 38px;
    margin-right: 8px;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, 0);
    user-select: none;
    background: #fafafa;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    :hover {
      border-color: blue;
    }
    ${(props) => props.playing && 'border-color: #ae00ff;'}
  }
`

export const User = styled(atoms.flex)`
  background: white;
  border: 1px solid #e0e0e0;
  padding: 16px;
  width: 100%;
  margin-top: -16px;
  margin-bottom: 24px;
  box-sizing: border-box;
`

export const Username = styled.h2`
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
`

export const Description = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 15px;
  line-height: 21px;
`

export const Image = styled.img`
  height: 300px;
  width: 200px;
  align-self: flex-start;
`

export const Title = styled(RouterLink).attrs({ className: 'title' })`
  color: black;
  text-decoration: none;
  font-weight: 500;
  :hover {
    text-decoration: underline;
  }
`

export const Label = styled.span`
  color: hsla(0, 0%, 60%, 1);
  width: 88px;
  font-size: 15px;
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 12px;
  width: 100%;
`

export const Break = styled.br`
  content: '';
  display: block;
  margin-bottom: 4px;
`

export const Link = styled(RouterLink)`
  color: blue;
  text-decoration: none;
  margin-bottom: 24px;
  :hover {
    text-decoration: underline;
  }
`

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 8px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0);
  user-select: none;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  :hover {
    border-color: blue;
  }
  ${(props) => props.playing && 'border-color: #ae00ff;'}
`
