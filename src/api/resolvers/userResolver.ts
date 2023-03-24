import {Cat} from '../../interfaces/Cat';
import {User} from '../../interfaces/User';
import userModel from '../models/userModel';

export default {
  Query: {
    users: async () => {
      return await userModel.find();
    },
    userById: async (_parent: undefined, args: User) => {
      return await userModel.findById(args.id);
    },
  },
  Cat: {
    owner: async (parent: Cat) => {
      return await userModel.findById(parent.owner);
    },
  },
  Mutation: {
    createUser: async (_parent: undefined, args: User) => {
      const user = new userModel(args);
      return await user.save();
    },
    updateUser: async (_parent: undefined, args: User) => {
      const user = await userModel.findByIdAndUpdate(args.id, args);
      return user;
    },
    deleteUser: async (_parent: undefined, args: User) => {
      const user = await userModel.findByIdAndDelete(args.id);
      return user;
    },
  },
};
