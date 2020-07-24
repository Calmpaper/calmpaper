import styled from 'styled-components'

export const Notification = styled.div`
  padding: 12px 20px;
  :hover {
    background: #e6efff;
  }
`

export const BookCover = styled.img`
  width: 48px;
  margin-right: 12px;
  box-shadow: 0px 4px 4px rgba(44, 26, 22, 0.2);
  border-radius: 4px;
  align-self: center;
`

export const User = styled.span`
  font-weight: 500;
  font-size: 13px;
`

export const Body = styled.div`
  font-size: 13px !important;
  white-space: pre-wrap;
  line-height: 19px;
`

export const Name = styled.span`
  font-weight: 500;
  color: hsl(255, 8%, 22%);
  font-size: 13px;
  margin-right: 4px;
  display: inline-block;
`

export const Avatar = styled.span`
  ${Notification}:hover & {
    border-color: #e6efff;
  }
`
