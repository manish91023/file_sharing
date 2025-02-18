const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const fse = require("fs-extra");
const path = require("path");
const { auth } = require("express-oauth2-jwt-bearer");
const {Dropbox}=require("dropbox")


const storage = multer.diskStorage({  
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Ensure this is correct
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Store with the original name
  }
});

const upload = multer({ storage: storage });

app.use(cors({
  origin: "https://eloquent-sunburst-c3c111.netlify.app",
}))
app.use(express.json());
app.use(express.urlencoded({extended: true }));

const PORT = process.env.PORT || 5000;
const DOMAIN = process.env.CLIENT_DOMAIN;
const AUDIENCE = process.env.AUDIENCE;

//middleware
const checkJwt = auth({
  audience: AUDIENCE,
  issuerBaseURL: `https://${DOMAIN}/`,
  tokenSigningAlg: "RS256",
}); 


const dropboxAccessToken = process.env.DROPBOXACCESSTOKEN; 
const dbx = new Dropbox({ accessToken: dropboxAccessToken });
 
app.post('/api/ftp/upload',checkJwt,upload.single("file"), async (req, res) => {
  console.log("request came")
   try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    } 
    const tempPath = req.file.path; 
    const originalName = req.file.originalname; 
    const targetPath = path.join(__dirname, 'uploads', originalName); 

    // console.log(`Temp Path: ${tempPath}`);
    // console.log(`Target Path: ${targetPath}`);
    if (tempPath === targetPath) {
      // console.log("Source and destination paths are the same");
      return res.status(400).send('Source and destination paths are the same.');
    }

    
    const fileContent = await fse.readFile(targetPath);

    const response = await dbx.filesUpload({
      path: '/My_Share/' + originalName, 
      contents: fileContent, 
    }); 
    console.log(response)

    const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: response.result.path_display, 
    });
   
    res.status(200).json({
      message: 'File uploaded successfully',
      downloadLink: sharedLinkResponse.result.url,
    });
  

  } catch (error) {
    console.log(error);
    res.status(500).send('Error uploading file');
  }
});




app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running at port", PORT);
  }
});
