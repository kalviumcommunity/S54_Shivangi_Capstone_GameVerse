import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

/**
 * This component allows the user to upload an image and display it
 * It uses Firebase Storage to store the image and get its download URL
 */
const AddImage = () => {
  /**
   * The URL of the image to be displayed
   */
  const [imgUrl, setImgUrl] = useState("");

  /**
   * Handles the file upload event and updates the image URL
   * @param {Object} event - The file upload event
   */
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          console.log(downloadUrl);
          setImgUrl(downloadUrl);
        });
      });
    } else {
      console.log("No file uploaded");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>{imgUrl}</div>
    </div>
  );
};

export default AddImage;
