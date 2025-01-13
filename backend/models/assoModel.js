import User from "./userModel.js";
import Image from "./imageModel.js";

User.hasMany(Image, {foreignKey: 'UserId'});
Image.belongsTo(User, {foreignKey: 'UserId'});


export {User, Image};