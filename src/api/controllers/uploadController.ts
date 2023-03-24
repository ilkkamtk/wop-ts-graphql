import {Request, Response, NextFunction} from 'express';
import {Point} from 'geojson';
import CustomError from '../../classes/CustomError';

const catPost = async (
  req: Request<{}, {}, {}, {}, {coords: Point}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      throw err;
    }
    const output = {
      message: 'cat uploaded',
      data: {
        filename: req.file.filename,
        location: res.locals.coords,
      },
    };

    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export {catPost};
