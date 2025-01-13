'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const UserImages = () => {
    const [images, setImages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    const URL = 'https://projects-a5kn.onrender.com';
    const router = useRouter();
    useEffect(() => {
        
        const fetchUserImages = async () => {
            const userId = localStorage.getItem('userid'); // Ensure this is stored when the user logs in
            if (!userId) {
                setError('User not found');
                router.push('/');
            }

            try {
              const userToken = localStorage.getItem('token');
              const response = await fetch(`${URL}/api/image/retrieve`, {
                method: 'GET', // Use 'GET' for retrieving data
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                    'Authorization': `Bearer ${userToken}` // Add the token to the Authorization header
                }
            });
                const data = await response.json();

                if (response.ok) {
                    setImages(data.images);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error("Error fetching user images:", error);
                setError('Failed to fetch user images');
            }
        };

        fetchUserImages();
    }, []);

    return (
        <div className='m-8 '>
            <h2 className='uppercase antialiased font-bold text-xl text-gray-500 text-center mb-4'>Your memory</h2>
            {error && <p>{error}</p>}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} className='p-2 bg-violet-100 mb-6 rounded overflow-hidden shadow'>
                            <img src={image.image_url} alt={image.title}
                            className='w-full object-cover aspect-square'/>
                            <h2 className=' capitalize mt-4 mb-4  '>{image.title}</h2>
                            <p className=' capitalize mt-4 mb-4  '>{image.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No images found.</p>
                )}
            </div>
        </div>
    );
};

export default UserImages;
