import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useForm } from 'react-hook-form'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import { useMutation } from 'urql'
import { loginMutation } from 'api'

export default () => {
  const { register, handleSubmit, errors, watch } = useForm()
  const { login: onLogin } = useContext(UserContext)

  const [, login] = useMutation(loginMutation)
  const onSubmit = async (data) => {
    login(data).then(({ data }) => {
      if (data) {
        const res = data.login

        onLogin(res.token)
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
              Log In
            </span>
          </div>
          {/*
          <div className="col">
            <a href className="pagination__link">
              Register
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
            Try Calmpaper with your team, for free
          </h1>
          <p className="form-subtitle">
            Create a brand-new workspace for you and <br />
            your team
          </p>
          <form action>
            <input
              name="email"
              type="text"
              className="input"
              placeholder="user@calmpaper.com"
              ref={register({ required: 'Enter email' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Enter password"
              ref={register({ required: 'Enter password' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <button
              className="btn btn-color"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Log In
            </button>
            {/*
            <div className="form-checkbox">
              <input type="checkbox" id="check1" defaultChecked />
              <label htmlFor="check1">
                <div className="check-icon">
                  <svg className="icon icon-check">
                    <use xlinkHref="#icon-check" />
                  </svg>
                </div>{' '}
                <span className="check-text">Remember me</span>
              </label>
            </div>
            */}
          </form>
        </div>
      </div>
      <Footer centered />
    </>
  )
}
