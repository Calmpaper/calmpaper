export const getChapterPage = (chapter) =>
  chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1
