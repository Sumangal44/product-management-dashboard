import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

describe('App', () => {
  it('renders the hero and search input', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /inventory control dashboard/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/find by name or category/i)).toBeInTheDocument();
  });

  it('shows category filter options', () => {
    render(<App />);

    const categorySelect = screen.getByRole('combobox');
    expect(categorySelect).toHaveValue('all');
    expect(screen.getByRole('option', { name: 'All categories' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /lab equipment/i })).toBeInTheDocument();
  });
});
