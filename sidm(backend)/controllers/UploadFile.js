var uuid = require('uuid');
const UploadFile = (req, res) => {
  let sampleFile;
  let uploadPath;
  let filename = uuid.v1();
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.json({ status: 400, message: 'No files were uploaded.' });
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  uploadPath = __dirname + '/../uploads/' + filename + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.json({ status: 500, message: "Something Went Wrong", err });

    res.send(filename + sampleFile.name);
  });
}
module.exports = UploadFile