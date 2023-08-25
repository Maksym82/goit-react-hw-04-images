import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  StyledBiSearchAlt,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onChange = event => {
    setQuery(event.currentTarget.value.toLowerCase().trim());
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    event.currentTarget.reset();
    setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleOnSubmit}>
        <SearchFormButton type="submit">
          <StyledBiSearchAlt />
        </SearchFormButton>

        <SearchFormInput
          name="search"
          type="text"
          onChange={onChange}
          plaseholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
