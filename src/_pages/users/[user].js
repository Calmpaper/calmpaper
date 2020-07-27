import Head from 'next/head'
import * as templates from 'components/templates'
import { getUser, getUsers } from 'api'

// <meta name="twitter:card" content="summary" />
// <meta name="twitter:url" content="https://yourdomain.com" />
// <meta name="twitter:title" content="PWA App" />
// <meta name="twitter:description" content="Best PWA App in the world" />
// <meta
//   name="twitter:image"
//   content="https://yourdomain.com/static/icons/android-chrome-192x192.png"
// />
// <meta name="twitter:creator" content="@DavidWShadow" />
// <meta property="og:type" content="website" />
// <meta property="og:title" content="PWA App" />
// <meta property="og:description" content="Best PWA App in the world" />
// <meta property="og:site_name" content="PWA App" />
// <meta property="og:url" content="https://yourdomain.com" />
// <meta
//   property="og:image"
//   content="https://yourdomain.com/static/icons/apple-touch-icon.png"
// />
//
const User = ({ user }) => {
  const meta = {
    title: `${user.username || user.fullname} at Calmpaper`,
    description: 'Calmpaper author',
    image: user.avatar,
    url: `https://calmpaper.com/authors/${user.id}`,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={meta.url} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:creator" content="@Calmpaper" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:site_name" content="Calmpaper" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} />
      </Head>
      <templates.user user={user} />
    </>
  )
}

export const getStaticProps = async (context) => {
  const { user: userSlug } = context.params
  const user = await getUser(userSlug)

  return {
    props: {
      user,
    },
  }
}

export const getStaticPaths = async () => {
  const users = await getUsers()

  return {
    paths: users.map(({ id }) => ({
      params: { user: `${id}` },
    })),
    fallback: true,
  }
}

export default User
