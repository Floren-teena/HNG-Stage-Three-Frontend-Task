import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";
import { DndContext, closestCenter, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, reactSwappingStrategy } from '@dnd-kit/sortable';
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useSession } from "next-auth/react";

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const ImageGallery = () => {
const { data: session, status } = useSession();
const mouseSensor = useSensor(MouseSensor);
const touchSensor = useSensor(TouchSensor);
const keyboardSensor = useSensor(KeyboardSensor);
const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const [items, setItems] = useState([]);
  const [imageLoading, setImageLoading] = useState([]);
  const searchTerm = "Interior design";
  const fetchImages = async () => {
    setImageLoading(true);
    try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: searchTerm,
        per_page: 25,
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    if(!response.error){
    const {data}=response
    console.log(data);
    setItems(data.results);
    setImageLoading(false)
    return 
 }
    throw new Error("Could not fetch images")
    } catch (error) {
      toast.error(error.message)
      setImageLoading(false)
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

	const handleDragEnd = (event) => {
		const { active, over } = event;
		const oldIndex = items.findIndex((p) => p.id === active.id);
		const newIndex = items.findIndex((p) => p.id === over.id);
		setItems((items) => arrayMove(items, oldIndex, newIndex));
	};
    return (
		<main className='w-full min-h-screen'>
			{imageLoading ? (
				<section className='w-full flex justify-center'>
                <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='30' visible={true} />
				</section>
			) : (
				<>
					{items?.length === 0 ? (
						<section>
							<h1 className='text-2xl font-bold text-center mt-10'>No images found. Search another!!!</h1>
						</section>
					) : (
						<DndContext autoScroll={{ acceleration: 1 }} TouchSensor collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
							<SortableContext items={items} strategy={reactSwappingStrategy}>
								<section className='grid xs:grid-cols-2 sm:grid-cols-3 touch-pan-y md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full justify-center px-8 md:px-12 lg:px-20'>
									{items?.map((image, index) => (
										<ImageCard key={image.id} image={image} />
									))}
								</section>
							</SortableContext>
						</DndContext>
					)}
				</>
			)}
		</main>
	);
};

export default ImageGallery;
