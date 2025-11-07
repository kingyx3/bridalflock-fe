import { render, screen } from '@testing-library/react';
import SearchPage from '../pages/search';
import { useRouter } from 'next/router';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchPage', () => {
  it('should not display Category, Budget, or Delivery Time buttons', () => {
    // Mock router query params
    useRouter.mockReturnValue({
      query: { q: 'test', category: 'mockCategory' }, // Added mockCategory
    });

    render(<SearchPage />);

    // Check that the buttons are not present
    expect(screen.queryByRole('button', { name: /Category/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Budget/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Delivery Time/i })).not.toBeInTheDocument();
  });
});
