"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImgurImage } from "./interface"; 

const DisplayImages = () => {
  const [images, setImages] = useState<ImgurImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authToken = process.env.IMGUR_AUTH_TOKEN;

  // Fetch images from Imgur
  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.imgur.com/3/account/me/images", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log(data)

      if (data.success) {
        setImages(data.data);
      } else {
        setError("Failed to fetch images.");
      }
    } catch (err) {
      {console.log("Using token:", authToken);
      }
      console.error("Error fetching images:", err);
      setError("An error occurred while fetching images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {loading && <p>Loading images...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-8">
        {images.map((image) => (
          <div key={image.id} className="">
            <img className="w-full object-cover aspect-square"
              src={image.link}
              alt={image.title || "Uploaded Image"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayImages;
