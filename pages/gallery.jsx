import ImageGallery from "@/components/ImageGallery";
import SecureRoute from "@/components/SecureRoute";
import NavigationBar from "@/components/NavigationBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer";

const Gallery = () => {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [imageLoading, setImageLoading] = useState([]);
  const searchTerm = "Interior design";
  const fetchImages = async () => {
    setImageLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchTerm,
            per_page: 25,
          },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );
      if (!response.error) {
        const { data } = response;
        console.log(data);
        setItems(data.results);
        setFilterItems(data.results);
        setImageLoading(false);
        return;
      }
      throw new Error("Could not fetch images");
    } catch (error) {
      toast.error(error.message);
      setImageLoading(false);
    }
  };
  useEffect(() => {
    if (accessKey && session?.user?.email) {
      fetchImages();
    }
    console.log(accessKey);
  }, [searchTerm, accessKey, session?.user]);

  useEffect(() => {
    setItems(items);
    console.log(items);
  }, [items]);
  function filterSearch(search) {
    const newImages = filterItems?.filter((image) => {
      const tags = image?.tags?.map((tag) => tag?.title?.toLowerCase());
      console.log(tags);
      if (tags.slice(0, 1).join(" ").includes(search.toLowerCase()))
        return image;
    });
    setItems(newImages);
  }
  return (
    <SecureRoute>
      <NavigationBar filterSearch={filterSearch} />
      <ImageGallery
        items={items}
        setItems={setItems}
        imageLoading={imageLoading}
      />
      <Footer />
    </SecureRoute>
  );
};

export default Gallery;
