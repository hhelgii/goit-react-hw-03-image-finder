import React from 'react';
import css from './app.module.css';
import { Modal } from './modal/Modal';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';
import { fetchPictures } from 'services/api';
import { Searchbar } from './searchbar/Searchbar';
import {ThreeDots} from 'react-loader-spinner'
export class App extends React.Component {
  state = {
    modal: { isOpen: false, picture: null },
    pictures: [],
    query: '',
    error: null,
    isLoading: false,
  };

  onSubmit = async event => {
    event.preventDefault();
    const query = event.target.elements.query.value.trim();
    this.setState({ query });
  };

  onCloseModal = () => {
    this.setState({ modal: { isOpen: false, picture: null } });
  };

  openModal = pic => {
    this.setState({ modal: { isOpen: true, picture: pic} });
    
  };

  // async componentDidMount() {
  //   try {
  //     this.setState({ isLoading: true });
     
  //     const pictures = await fetchPictures(this.state.query);
  //     this.setState({ pictures });
  //   } catch (error) {
  //     this.setState({
  //       error: error.message,
  //     });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }
  async componentDidUpdate(prevProp,prevState) {
    if (prevState.query !== this.state.query) {
      try {
        this.setState({ isLoading: true });
        const pictures = await fetchPictures(this.state.query);
        this.setState({ pictures });
      } catch (error) {
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <div className={css.App}>
         
          {this.state.pictures.length > 0 && (
            <ImageGallery
              pictures={this.state.pictures}
              onImgClick={this.openModal}
            ></ImageGallery>
          )}

          {this.state.modal.isOpen && (
            <Modal
              pic={this.state.modal.picture}
              onCloseModal={this.onCloseModal}
            ></Modal>
          )}
           {this.state.isLoading&&
          <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="blue" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
           />}
           {this.state.pictures.length > 0 &&( <Button text="Load More"></Button>)}
         
        </div>
        
      </>
    );
  }
}
