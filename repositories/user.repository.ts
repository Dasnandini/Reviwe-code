import User, { type IUser, type UserDocument } from "@/model/User";

export class UserRepository {
  async createUser(user: IUser): Promise<UserDocument> {
    const newUser = new User(user);
    return await newUser.save();
  }


  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return await User.findOne({ email });
    }


    async findUserById(id: string): Promise<UserDocument | null> {
    return await User.findById(id);
  }

  async updateUser(id: string, updatedData: Partial<IUser>): Promise<UserDocument | null> {
    return await User.findByIdAndUpdate(id, updatedData, { new  : true });      
  }


  async deleteUser(id: string): Promise<UserDocument | null> {  
    return await User.findByIdAndDelete(id);
  }
  async getAllUsers(): Promise<UserDocument[]> {
    return await User.find();
  } 

  async existsByEmail(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    return !!user;
  } 
}
