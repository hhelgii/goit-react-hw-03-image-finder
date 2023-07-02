import React from 'react';
import propTypes from 'prop-types';
import css from './searchbar.module.css';
export class Searchbar extends React.Component{
  state = {
    query: '',
  };
  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { query } = this.state;
    const { onSubmit } = this.props;
    return (
      <header>
        <form
          className={css.form}
          onSubmit={event => {
            onSubmit(event);
            this.setState({ query: '' });
          }}
        >
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.onInputChange}
            name='query'
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes={
  onSubmit:propTypes.func.isRequired
}