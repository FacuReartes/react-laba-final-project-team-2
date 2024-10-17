import AddProductForm from '@/components/Product/Form/AddProductForm';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock('next-auth/react', () => {
  const mockSession = {
    user: {
      jwt: 'jwtcode',
      user: {
        id: 1,
      },
    },
  };
  return {
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

// Mock isSuccess when calling mutate
let isSuccessState = false;
const mockedMutate = jest.fn(() => {
  isSuccessState = true;
});

jest.mock('@tanstack/react-query', () => {
  const mockData = [
    {
      id: 1,
      attributes: {
        name: 'property',
        value: 25,
      },
    },
  ];
  return {
    useQueryClient: jest.fn(() => {
      return {
        invalidateQueries: jest.fn(),
      };
    }),
    useMutation: jest.fn(() => {
      return {
        mutate: mockedMutate,
        isSuccess: isSuccessState,
        reset: jest.fn(() => {
          isSuccessState = false;
        }),
        isPending: false,
      };
    }),
    useQuery: jest.fn(() => {
      return { data: mockData };
    }),
  };
});

global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

// Clean mocks
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Render component
beforeEach(() => render(<AddProductForm />));

it('User should be able to add a product', async () => {
  // Complete the form
  fireEvent.input(screen.getByPlaceholderText('Insert product name'), {
    target: {
      value: 'Product Test',
    },
  });
  fireEvent.input(screen.getByPlaceholderText('Insert product price'), {
    target: {
      value: 450,
    },
  });
  fireEvent.input(
    screen.getByPlaceholderText('Do not exceed 300 characters.'),
    {
      target: {
        value: 'Product description for unit testing',
      },
    }
  );
  fireEvent.click(screen.getByTestId('size-button-1'));

  const mockImages = [new File(['img1'], 'img1.png', { type: 'image/png' })];
  const input = screen.getByTestId('dropzone');
  await userEvent.upload(input, mockImages);

  // Submit form
  fireEvent.submit(screen.getByTestId('submit'));

  // Expect for success
  await waitFor(() => {
    expect(screen.queryAllByText(/required/i)).toHaveLength(0);
    expect(mockedMutate).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText(/New product has been added successfully/i)
    ).toBeInTheDocument();
  });
});

describe('Form Validation Errors', () => {
  it('Product is required', async () => {
    fireEvent.submit(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(
        screen.queryByText(/Product name is required/)
      ).toBeInTheDocument();
    });
  });

  it('Product is too long', async () => {
    fireEvent.input(screen.getByPlaceholderText('Insert product name'), {
      target: {
        value: 'Product name maximum is 30 characters',
      },
    });

    fireEvent.submit(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(
        screen.queryByText(/Product name is too long/)
      ).toBeInTheDocument();
    });
  });

  it('Price is required', async () => {
    fireEvent.submit(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(screen.queryByText(/Price is required/)).toBeInTheDocument();
    });
  });

  it('Price must be positive', async () => {
    fireEvent.input(screen.getByPlaceholderText('Insert product price'), {
      target: {
        value: -50,
      },
    });

    fireEvent.submit(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(screen.queryByText(/Price must be positive/)).toBeInTheDocument();
    });
  });

  it('Category is required', async () => {
    // Open dropdown
    fireEvent.mouseDown(screen.getAllByRole('combobox', { hidden: true })[2]);
    const option = await screen.findByTestId('category-option-1');
    // Click the default option, leaving the input empty
    fireEvent.click(option);

    fireEvent.submit(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(screen.queryByText(/Category is required/)).toBeInTheDocument();
    });
  });

  it('Description is required', async () => {
    fireEvent.submit(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(screen.queryByText(/Description is required/)).toBeInTheDocument();
    });
  });

  it('Image is required', async () => {
    fireEvent.submit(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(screen.queryByText(/Image is required/)).toBeInTheDocument();
    });
  });
});

describe('Image handling', () => {
  it('User should be able to delete an image', async () => {
    const mockImages = [new File(['img1'], 'img1.png', { type: 'image/png' })];

    const input = screen.getByTestId('dropzone');
    await userEvent.upload(input, mockImages);

    expect(screen.queryAllByRole('img')).toHaveLength(1);

    // Click delete image
    fireEvent.mouseEnter(screen.getByTestId('image-hover'));
    fireEvent.click(screen.getByTestId('image-delete'));

    // Modal opens
    expect(
      screen.getByText(/Are you sure to delete product image\?/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('confirm-image-delete'));

    // Expect deleted image and closed modal
    expect(screen.queryAllByRole('img', { hidden: true })).toHaveLength(0);
    expect(
      screen.queryByText(/Are you sure to delete product image\?/i)
    ).toBeFalsy();
  });

  it('Invalid file type', async () => {
    // Upload invalid file
    const mockImages = [
      new File(['notImage'], 'notImage.pdf', { type: 'application/pdf' }),
    ];

    fireEvent.drop(screen.getByTestId('dropzone'), {
      dataTransfer: { files: mockImages, types: ['Files'] },
    });

    // File rejection modal opens
    await waitFor(() => {
      expect(screen.getByText(/Wrong file extension/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('close-reject'));

    // Expect closed modal and image not uploaded
    await waitFor(() => {
      expect(screen.queryByText(/Wrong file extension/i)).toBeFalsy();
      expect(screen.queryAllByRole('img', { hidden: true })).toHaveLength(0);
    });
  });

  it('User should be able to upload multiple images', async () => {
    const mockImages = [
      new File(['img1'], 'img1.png', { type: 'image/png' }),
      new File(['img2'], 'img2.png', { type: 'image/png' }),
      new File(['img3'], 'img3.png', { type: 'image/png' }),
    ];

    const input = screen.getByTestId('dropzone');
    await userEvent.upload(input, mockImages);

    // Expect 3 images
    expect(screen.queryAllByRole('img')).toHaveLength(3);
  });
});
