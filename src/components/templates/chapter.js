import * as molecules from 'components/molecules'
import * as organisms from 'components/organisms'

export const chapter = ({ chapter }) => {
  const links = [
    {
      label: chapter.book.name,
      href: `/books/[book]`,
      as: `/books/${chapter.book.id}`,
    },
    { label: chapter.title },
  ]

  const sendComment = () => {}

  return (
    <>
      <molecules.header />
      <div className="page-read-book">
        <molecules.breadcrumbs links={links} />
        <organisms.chapter links={links} />
        <organisms.comments
          comments={chapter.comments}
          onSubmit={sendComment}
        />
      </div>
      <molecules.footer centered />
    </>
  )
}
