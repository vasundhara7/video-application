import React from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./videoList";
import VideoDetail from "./VideoDetail";
const KEY = "AIzaSyDyAFUZGjSlgur2OMqnVzf3lbVdMMcu_O4";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };
  componentDidMount() {
    this.onTermSubmit("sunset");
  }
  onTermSubmit = async (term) => {
    console.log("term", term);
    await youtube
      .get("/search", {
        params: {
          q: term,

          part: "snippet",
          maxResults: 5,
          key: KEY,
          type: "video",
        },
      })
      .then((res) => {
        this.setState({
          videos: res.data.items,
          selectedVideo: res.data.items[0],
        });
        console.log("videos", this.state);
      });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };
  render() {
    return (
      <div className="App ui container">
        <SearchBar onTermSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
