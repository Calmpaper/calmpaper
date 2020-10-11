const regex = /(<([^>]+)>)/gi

export const removeHtmlTags = (string) => string.replace(regex, '')
