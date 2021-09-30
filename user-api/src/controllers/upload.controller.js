export default {
  /**
   * Return uploaded files in the test route
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  testUploadSingleFile: async (req, res) => {
    try {
      const file = await req.file;
      res.status(200).json({
        status: 'success',
        message: 'Upload single file function is working',
        fileDetails: file,
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Unable to upload file',
        error: err.message,
      });
    }
  },
  /**
   * Return uploaded files in the test route
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  testUploadMultipleFiles: async (req, res) => {
    try {
      const files = await req.files;
      res.status(200).json({
        status: 'success',
        message: 'Upload files function is working',
        filesDetails: files,
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Unable to upload files',
        error: err.message,
      });
    }
  },
  /**
   * This controller handle the file requested
   * in a route that use the MulterToGCS middleware
   * The middleware defined is MulterGCS.single('file')
   * This means that will return an object with file information
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  testUploadSingleFileToGCS: async (req, res) => {
    try {
      const file = await req.file;
      res.status(200).json({
        status: 'success',
        message: 'Upload single file To GCS  working',
        fileDetails: file,
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Unable to upload file to gcs',
        error: err.message,
      });
    }
  },
  /**
   * This controller handle the file requested
   * in a route that use the MulterToGCS middleware
   * The middleware defined is MulterGCS.any()
   * This means that will return an array
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  testUploadMultipleFilesToGCS: async (req, res) => {
    try {
      const files = await req.files;
      res.status(200).json({
        status: 'success',
        message: 'Upload multiple files to GCS is working',
        fileDetails: files,
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Unable to upload files to gcs',
        error: err.message,
      });
    }
  },
};
