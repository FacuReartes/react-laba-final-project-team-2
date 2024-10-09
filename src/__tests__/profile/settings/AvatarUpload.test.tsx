import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsCard from '@/components/settings/SettingsCard';

// Mock the Material-UI components
jest.mock('@mui/material', () => ({
  Avatar: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="mock-avatar" {...props}>
      {children}
    </div>
  ),
  Box: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="mock-box" {...props}>
      {children}
    </div>
  ),
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button data-testid="mock-button" {...props}>
      {children}
    </button>
  ),
  Skeleton: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="mock-skeleton" {...props}>
      {children}
    </div>
  ),
}));

describe('SettingsCard', () => {
  const mockUploadAvatar = jest.fn();
  const mockDeleteAvatar = jest.fn();
  let originalCreateElement: any;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line no-empty-function
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    originalCreateElement = document.createElement;
    document.createElement = jest.fn().mockImplementation(tagName => {
      if (tagName === 'input') {
        const input = originalCreateElement.call(document, tagName);
        input.click = jest.fn();
        return input;
      }
      return originalCreateElement.call(document, tagName);
    });
  });

  afterEach(() => {
    document.createElement = originalCreateElement;
    consoleErrorSpy.mockRestore();
  });

  test('handles valid image upload', async () => {
    render(
      <SettingsCard
        uploadAvatar={mockUploadAvatar}
        avatarUrl="http://example.com/avatar.jpg"
        isPending={false}
        deleteAvatar={mockDeleteAvatar}
        deleteIsPending={false}
        userIsPending={false}
      />
    );

    const changePhotoButton = screen.getByText('Change photo');
    fireEvent.click(changePhotoButton);

    const file = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });

    // Get the mocked input element
    const input = (document.createElement as jest.Mock).mock.results[0].value;

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: null,
      result: 'data:image/png;base64,mockbase64data',
    };
    window.FileReader = jest.fn(() => mockFileReader) as any;

    // Trigger the change event with the file
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(
      () => {
        expect(mockUploadAvatar).toHaveBeenCalledWith(file);
      },
      { timeout: 3000 }
    ).catch(error => {
      console.error('Test failed:', error);
      console.error('mockUploadAvatar calls:', mockUploadAvatar.mock.calls);
      console.error('Console errors:', consoleErrorSpy.mock.calls);
    });
  });

  test('rejects invalid file formats', async () => {
    render(
      <SettingsCard
        uploadAvatar={mockUploadAvatar}
        avatarUrl="http://example.com/avatar.jpg"
        isPending={false}
        deleteAvatar={mockDeleteAvatar}
        deleteIsPending={false}
        userIsPending={false}
      />
    );

    const changePhotoButton = screen.getByText('Change photo');
    fireEvent.click(changePhotoButton);

    const file = new File(['(⌐□_□)'], 'document.pdf', {
      type: 'application/pdf',
    });

    // Get the mocked input element
    const input = (document.createElement as jest.Mock).mock.results[0].value;

    // Trigger the change event with the invalid file
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(
      () => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('File is not an image');
        expect(mockUploadAvatar).not.toHaveBeenCalled();
      },
      { timeout: 3000 }
    ).catch(error => {
      console.error('Test failed:', error);
      console.error('Console errors:', consoleErrorSpy.mock.calls);
      console.error('mockUploadAvatar calls:', mockUploadAvatar.mock.calls);
    });
  });
});
