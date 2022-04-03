const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
var upload = multer({ storage: storage });
app.use('/uploads', express.static(__dirname + '/uploads'));
app.post('/api/image-upload', upload.single('image'), (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + '/';

  res.send(
    apiResponse({
      message: 'File uploaded successfully.',
      path: fullUrl + res.req.file.path,
    })
  );
});

function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
