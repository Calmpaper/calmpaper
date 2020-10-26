import { useEffect } from 'react'

export function useBookCover() {
  // This crap is done for book cover resizing. Improve later
  useEffect(() => {
    const $ = window.$
    $(document).ready(function () {
      $('.book-cover').each(function (index, value) {
        var coverWidth = $(this).width()
        if (coverWidth < 100) {
          $(this).css('padding', '0 5px')
        }
      })

      $('.book-cover__title').each(function (index, value) {
        var coverWidth = $(this).parent().width()
        var coverFont = (coverWidth / 100) * 20
        $(this).css('font-size', coverFont)
        if (coverWidth < 100) {
          var coverFont = (coverWidth / 100) * 20
          $(this).css('font-size', coverFont)
        }
      })

      $('.book-cover__author').each(function (index, value) {
        var coverWidth = $(this).parent().width()
        var coverFont = (coverWidth / 100) * 8
        $(this).css('font-size', coverFont)
        if (coverWidth < 100) {
          var coverFont = (coverWidth / 100) * 10
          $(this).css('font-size', coverFont)
          $(this).css('bottom', '6%')
        }
        if (coverWidth < 70) {
          $(this).css('bottom', '2%')
        }
      })
    })
  }, [])
}
