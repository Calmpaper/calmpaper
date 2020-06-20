import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

import { ReactComponent as PlayIconComponent } from 'assets/icons/play.svg'
import { ReactComponent as StopIconComponent } from 'assets/icons/stop.svg'

export const Container = styled.div`
  width: 622px;
`

export const BookWrapper = styled.div``

export const Book = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  padding: 16px;
  width: 100%;
  margin-left: -16px;
  margin-top: -16px;
  margin-bottom: 24px;
`

export const Rating = styled.div``

export const Name = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 8px;
  max-width: 248px;
`

export const ByAuthor = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
  font-size: 15px;
  color: grey;

  cursor: default;
`
export const Author = styled(RouterLink)`
  color: blue;
  text-decoration: none;
  margin-left: 3px;
  font-weight: 500;
  letter-spacing: 0.2px;
  :hover {
    text-decoration: underline;
  }
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
  object-fit: contain;
`

export const Tabs = styled.div`
  display: flex;
  flex-direcion: row;
  margin: 32px 0;
`

export const Tab = styled(RouterLink)`
  margin-right: 16px;
  color: grey;
  text-decoration: none;
  cursor: default;
  ${(props) =>
    props.selected &&
    `
    color: black;
  `}
  ${(props) =>
    !props.selected &&
    `
    :hover {
      color: black;
      text-decoration: underline;
    }
  `}
`

export const Chapters = styled.div`
  display: flex;
  flex-direction: column;
`

export const Chapter = styled.div`
  display: flex;
  flex-direcion: row;
  align-items: center;
  position: relative;
  font-size: 15px;
  margin-bottom: 16px;
`

export const Episodes = styled.div`
  display: flex;
  flex-direction: column;
`

export const Episode = styled.div`
  display: flex;
  flex-direcion: row;
  align-items: center;
  position: relative;
  margin-bottom: 16px;
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

export const Play = styled(PlayIconComponent)`
  width: 18px;
  height: 18px;
  fill: blue;
  margin-right: 3px;
  :hover {
    fill: #ae00ff;
  }
  ${(props) => props.playing && 'fill: #ae00ff;'}
`

export const Stop = styled(StopIconComponent)`
  width: 18px;
  height: 18px;
  fill: blue;
  margin-right: 3px;
  :hover {
    fill: #ae00ff;
  }
  ${(props) => props.playing && 'fill: #ae00ff;'}
`
