import React from 'react'
import Link from 'next/link'

export const breadcrumbs = ({ links }) => (
  <div className="pagination">
    <Link href={link.href} as={link.as}>
      <a className="pagination__link">{link.label}</a>
    </Link>
    <svg className="icon icon-arrow-right">
      <use xlinkHref="#icon-arrow-right" />
    </svg>
    {links.map((link, index) => {
      const isLast = index !== links.length - 1

      if (isLast) {
        return (
          <>
            <Link href={link.href} as={link.as}>
              <a className="pagination__link">{link.label}</a>
            </Link>
            <svg className="icon icon-arrow-right">
              <use xlinkHref="#icon-arrow-right" />
            </svg>
          </>
        )
      }

      return <span className="pagination__link active">{chapter.title}</span>
    })}
  </div>
)
