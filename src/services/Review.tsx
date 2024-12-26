
export const reviewPath = 'api/reviews'

const Review = {
  async getAll(movieName: string, options: RequestInit = {}): Promise<Review[]> {
    const res = await fetch(`/${reviewPath}?movie=${movieName}`, options)
    const { data } = await res.json()

    return data
  }
}

export default Review
