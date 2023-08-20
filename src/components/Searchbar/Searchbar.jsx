import { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Header, SearchForm, SearchFormButton, SearchFormInput, StyledBiSearchAlt,
} from './Searchbar.styled';



export default class Searchbar extends Component {
    state = {
        query: '',
    }

    onChange = event => {
        this.setState({ query: event.currentTarget.value.toLowerCase().trim()})
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({query: '' });
        event.currentTarget.reset();
    }

    render() {
        return (
            <Header>
                <SearchForm onSubmit = {this.onSubmit}>
                    <SearchFormButton type= 'submit'>
                        <StyledBiSearchAlt/>
                    </SearchFormButton>

                    <SearchFormInput
                        name = 'search'
                        type = 'text'
                        onChange = {this.onChange}
                        plaseholder = 'Search images and photos'
                    />
                </SearchForm>
            </Header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};