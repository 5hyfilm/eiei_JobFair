import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CompanyDetailPage from '@/app/mainpage/[cid]/page'; // Update this path
import { SessionProvider } from 'next-auth/react'; // Wrap with SessionProvider if using useSession()
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

// Mock the `window.alert` to assert the call
global.alert = jest.fn();

// Mock the `useSearchParams` hook from next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('CompanyDetailPage', () => {
  it('should show an alert on clicking the Reservation button', async () => {
    // Create mock query parameters for useSearchParams
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('reserve', '2024-11-15');
    mockSearchParams.set('booking', '12345');
    
    // Mock the useSearchParams hook to return the mockSearchParams
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    // Mock session data
    const mockSession = {
      user: {
        _id: 'mock-id',
        name: 'Mock User',
        email: 'mockuser@example.com',
        role: 'user',
        token: 'mock-token', // Keep the token
      },
      expires: '2024-12-31T23:59:59.000Z', // Set a valid expiration date
    };

    // Render the component wrapped with SessionProvider
    render(
      <SessionProvider session={mockSession}>
        <CompanyDetailPage params={{ cid: 'test-cid' }} />
      </SessionProvider>
    );

    // Find the "Reservation" button
    const reservationButton = screen.getByText('Reservation');
    
    // Click the button
    fireEvent.click(reservationButton);

    // Wait for the alert to be called and check if it was called with "success"
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('success'));
  });
});
