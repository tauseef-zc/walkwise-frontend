import React from 'react'

const useAssetsHelper = () => {
  
    const getImage = (url: string) => {
        return `${process.env.NEXT_PUBLIC_ASSETS_URL}${url}`;
    }

    return {
        getImage
    }
}

export default useAssetsHelper
