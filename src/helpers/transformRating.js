export const transformRating = (rating) =>
  rating === undefined || rating === null
    ? 'N/A'
    : rating > 70
    ? 'S++'
    : rating > 60
    ? 'S+'
    : rating > 50
    ? 'S'
    : rating > 40
    ? 'A'
    : rating > 30
    ? 'B'
    : rating > 20
    ? 'C'
    : 'D'
