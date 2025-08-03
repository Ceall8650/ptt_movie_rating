
export const reviewPath = 'api/reviews'

export type Review = {
  author: string,
  category: string[],
  date: string,
  link: string,
  nrec: number,
  title: string,
}

const Review = {
  async getAll(movieName: string, options: RequestInit = {}): Promise<Review[]> {
    const res = await fetch(`/${reviewPath}?movie=${movieName}`, options)
    const { data } = await res.json()

    return data
  }
}

export default Review
