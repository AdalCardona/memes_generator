import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      top: "",
      bottom: "",
      memes: [],
      template:
        "https://i.pinimg.com/474x/de/47/82/de47820ea7961d454961102c3a4e91eb.jpg",
    };
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())

      .then((memesJson) => {
        this.setState({ memes: memesJson.data.memes });
      });
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">Genera tu meme</h1>
          <Meme
            top={this.state.top}
            bottom={this.state.bottom}
            template={this.state.template}
          />
          <MemeForm values={this.state} onChange={this.handleChange} />
        </div>
        <div className="images">
          {this.state.memes.map((item) => {
            return (
              <img
                src={item.url}
                className="imageMeme"
                onClick={() => {
                  this.setState({ template: item.url });
                }}
              />
            );
          })}
        </div>
        <p>Github:AdalCardona</p>
      </div>
    );
  }
}

function Meme(props) {
  return (
    <div className="meme-template">
      <img src={props.template} alt="plantilla" className="image-template" />
      <h2 className="top-text">{props.top}</h2>
      <h2 className="bottom-text">{props.bottom}</h2>
    </div>
  );
}

function MemeForm(props) {
  return (
    <form>
      <input
        className="form-input"
        name="top"
        value={props.values.top}
        placeholder="Texto superior"
        onChange={props.onChange}
      />
      <input
        className="form-input"
        name="bottom"
        value={props.values.bottom}
        placeholder="Texto inferior"
        onChange={props.onChange}
      />
    </form>
  );
}
export default App;
