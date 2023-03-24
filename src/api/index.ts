import express from 'express';

import uploadRoute from './routes/uploadRoute';
import MessageResponse from '../interfaces/MessageResponse';
import passport from 'passport';

const router = express.Router();

router.use(passport.initialize());

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'routes: auth, user, cat',
  });
});

router.use('/upload', uploadRoute);

export default router;
