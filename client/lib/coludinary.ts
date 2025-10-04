
export const handleImageUpload = async (file: File): Promise<string> => {
    if (!file) throw new Error('No file provided');
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error('File size must be less than 5MB');
    }
    
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET as string);
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME as string);
    
    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: data
        });
        
        if (!res.ok) {
            throw new Error(`Upload failed: ${res.statusText}`);
        }
        
        const imageData = await res.json();
        
        if (imageData.error) {
            throw new Error(imageData.error.message);
        }
        
        return imageData.secure_url || imageData.url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image. Please try again.');
    }
};

