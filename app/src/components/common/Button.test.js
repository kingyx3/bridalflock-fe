import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    // Check for base styles (focus ring)
    expect(buttonElement).toHaveClass('focus:ring-primary-darker');
    // Check for default variant (filled) light mode styles
    expect(buttonElement).toHaveClass('bg-primary-darker hover:bg-primary-darkest text-white');
    // Check for default variant (filled) dark mode styles
    expect(buttonElement).toHaveClass('dark:bg-primary-darker dark:hover:bg-primary-darkest dark:text-slate-800');
    // Check for default size (md) styles
    expect(buttonElement).toHaveClass('px-4 py-3 text-base');
    expect(buttonElement).not.toBeDisabled();
  });

  test('renders with variant="filled"', () => {
    render(<Button variant="filled">Filled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /filled button/i });
    expect(buttonElement).toHaveClass('bg-primary-darker hover:bg-primary-darkest text-white');
    // Also check dark mode classes are present (though not visually tested here)
    expect(buttonElement).toHaveClass('dark:bg-primary-darker dark:hover:bg-primary-darkest dark:text-slate-800');
  });

  test('renders with variant="outline"', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /outline button/i });
    expect(buttonElement).toHaveClass('border border-primary-darker text-primary-darker hover:bg-primary-darker hover:text-white');
    // Also check dark mode classes
    expect(buttonElement).toHaveClass('dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-slate-800');
  });

  test('renders with size="sm"', () => {
    render(<Button size="sm">Small Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /small button/i });
    expect(buttonElement).toHaveClass('px-3 py-3 text-sm'); // Updated padding
  });

  test('renders with size="md"', () => {
    render(<Button size="md">Medium Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /medium button/i });
    expect(buttonElement).toHaveClass('px-4 py-3 text-base'); // Updated padding
  });

  test('renders with size="lg"', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /large button/i });
    expect(buttonElement).toHaveClass('px-6 py-3 text-lg');
  });

  test('renders as disabled and is not clickable', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50 cursor-not-allowed');
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('calls onClick handler when clicked (and not disabled)', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const buttonElement = screen.getByRole('button', { name: /clickable/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders children correctly', () => {
    render(<Button><span>Submit</span></Button>);
    const buttonElement = screen.getByRole('button');
    // Check if the span with text "Submit" is a child of the button
    expect(screen.getByText('Submit').parentElement).toBe(buttonElement);
    // More robust check:
    expect(buttonElement).toContainHTML('<span>Submit</span>');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /custom class button/i });
    expect(buttonElement).toHaveClass('custom-class');
    // Also check that default classes are still applied (light mode)
    expect(buttonElement).toHaveClass('bg-primary-darker'); // Default variant
    // Also check that default dark mode classes are still applied
    expect(buttonElement).toHaveClass('dark:bg-primary-darker'); // Default variant
    expect(buttonElement).toHaveClass('px-4 py-3');   // Default size (md)
  });

  test('applies type="button" attribute', () => {
    render(<Button>Test Type</Button>);
    const buttonElement = screen.getByRole('button', { name: /test type/i });
    expect(buttonElement).toHaveAttribute('type', 'button');
  });
});
