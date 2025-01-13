import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import Image from '../models/imageModel.js'

class ImageController{

    static async addImage(data){
        console.log(data);
        const { UserId, image_url, title, description } = data;

        for (const key of ['UserId','image_url']){
            if(!data[key]){
                return ({status: 'error', message:`feild ${key} is required`});
            }
        }
        const user = await User.findByPk(UserId);
        if(!user){
            return ({status: 'error', message:"user not found"});
        }
       const createData = {
        UserId,
        image_url,
        title,
        description,
       };
       try {

        const image = await Image.create(createData);
        return { status: 'success', message: `image created`, id: image.id };

       } catch (error) {
        console.error('error creating image, error:', error);
        return { status: 'error', message: "failed to create image" };
       }
}

static async retrieve(userId){
    try {
        const images = await Image.findAll( {
          where: {
             UserId: userId,
    }
});
if (!images || images.length === 0) {
    return { status: 'error', message: "No images found for this user" };
}

return { status: 'success', message: `Images retrieved`, images};
} catch (error) {
console.error('Error retrieving images:', error);
return { status: 'error', message: "Failed to get images" };
}
}


}

export default ImageController;