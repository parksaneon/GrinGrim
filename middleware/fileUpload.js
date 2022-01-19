import multer from 'multer';

export const userUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/users/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
  limits: { fieldSize: 5 * 1024 * 1024 }
});

export const drawingUpload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'images/drawings/');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});
