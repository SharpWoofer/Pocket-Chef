/**
 * global upload api
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const UploadController = (req, res) => {
    const mFile = req.file
    res.send({ path: '/assets/' + mFile.filename })
  }