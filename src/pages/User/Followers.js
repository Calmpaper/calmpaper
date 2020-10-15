import React from 'react'
import { Link } from 'react-router-dom'
import { getUserSlug } from 'helpers'
import Flex from 'components/Flex'

const User = ({ user }) => (
  <Flex
    row
    alignCenter
    justifyBetween
    className="item"
    style={{ cursor: 'default' }}
  >
    <Flex row alignCenter>
      <img
        src={user.avatar}
        alt="Avatar"
        style={{ width: 48, height: 48, borderRadius: 6 }}
      />
      <div className="item-info" style={{ width: '100%' }}>
        <div className="item-head">
          <h3 className="item-title">{user.username || user.fullname}</h3>
        </div>
      </div>
    </Flex>
    <Link className="btn btn-color" to={`/${getUserSlug(user)}`}>
      Visit
    </Link>
  </Flex>
)

export default ({ users }) => {
  return (
    <div className="latest" style={{ marginTop: 25 }}>
      <div className="container" style={{ padding: 0 }}>
        <div className="row">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}
