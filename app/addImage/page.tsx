"use client"
import React from 'react'
import { useState,  } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const AddImage = ()=>{
const [image, setImage] = useState(null)
const [imagePreview, setImagePreview] = useState <string | null> (null)
const [statusMessage, setStatusMessage] = useState <string | null> (null);
const router = useRouter();
const authToken = process.env.IMGUR_AUTH_TOKEN;

const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
const files:any = e.target.files?.[0];
setImage(files);
setImagePreview(URL.createObjectURL(files))
}

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();
if(!image){
 setStatusMessage("please select an image to upload")
 return;
}
const formData = new FormData();
formData.append('image', image);
setStatusMessage('Uploading...');
try {
  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization:`Bearer ${authToken}`,
    },
    body: formData,
  });
    // Read the response as text
    const text = await response.text(); 
    console.log("Response Text:", text); // Log the raw response

    // Check if the response is okay (status in the range 200-299)
    if (response.ok) {
      const data = JSON.parse(text); // Parse it as JSON only if successful
      if (data.success) {
        setStatusMessage("Image uploaded successfully!");
        alert("Image uploaded");
        router.back();
        setImagePreview('');
      } else {
        setStatusMessage("Upload failed. Please try again.");
      }
    } else {
    setStatusMessage("Upload failed. Please try again.");
  }
} catch (error) {
  console.error("Error uploading image:", error);
  setStatusMessage("An error occurred during upload.");
}
};
return(
  <div className="flex justify-center items-center h-screen">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-20 rounded-lg shadow-lg w-96 "
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
        className="block w-full text-sm text-gray-500 file:mr-4 
                   file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 
                   file:text-sm file:font-medium hover:file:bg-gray-100
                   hover:file:text-gray-700 file:cursor-pointer mb-4"
      />
      <button
        type="submit"
        className="w-full bg-violet-300 text-white py-2 rounded-lg 
                   hover:bg-violet-400 transition-colors duration-300"
      >
        Upload
      </button>
      {imagePreview && (
        <div className="mt-4">
          <Image
            src={imagePreview}
            alt="Image Preview"
            width={700}
            height={700}
            className="rounded-lg"
          />
        </div>
      )}
    </form>
  </div>
)
}

export default AddImage