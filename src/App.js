import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import "./App.css";

function App() {
  const [state, setState] = useState({
    github: "",
    twitter: "@",
    nome: "",
    email: "",
  });
  const [qrcode, setQrCode] = useState();
  const handlechange = (prop) => (e) => {
    setState({ ...state, [prop]: e.target.value });
  };
  const changeCanvasToPic = () => {
    let canvasImg = document.getElementsByTagName("canvas")[0];
    let image = new Image();
    image.src = canvasImg.toDataURL("image/png");
    let alink = document.createElement("img");
    alink.src = image.src;

    setQrCode(alink.src);
  };

  useEffect(() => {
    changeCanvasToPic();
  }, [state.nome, state.email]);

  return (
    <div className="App">
      <div className="formDiv">
        <label>Nome</label>
        <input value={state.nome} onChange={handlechange("nome")} />
        <label>Email</label>
        <input value={state.email} onChange={handlechange("email")} />
        <label>Twitter</label>
        <input value={state.twitter} onChange={handlechange("twitter")} />
        <label>Github</label>
        <input value={state.github} onChange={handlechange("github")} />
        <button
          onClick={() =>
            setState({ github: "", twitter: "@", nome: "", email: "" })
          }
        >
          {" "}
          Limpar
        </button>

        <>
          <QRCode
            id="qrCode"
            style={{ margin: 10 }}
            value={`
            Nome:${state.nome}
            Email:${state.email}
            Twitter:${state.twitter}
            Github:${state.github}
            `}
          />
          <a download="MyInfo.png" href={qrcode}>
            <button>Baixar QRCode</button>
          </a>
        </>
      </div>
    </div>
  );
}

export default App;
