import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const ImageGallery = () => {
  const [items, setItems] = useState([]);
  const [imageLoading, setImageLoading] = useState([]);
  const searchTerm = "dogs";
  const fetchImages = async () => {
    setImageLoading(true);
    const { data } = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: searchTerm,
        per_page: 25,
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    console.log(data);
    setItems(data.results);
  };
  useEffect(() => {
    if (accessKey) {
      fetchImages();
    }
    console.log(accessKey);
  }, [searchTerm, accessKey]);
  return (
    <div className="w-full">
      <section className='grid xs:grid-cols-2 sm:grid-cols-3 touch-pan-y md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full justify-center px-8 md:px-12 lg:px-20'>
									{items?.map((image, index) => (
										<ImageCard key={image.id} image={image} />
									))}
								</section>
    </div>
  );
};

export default ImageGallery;
