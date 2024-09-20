const Review = {
  async getAll(movieName:string): Promise<Review[]> {
    const res = await fetch(`/api/reviews?movie=${movieName}`)
    const { data } = await res.json()

    return data
  }
}

export default Review
