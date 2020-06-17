import styled from 'styled-components'

export const Form = styled.form.attrs({
  id: 'new-book-form',
})`
  display: flex;
  flex-direction: column;
  width: 600px;
`

export const Input = styled.input`
  margin-top: 8px;
`

export const Textarea = styled.textarea`
  margin-top: 8px;
  height: 140px;
`

export const Button = styled.button`
  margin-top: 8px;
`

export const Error = styled.span`
  margin-top: 4px;
  font-size: 13px;
  color: rebeccapurple;
`
