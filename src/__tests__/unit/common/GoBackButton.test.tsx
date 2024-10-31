import { render, screen, fireEvent } from '@testing-library/react';
import GoBackButton from '@/components/common/GoBackButton';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('GoBackButton', () => {
  it('renders with provided text', () => {
    render(<GoBackButton text="Go Back" />);
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });

  it('calls router.back() when clicked', () => {
    const router = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);

    render(<GoBackButton text="Go Back" />);
    const button = screen.getByRole('button', { name: /go back/i });

    fireEvent.click(button);
    expect(router.back).toHaveBeenCalled();
  });
});
