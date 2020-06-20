import React, { useContext } from 'react'
import { UserContext, ModalContext } from 'context'
import { useForm } from 'react-hook-form'
import useMagicLink from 'use-magic-link'
import Flex from 'components/Flex'
import * as S from './Modal.styled'

const hashcode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

export default () => {
  const { close: closeModal } = useContext(ModalContext)
  const { createUser, setUser } = useContext(UserContext)
  const { register, handleSubmit, watch, errors } = useForm()
  // const auth = useMagicLink('pk_test_5A07EBF17066B853')

  // function loginNow(email) {
  //   auth.login(email)
  // }

  return (
    <S.Overlay>
      <S.Modal>
        <S.Form
          onSubmit={handleSubmit((data) => {
            // loginNow(`${data.username}@gmail.com`)

            return createUser(data).then(({ data: res }) => {
              const user = res.createOneUser
              if (user) {
                window.lf.setItem('user', user).then(() => {
                  setUser(user)
                  closeModal()
                })
              }
            })
          })}
        >
          <S.Avatar
            src={`https://www.gravatar.com/avatar/${hashcode(
              watch('username') || '',
            )}?d=robohash&f=y`}
          />
          <Flex column>
            {errors.username && <S.Error>Choose a name.</S.Error>}
            <S.Input
              name="username"
              placeholder="username"
              autoFocus
              ref={register({ required: true })}
            />
          </Flex>
          <S.Ok>Ok</S.Ok>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  )
}
