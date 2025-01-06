import { useEffect, useState } from "react";

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setQrCode(
      `https://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor]);

  function handleClick() {
    setWord(temp);
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(qrCode, { mode: "cors" });
      setloading(true)
      if (!response.ok) {
        throw new Error("Failed to fetch QR code image");
      }
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "QRCode.png";

  
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error.message);
    }finally{
      setloading(false)
    }
  };

  return (
    <div className="container-fluid p-0 mt-5  d-flex flex-column align-items-center justify-content-center">
      {/* Title */}
      <div className="row container-fluid my-2 p-0 d-flex justify-content-center  ">
        <div className="col-12 col-md-5  d-flex justify-content-center align-items-center">
          <h1>
            <strong>QR Code Generator</strong>
          </h1>
        </div>
      </div>

      {/* Text_Input_and_Button */}
      <div className="row container-fluid my-1 p-0  ">
        <div className="col-7 col-md-7 d-flex justify-content-end align-items-center">
          <input
            type="text"
            required
            className="col-md-5 col-10 "
            value={temp}
            onChange={(e) => {
              setTemp(e.target.value);
            }}
          />
        </div>
        <div className="col-2  d-flex justify-content-start align-items-center">
          <button className="btn btn-success ml-0" onClick={handleClick}>
            Generate
          </button>
        </div>
      </div>

      {/* backgroundclr_and_Dimension */}
      <div className="row container-fluid p-0 my-3 d-flex flex-column
      justify-content-center align-items-start  d-md-flex flex-md-row
      align-items-md-center justify-content-md-center">


        <div className="col-12 col-md-5  my-1  d-md-flex flex-md-row justify-content-md-end align-items-md-center   
        d-flex justify-content-start align-items-center justify-content-between">
          <label htmlFor="bck_clr">Background color : </label>
          <input
            name="bck_clr"
            type="color"
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value.substring(1));
            }}
          />
        </div>

        <div className="col-12 col-md-4  my-1 d-md-flex flex-md-row justify-content-md-start align-items-md-center d-flex
        justify-content-start align-items-center justify-content-between ">
          <label htmlFor="dim">Dimension : </label>
          <input
            name="dim"
            type="range"
            min="200"
            max="600"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Outputimg_and_button */}
      <div className="row container-fluid p-0 my-3">
        <div className="col-12 d-flex justify-content-center">
          {loading ? <h3>Loading...</h3> : <img className="my-2" src={qrCode} alt="qr-code" /> }
          
        </div>
        <div className="col-12 my-2 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;



