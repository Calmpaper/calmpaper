import { useQuery } from 'urql'
import { getLastChaptersQuery } from 'api'

import * as molecules from 'components/molecules'
import * as atoms from 'components/atoms'

export const chapters_feed = ({ chapters, sort }) => {
  // const [{ data: { chapters = [] } = {}, fetching, error }] = useQuery({
  //   query: getLastChaptersQuery,
  // })

  // if (fetching) return <atoms.loader />
  // if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="latest">
      <div className="container">
        <div className="row">
          <h2 className="title size02">Latest Updates</h2>
        </div>
        <div className="row">
          {(chapters || [])
            .filter((c) => !!c.book.image)
            .map((chapter) => {
              const chapterPage =
                chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1

              return <molecules.chapter key={chapter.id} />
            })}
        </div>
      </div>
    </div>
  )
}
