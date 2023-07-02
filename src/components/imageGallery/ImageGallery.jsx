import React from 'react';
import propTypes from 'prop-types';
import css from './imageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
export const ImageGallery = ({ pictures, onImgClick }) => {
  return (
    <ul className={css.gallery}>
      {pictures.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            largeSrc={largeImageURL}
            onImgClick={onImgClick}
            tags={tags}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  pictures: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      tags: propTypes.string.isRequired,
      webformatURL: propTypes.string.isRequired,
      largeImageURL: propTypes.string.isRequired,
    })
  ).isRequired,
  onImgClick: propTypes.func.isRequired,
};
