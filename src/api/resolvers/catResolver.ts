import {Cat} from '../../interfaces/Cat';
import {locationInput} from '../../interfaces/Location';
import rectangleBounds from '../../utils/rectangleBounds';
import catModel from '../models/catModel';

export default {
  Query: {
    cats: async () => {
      return await catModel.find();
    },
    catById: async (_parent: undefined, args: Cat) => {
      return await catModel.findById(args.id);
    },
    catsByOwner: async (_parent: undefined, args: Cat) => {
      return await catModel.find({owner: args.owner});
    },
    catsByArea: async (_parent: undefined, args: locationInput) => {
      const bounds = rectangleBounds(args.topRight, args.bottomLeft);
      return await catModel.find({
        location: {
          $geoWithin: {
            $geometry: bounds,
          },
        },
      });
    },
  },
  Mutation: {
    createCat: async (_parent: undefined, args: Cat) => {
      console.log(args);
      const cat = new catModel(args);
      return await cat.save();
    },
    updateCat: async (_parent: undefined, args: Cat) => {
      const cat = await catModel.findByIdAndUpdate(args.id, args);
      return cat;
    },
    deleteCat: async (_parent: undefined, args: Cat) => {
      const cat = await catModel.findByIdAndDelete(args.id);
      return cat;
    },
  },
};
