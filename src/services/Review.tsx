
export const reviewPath = 'api/reviews'

type Options = {
  signal?: AbortSignal
}

const Review = {
  async getAll(movieName: string, options: Options = {}): Promise<Review[]> {
    const res = await fetch(`/${reviewPath}?movie=${movieName}`, options)
    const { data } = await res.json()

    return data
  }
}

export default Review
