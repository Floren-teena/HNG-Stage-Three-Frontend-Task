import React from "react";
import ImageCard from "./ImageCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  reactSwappingStrategy,
} from "@dnd-kit/sortable";
import { RotatingLines } from "react-loader-spinner";

const ImageGallery = ({ items, setItems, imageLoading }) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const oldIndex = items.findIndex((p) => p.id === active.id);
    const newIndex = items.findIndex((p) => p.id === over.id);
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  };
  return (
    <main className="w-full mt-[150px] min-h-screen">
      {imageLoading ? (
        <section className="w-full flex justify-center">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            visible={true}
          />
        </section>
      ) : (
        <>
          {items?.length === 0 ? (
            <section>
              <h1 className="text-2xl font-bold text-center mt-10">
                No images found. Search another!!!
              </h1>
            </section>
          ) : (
            <DndContext
              autoScroll={{ acceleration: 1 }}
              TouchSensor
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext items={items} strategy={reactSwappingStrategy}>
                <section className="grid xs:grid-cols-2 sm:grid-cols-3 touch-pan-y md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full justify-center px-8 md:px-12 lg:px-20">
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
