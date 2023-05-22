// import { Component } from 'react';
// import css from './Searchbar.module.css';
// import PropTypes from 'prop-types';


// export class Searchbar extends Component {
//   state = {
//     inputName: '',
//   };

//   onChangeInput = event => {
//     this.setState({ inputName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     this.props.onSubmit(this.state.inputName);
//     this.setState({ inputName: '' });
//   };

//   render() {
//     const { inputName } = this.state.inputName;
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.SearchForm__button}>
//           </button>

//           <input
//             className={css.SearchForm__input}            
//             value={inputName}
//             onChange={this.onChangeInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propType = {
//   onSubmit: PropTypes.func.isRequired,
// };



import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';


export class Searchbar extends Component {
  state = {
    inputName: '',
  };
  
  onChangeInput = event => {
    this.setState({ inputName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputName);
  }

  render() {
    const { inputName } = this.state.inputName;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
          <ImSearch size={20} />
          </button>

          <input
            className={css.SearchForm__input}            
            value={inputName}
            onChange={this.onChangeInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};