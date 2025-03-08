import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TalentDash from './TalentDash';
import { AuthContext } from '../Context/AuthContext';

// Create a mock for the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('TalentDash Portfolio Feature', () => {
  // Provide a dummy user with a portfolios array and the "talent" role
  const dummyUser = {
    _id: '12345',
    portfolios: [
      { icon: 'icon1', href: 'http://example.com/portfolio1' },
      { icon: 'icon2', href: 'http://example.com/portfolio2' }
    ],
    role: 'talent',
    firstName: 'Test',
    // include other required user properties as needed
  };

  const updateUser = jest.fn();

  const renderComponent = () =>
    render(
      <AuthContext.Provider value={{ user: dummyUser, updateUser }}>
        <TalentDash />
      </AuthContext.Provider>
    );

  it('calls handleSavePortfolio and shows success when API call is successful', async () => {
    const { getByText, getByRole, queryByText } = renderComponent();

    // Suppose that when editing, a "Save Portfolio" button becomes visible.
    // You may need to simulate setting isEditingPortfolio to true.
    // For example, if there is a button that toggles editing mode:
    const editButton = getByText(/edit portfolio/i);
    fireEvent.click(editButton);

    // Simulate user modifying the portfolio.
    // For instance, you could update the portfolios state by finding input fields and changing their values.
    // (Assume there is an input with a placeholder "Portfolio Link")
    const portfolioInput = getByRole('textbox', { name: /portfolio link/i });
    fireEvent.change(portfolioInput, { target: { value: 'http://example.com/new-portfolio' } });

    // Click the save button that triggers handleSavePortfolio.
    const saveButton = getByText(/save portfolio/i);
    fireEvent.click(saveButton);

    // Wait for the fetch call to be made and the component to process the response.
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Optionally, check that the correct URL and payload are used:
    const expectedUrl = `http://localhost:4000/api/v1/talent/edit-portfolio/${dummyUser._id}`;
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.objectContaining({
      method: 'PUT',
      headers: expect.objectContaining({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ portfolios: expect.any(Array) })
    }));

    // Optionally, verify that any success UI message appears or editing mode is toggled off.
    expect(queryByText(/portfolio section updated successfully/i)).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Override fetch mock to return an error response.
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, message: 'Error updating portfolio' })
      })
    );

    const { getByText, getByRole } = renderComponent();

    // Activate editing mode (simulate as above)
    const editButton = getByText(/edit portfolio/i);
    fireEvent.click(editButton);

    // Update the portfolio field
    const portfolioInput = getByRole('textbox', { name: /portfolio link/i });
    fireEvent.change(portfolioInput, { target: { value: 'http://example.com/new-portfolio' } });

    // Click the save button.
    const saveButton = getByText(/save portfolio/i);
    fireEvent.click(saveButton);

    // Wait for the fetch call.
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Verify that an error message (or a console error) is triggered.
    // Depending on your implementation you might check for an alert or a UI message.
    // For example:
    expect(getByText(/failed to update portfolio/i)).toBeInTheDocument();
  });
});
