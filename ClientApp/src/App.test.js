import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import axiosMock from 'axios';
import App from './App';

// Mock da chamada à API do Spotify
jest.mock('axios');

describe('App component', () => {
  beforeEach(() => {
    axiosMock.get.mockReset();
  });

  it('should render without errors', () => {
    try {
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
        );
      } catch (error) {
        // Fail the test if an error is caught
        expect(error).toBeUndefined();
      }
  });

  it('should render the Home page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if the Home page component is rendered
    const logoElement = screen.getByText('Into Spotify', { selector: '.logo' });
    expect(logoElement).toBeInTheDocument();
  });

  it('should navigate to the Now Playing page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Click on the "Now playing" button
    const nowPlayingButton = screen.getByRole('button', {
        name: /now playing/i,
      });
      fireEvent.click(nowPlayingButton);

    // Check if the Now Playing page component is rendered
    const nowPlayingPageElement = screen.getByText((content, element) => {
        // Customize the search to find the text within the desired element
        return (
          element.classList.contains('title') &&
          content.startsWith('Now playing')
        );
      });
      expect(nowPlayingPageElement).toBeInTheDocument();
    });
});