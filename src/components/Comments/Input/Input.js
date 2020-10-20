import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import Flex from 'components/Flex'

import * as S from './Input.styled'

// value
// setValue
// onSubmit
// placeholder
// style
// inputStyle
// showAvatar
export default ({
  initialValue = '',
  onSubmit = () => {},
  placeholder = 'Type something',
  style = { marginBottom: 50 },
  inputStyle = {},
  showAvatar = true,
  autoFocus = false,
}) => {
  const { user } = useContext(UserContext)
  const [value, setValue] = useState(initialValue)
  const canSubmit = user && value !== ''

  const submit = (value) => {
    onSubmit(value)
    setValue('')
  }

  return (
    <Flex row alignCenter style={style}>
      {user && showAvatar && <S.Avatar src={user.avatar} alt={user.fullname} />}
      <S.InputWrapper
        row
        alignCenter
        justifyBetween
        active={value !== ''}
        style={{
          height: 'auto',
          alignItems: 'flex-end',
          paddingRight: 0,
          position: 'relative',
        }}
      >
        <S.Input
          id="comments-input"
          placeholder={placeholder}
          value={value}
          style={inputStyle}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canSubmit) {
              e.preventDefault()
              submit(value)
            }
          }}
          autoFocus={autoFocus}
          style={{
            resize: 'none',
            paddingRight: '60px',
          }}
        />
        <S.SendButton
          onClick={() => canSubmit && submit(value)}
          active={value !== ''}
        >
          <svg
            className="comment-editor__send-button-icon"
            width={20}
            height={20}
            viewBox="0 0 22 22"
            fill="white"
          >
            <use xlinkHref="#icon-send-button--inline" />
          </svg>
        </S.SendButton>
      </S.InputWrapper>
    </Flex>
  )
}
