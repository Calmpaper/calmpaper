const regex = /(<([^>]+)>)/gi

export const removeHtmlTags = (string, replaceWithSpace = false) =>
  string.replace(regex, replaceWithSpace ? ' ' : '')
