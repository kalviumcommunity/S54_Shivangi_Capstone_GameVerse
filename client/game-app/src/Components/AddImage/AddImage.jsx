import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const AddImage = () => {
  const [imgUrl, setImgUrl] = useState("");
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
