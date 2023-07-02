import React from 'react';
import propTypes from 'prop-types';
import css from './modal.module.css';
export class Modal extends React.Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    const { img } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={img.large} alt={img.tags} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  img: propTypes.shape({
    tags: propTypes.string.isRequired,
    large: propTypes.string.isRequired,
  }).isRequired,
  onCloseModal: propTypes.func.isRequired,
};
