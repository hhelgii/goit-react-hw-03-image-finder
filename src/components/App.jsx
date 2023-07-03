import React from 'react';
import css from './app.module.css';
import { Modal } from './modal/Modal';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';
import { fetchPictures } from 'services/api';
import { Searchbar } from './searchbar/Searchbar';
// import { ThreeDots } from 'react-loader-spinner';
import { Loader } from './loader/Loader';
export class App extends React.Component {
  state = {
    modal: { isOpen: false, picture: null },
    pictures: [],
    query: '',
    error: null,
    isLoading: false,
    page: 1,
    allPicturesLoaded: false,
  };

  onSubmit = async event => {
    event.preventDefault();
    const query = event.target.elements.query.value.trim();
    this.setState({ query, page: 1, pictures: [], allPicturesLoaded: false });
    // this.setState({page:1})
  };

  onCloseModal = () => {
    this.setState({ modal: { isOpen: false, picture: null } });
  };

  openModal = pic => {
    this.setState({ modal: { isOpen: true, picture: pic } });
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  // async componentDidUpdate(prevProp,prevState) {
  //   if (prevState.query !== this.state.query||prevState.page!==this.state.page) {
  //     try {
  //       this.setState({ isLoading: true });
  //       const pictures = await fetchPictures(this.state.query, this.state.page);
  //       this.setState({ pictures });
  //     } catch (error) {
  //       this.setState({
  //         error: error.message,
  //       });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
  //     try {
  //       this.setState({ isLoading: true });

  //       const newPictures = await fetchPictures(this.state.query, this.state.page);
  //       this.setState(prevState => ({
  //         pictures: [...prevState.pictures, ...newPictures],
  //       }));
  //     } catch (error) {
  //       this.setState({
  //         error: error.message,
  //       });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });

        const newPictures = await fetchPictures(
          this.state.query,
          this.state.page
        );
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...newPictures],
        }));

        if (newPictures.length === 0) {
          this.setState({ allPicturesLoaded: true });
        }
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
          {this.state.isLoading && <Loader></Loader>}

          {this.state.pictures.length > 0 && !this.state.allPicturesLoaded && (
            <Button text="Load More" onButtonClick={this.onLoadMore} />
          )}
          {this.state.allPicturesLoaded && (
            <>
              <h3>Oops! All pictures are loaded</h3>
              <Button
                text="Scroll to top"
                onButtonClick={this.scrollToTop}
              ></Button>
            </>
          )}
          {this.state.error && <h3>Oops! Something went wrong</h3>}
        </div>
      </>
    );
  }
}
