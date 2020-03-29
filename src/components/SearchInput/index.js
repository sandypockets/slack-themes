import React, { Component, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const TextFieldContainer = styled.div`
  margin-bottom: 2.4rem;
  width: 100%;
  position: relative;
  transition: all 120ms ease-out 0s;
  &.pinned {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
  }
`;

const TextFieldInput = styled.input`
  display: block;
  width: 100%;
  padding: 1.6rem;
  font-size: 1.8rem;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.15) , 0px 4px 8px 0px rgba(0,0,0,0.15);
  border: 1px solid ${theme.neutral.grey2};
  background: ${theme.neutral.grey0};
  transition: all 120ms ease-out 0s;
  &:focus {
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.15) , 0px 4px 8px 0px rgba(0,0,0,0.15);
    border-color: ${theme.primary};
  }
  &[disabled] {
    background: ${theme.subtle};
    color: ${theme.neutral.grey3};
    box-shadow: none;
  }
  &.pinned {
    border-width: 0px;
    border-radius: 0;
    border-bottom-width: 1px;
  }
`;

const TextFieldInputWithIcon = styled(TextFieldInput)`
  padding-left: 4.8rem;
`;

const TextFieldIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 1.2rem;
  width: 2.4rem;
  height: 2.4rem;
  transform: translateY(-50%);
  color: ${theme.neutral.grey3};
`;

class SearchInput extends Component {

  filterUpdate() {
    const val = this.myValue.value
    this.props.filterUpdate(val)
  }

  inputState() {
    const searchField = this.searchField
    const searchInput = this.myValue

    const pinSearch = () => {
      searchField.classList.add('pinned')
      searchInput.classList.add('pinned')
    }
  
    const unpinSearch = () => {
      searchField.classList.remove('pinned')
      searchInput.classList.remove('pinned')
    }

    let pinState = window.scrollY > window.innerHeight*.8;
    pinState ? pinSearch(): unpinSearch();
  }

  render() {

    window.addEventListener('scroll', this.inputState.bind(this))

    return (
      <TextFieldContainer ref={ (container) => {this.searchField = container} }>
        <TextFieldIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        </TextFieldIcon>
        <TextFieldInputWithIcon
          placeholder="Search for a theme..."
          type="text"
          ref={ (value) => {this.myValue = value} }
          onChange={this.filterUpdate.bind(this)}
        />
      </TextFieldContainer>
    )
  }
}

export default SearchInput;