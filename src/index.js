import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDDvj-eMwB1WGa8czepPOtFqWRm2Q6sR3o';

//Create a new component. This component should produce
// some HTML

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key:API_KEY, term: term}, (videos) => { //function(vidoes) which is the handler
      this.setState({
        videos: videos, //this.state({ videos: videos});
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300); //be called per 300 ms

    return (
      <div>
        <SearchBar onSeachTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}
// REACT takes the HTML generated by this componet into DOM

ReactDOM.render(<App />, document.querySelector('.container'));
