import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'urql'
import { voteMutation, PollQuery } from 'api'
import 'assets/css/poll.css'
/* import moment from 'moment' */

const RadioOption = ({ picked, text, onClick }) => (
  <label className="radio">
    <input type="radio" className="radio_input visually-hidden" name="test" />
    <span onClick={onClick} className="radio_text">
      {text}
    </span>
    {picked && <div className="radio_text_picked" />}
  </label>
)

const VotesItem = ({ picked, text, length, number }) => {
  const l = length > 0.5 ? length : 0.5

  return (
    <div class="votes__item">
      <div class="votes__progress" style={{ width: `${l}%` }}></div>
      <div class="votes__num">{number?.toString()}</div>
      <div class="votes__title">{text}</div>
    </div>
  )
}

const VoteButton = ({ disabled, onClick }) => (
  <button
    class="btn btn-color"
    disabled={disabled}
    onClick={onClick}
    style={
      disabled
        ? {
            background: '#f3f3f3',
            pointerEvents: 'none',
            color: '#c5c5c5',
          }
        : {}
    }
  >
    Vote
  </button>
)

const options = [
  'I would be Very Disappointed if I don’t get to continue reading the story',
  'I would be Somewhat Disappointed if I don’t get to continue reading the story',
  'I would feel fine if I don’t get to read it anymore',
  // 'I am glad I don’t have to read it anymore',
  'I just want to see the results of this poll',
]

export default ({ chapterId }) => {
  const [opt, setOpt] = useState()
  const [form, setForm] = useState(false)

  useEffect(() => {
    setForm(false)
    setOpt()
  }, [chapterId])

  const [, vote] = useMutation(voteMutation)

  const [{ data: { poll = {} } = {}, error }, reexecuteQuery] = useQuery({
    query: PollQuery,
    variables: {
      chapterId,
    },
  })

  const getProgress = (index) => {
    const l = poll[`opt${index + 1}`] / poll.totalVotes
    return l.toFixed(3) * 100
  }

  if (error) return <p>Oh no... {error.message}</p>

  /*  const expired = Number(new Date(poll?.expires)) < Date.now()
   */
  const token = window?.localStorage.getItem('jwt')

  const hideForm = poll?.myVote !== 'none' || !token /* || expired */

  /* const expires = moment(poll.expires).toNow(true) */

  return poll ? (
    <div className="votes">
      <div className="container">
        <div className="row">
          <div className="votes__count">{poll.totalVotes} VOTES</div>
          {hideForm || form ? (
            <div className="votes__result">
              {options.map((text, index) =>
                index < 3 ? (
                  <VotesItem
                    picked={`opt${index + 1}` === poll.myVote}
                    text={text}
                    number={poll[`opt${index + 1}`]}
                    length={getProgress(index)}
                  />
                ) : null,
              )}
              {/*
              <div className="votes__button">
                <div class="votes__time">expires in {expires}</div>
              </div>
              */}
            </div>
          ) : (
            <div className="votes__form">
              {options.map((text, index) => (
                <RadioOption
                  onClick={() => setOpt(index + 1)}
                  picked={index + 1 === opt}
                  text={text}
                />
              ))}
              <div className="votes__button">
                <VoteButton
                  disabled={!opt}
                  onClick={() => {
                    opt !== 4
                      ? vote({
                          pollId: poll.id,
                          chapterId,
                          option: `opt${opt}`,
                        }).then((r) =>
                          reexecuteQuery({ requestPolicy: 'network-only' }),
                        )
                      : setForm(true)
                  }}
                />
                {/* !expired ? (
                  <div class="votes__time">expires in {expires}</div>
                ) : (
                  <div class="votes__time">expired</div>
                )*/}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null
}
