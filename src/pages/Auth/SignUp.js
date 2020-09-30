import React, { useRef, useContext } from 'react'
import { UserContext } from 'context'
import { useForm } from 'react-hook-form'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import { useMutation } from 'urql'
import { signupMutation } from 'api'

export default () => {
  const { register, handleSubmit, errors, watch } = useForm()
  const password = useRef({})
  const { signup: onSignup } = useContext(UserContext)
  password.current = watch('password', '')
  const [, signup] = useMutation(signupMutation)
  const onSubmit = async (data) => {
    signup(data).then(({ data }) => {
      if (data) {
        const res = data.signup

        onSignup(res.token)
      }
    })
  }

  return (
    <>
      <Header withLine />
      <div className="page-registration">
        <div className="pagination">
          <div className="col">
            <a href className="pagination__link">
              Home
            </a>
            <svg className="icon icon-arrow-right">
              <use xlinkHref="#icon-arrow-right" />
            </svg>
            <span href className="pagination__link active">
              Register
            </span>
          </div>
          {/*
          <div className="col">
            <a href className="pagination__link">
              Login
            </a>
            <span>·</span>
            <a href className="pagination__link">
              Lost password
            </a>
          </div>
          */}
        </div>
        <div className="form-box">
          <h1 className="form-title title size02">
            Account <br />
            registration
          </h1>
          <p className="form-subtitle">Is your team already using Calmpaper?</p>
          <form action>
            <input
              name="username"
              type="text"
              className="input"
              placeholder="Username"
              ref={register({ required: 'Name is required' })}
            />
            {errors.username && <p>{errors.username.message}</p>}
            <input
              name="email"
              type="text"
              className="input"
              placeholder="Email"
              ref={register({ required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              ref={register({
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input
              name="password_repeat"
              type="password"
              className="input"
              placeholder="Confirm password"
              ref={register({
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
            />
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
            <button
              className="btn btn-color"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </button>
            <div className="form-checkbox">
              <input
                name="terms"
                id="check1"
                type="checkbox"
                ref={register({
                  required: 'Terms must be accepted',
                })}
              />
              {errors.terms && <p>{errors.terms.message}</p>}

              <label htmlFor="check1">
                <div className="check-icon">
                  <svg className="icon icon-check">
                    <use xlinkHref="#icon-check" />
                  </svg>
                </div>{' '}
                <span className="check-text">
                  By registering, you agree to our <a href>privacy police</a>{' '}
                  &amp; <a href>terms</a>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>
      {/*
      <Footer centered />
*/}
    </>
  )
}
