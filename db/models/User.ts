import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({ email: { type: String, unique: true, sparse: true }, name: String, oauthProvider: String }, { timestamps: true });
export const UserModel = mongoose.models.User ?? mongoose.model('User', UserSchema);
