import { render, screen } from '@testing-library/react';
import { FilterHead } from '@/components/common/Filter/FilterHead';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('FilterHead', () => {
  const matches = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with no search term', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => null });

    render(<FilterHead matches={matches} />);

    const shoesText = screen.getByText((content, element) => {
      return (
        element !== null &&
        content.includes('Shoes /') &&
        element.tagName === 'H6'
      );
    });
    expect(shoesText).toBeInTheDocument();

    expect(screen.queryByText(`(${matches})`)).not.toBeInTheDocument();
  });

  test('renders correctly with a search term', () => {
    const searchTerm = 'Sneakers';
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => searchTerm });

    render(<FilterHead matches={matches} />);

    expect(screen.getByText(/Shoes \/ Sneakers/)).toBeInTheDocument();
    expect(screen.getByText(`${searchTerm} (${matches})`)).toBeInTheDocument();
  });

  test('renders correctly with an empty search term', () => {
    const searchTerm = '';
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => searchTerm });

    render(<FilterHead matches={matches} />);

    const shoesText = screen.getByText((content, element) => {
      return (
        element !== null &&
        content.includes('Shoes /') &&
        element.tagName === 'H6'
      );
    });
    expect(shoesText).toBeInTheDocument();

    expect(screen.queryByText(`(${matches})`)).not.toBeInTheDocument();
  });
});
