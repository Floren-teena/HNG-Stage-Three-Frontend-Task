import ImageGallery from '@/components/ImageGallery'
import React from 'react'
import SecureRoute from '@/components/SecureRoute'

const gallery = () => {
  return (
    <SecureRoute>
      <ImageGallery />
    </SecureRoute>
  )
}

export default gallery
