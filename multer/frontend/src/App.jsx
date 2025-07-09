import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [imgprv, setimgprv] = useState([]);
  const [selectedfile, setselectedfile] = useState([]);

  const handlechange = (e) => {
    const files = e.target.files;
    const filearray = Array.from(files);

    console.log(filearray);
    console.log(files);
    const imagepreview = filearray.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({
            src: reader.result,
            name: file.name,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagepreview).then((imagefile) => {
      setimgprv(imagefile);
      setselectedfile(filearray);
    });
  };

  const handlesumbit = async () => {
    const formdata = new FormData();

    formdata.append("folder", "aryan");
    selectedfile.forEach((file) => {
      formdata.append("image", file);
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/upload",
        formdata,
        config
      );
      if (res.data.status) {
        console.log(res.data.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {imgprv.map((image, index) => (
        <div key={index}>
          <img
            src={image.src}
            alt={image.name}
            style={{ width: "150px", height: "auto", borderRadius: "10px" }}
          />
        </div>
      ))}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlechange}
      ></input>
      <button className="btn btn-primary" onClick={handlesumbit}>
        Upload
      </button>
    </>
  );
}

export default App;
