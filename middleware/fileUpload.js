import multer from 'multer';

const imgUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
  limits: { fieldSize: 5 * 1024 * 1024 }
});

export default imgUpload;
