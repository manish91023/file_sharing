import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import QrCode from "qrcode";

function Transfer() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadFile, setDownloadfile] = useState("");


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        // Send the file to the server using fetch (adjust the URL as needed)
        const token = await getAccessTokenSilently({
          audience: "https://manishgga09.us.auth0.com/api/v2/",
        });
        const res = await axios.post(
          "http://localhost:3000/api/ftp/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("File uploaded successfully!");
        setFile("");
        setFileName("");
        setDownloadfile(res.data.downloadLink);

        
        console.log("response from server", res);
        const fileInput = document.getElementById("file_input");
        if (fileInput) {
          fileInput.value = ""; // Clear file input in the DOM
        }
      } else {
        alert("No file selected!");
      }
    } catch (err) {
      console.log(err);
      alert("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  const download = () => {
    window.open(downloadFile, "_blank");
  };
  const copyToclipboard = () => {
    navigator.clipboard.writeText(downloadFile);
    alert("link copied");
  };

  return (
    <div className=" w-full max-h-screen ">
      <div className=" mx-auto max-w-md font-Popins text-center pt-10 mb-10 text-black">
        <h1 className=" text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
          Transfer Your File And Have Free Over FTP Server
        </h1>
        <h2 className=" font-light">
          MyShare is a simple and free way to securely share your files and
          folders.
        </h2>
      </div>
      <div className="max-w-md w-full mx-auto p-4 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">File Upload</h2>
        <form>
          <input
            type="file"
            className="hidden"
            id="file_input"
            multiple
            onChange={handleFileChange}
          />
          <label
            for="file_input"
            className="flex justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-500 cursor-pointer"
          >
              <div className="flex flex-col justify-center h-full">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 011-8 4 4 0 018 8zM7 16V4a2 2 0 014 2h4a2 2 0 014-2V4a2 2 0 012-2h4a2 2 0 012 2v12"
                  />
                </svg>
                <p className="text-sm text-gray-400">
                  Drag and drop files or click to upload
                </p>
              </div>
          </label>
          {fileName && <p>Selected File:{fileName}</p>}
          <div className="mt-4 flex justify-center">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-red-500 border-t-4 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-full"></div>
            </div>
          </div>
          {isAuthenticated && isLoading ? (
            <p className=" w-full px-6 rounded-lg bg-green-400">Uploading...</p>
          ) : (
            <button
              className="mt-4 px-6 py-2 w-full bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              onClick={handleFileUpload}
            >
              Upload
            </button>
          )}
        </form>
        {downloadFile && (
          <div className=" mt-4 flex justify-start">
            <button
              onClick={download}
              className=" px-6 py-2 w-[350px] bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Download <i class="fa-solid fa-download"></i>
            </button>
            <span
              onClick={copyToclipboard}
              className=" ml-2 text-[50px] text-blue-400 cursor-pointer "
            >
              <i class="fa-solid fa-copy"></i>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfer;
