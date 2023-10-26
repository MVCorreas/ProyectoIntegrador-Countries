import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { getCountryName, getDbCountries } from '../../redux/actions';
import SearchBar from './SearchBar';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../redux/actions', () => ({
  getCountryName: jest.fn(),
  getDbCountries: jest.fn(),
}));

describe('SearchBar', () => {
  it('should dispatch getCountryName action when form is submitted', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Find a country...');
    const submitButton = screen.getByText('Find');

    fireEvent.change(input, { target: { value: 'Argentina' } });
    fireEvent.click(submitButton);

    expect(getCountryName).toHaveBeenCalledWith('Argentina');
    expect(dispatchMock).toHaveBeenCalledWith(getCountryName('Argentina'));
  });

  it('should dispatch getDbCountries action when "Reload" button is clicked', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    render(<SearchBar />);
    const reloadButton = screen.getByText('Reload');

    fireEvent.click(reloadButton);

    expect(getDbCountries).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(getDbCountries());
  });
});
