import styled from 'styled-components'

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.96);
  z-index: 1;
`
export const Modal = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  padding: 16px;
  z-index: 2;
`

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 8px;
  border-radius: 100%;
  user-select: none;
  background: white;
`
export const Input = styled.input`
  border: 1px solid #e0e0e0;
  height: 18px;
  outline: none;
  :hover,
  :focus {
    border: 1px solid blue;
    margin-bottom: 0;
  }
`
export const Ok = styled.button`
  margin-left: 4px;
`

export const Error = styled.span`
  font-size: 13px;
  color: #ae00ff;
`
