export default ({ user }) => (
  <Link
    to={`/users/${user.id}`}
    className="btn-login"
    style={{
      width: 'auto',
      padding: '0 6px',
      userSelect: 'none',
      fontWeight: 500,
    }}
  >
    <img
      width="24"
      height="24"
      alt="Avatar"
      src={user.avatar}
      style={{ borderRadius: '100%', marginRight: 6 }}
    />
    {user.username || user.givenname}
  </Link>
)
