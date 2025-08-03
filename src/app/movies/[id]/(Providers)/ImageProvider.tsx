'use client'

import { createContext } from 'react'

export type MovieImage = {
  readonly url: string
  readonly base64: string
}
type Props = {
  readonly children: React.ReactNode
  readonly image: MovieImage
}

export const ImageContext = createContext({})

export default function ImageProvider({ children, image }: Props) {
  return <ImageContext.Provider value={image}>
    {children}
  </ImageContext.Provider>
}
