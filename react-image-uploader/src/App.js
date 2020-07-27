import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    selectedFile: null,
    imagePreviewUrl: null
  };

  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(event.target.files[0])
  }

  render() {

    let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
    }

    return (
      <div className="App">
        <form className="mt-4"
          action="/upload"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <input
              type="file"
              name="file"
              id="input-files"
              className="form-control-file border"
              onChange={this.fileChangedHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {$imagePreview}
      </div>
    );
  }
}

export default App;
