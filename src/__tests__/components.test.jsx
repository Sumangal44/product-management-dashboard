import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar.jsx';
import ViewToggle from '../components/ViewToggle.jsx';
import Pagination from '../components/Pagination.jsx';
import ProductForm from '../components/ProductForm.jsx';
import ProductTable from '../components/ProductTable.jsx';
import ProductCard from '../components/ProductCard.jsx';

const sampleProduct = {
  id: 1,
  name: 'Sample Product',
  price: 42.5,
  category: 'Gadgets',
  stock: 7,
  description: 'A useful gadget',
};

describe('SearchBar', () => {
  it('updates search text and clears via button', async () => {
    const user = userEvent.setup();
    const setSearch = vi.fn();
    const onClear = vi.fn();

    render(
      <SearchBar
        search=""
        setSearch={setSearch}
        onClear={onClear}
        categories={['Gadgets']}
        categoryFilter="all"
        onCategoryChange={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/find by name or category/i);
    await user.type(input, 'mic');
    expect(setSearch).toHaveBeenCalledWith('m');

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'All categories' })).toBeInTheDocument();

    // Rerender with search text so clear button appears
    render(
      <SearchBar
        search="test"
        setSearch={setSearch}
        onClear={onClear}
        categories={['Gadgets']}
        categoryFilter="all"
        onCategoryChange={vi.fn()}
      />
    );
    const clear = screen.getByRole('button', { name: /clear search/i });
    await user.click(clear);
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

describe('ViewToggle', () => {
  it('calls setView when toggling', async () => {
    const user = userEvent.setup();
    const setView = vi.fn();
    render(<ViewToggle view="table" setView={setView} />);

    await user.click(screen.getByRole('button', { name: /cards/i }));
    expect(setView).toHaveBeenCalledWith('card');
  });
});

describe('Pagination', () => {
  it('disables prev on first page and calls change handlers', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    onPageChange.mockClear();
    await user.click(screen.getByRole('button', { name: '3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});

describe('ProductForm', () => {
  it('validates required fields and blocks submit', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<ProductForm onSave={onSave} />);

    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/must be positive/i)).toBeInTheDocument();
  });

  it('submits valid product data', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<ProductForm onSave={onSave} />);

    await user.type(screen.getByPlaceholderText(/product name/i), 'Widget');
    await user.clear(screen.getByPlaceholderText('0.00'));
    await user.type(screen.getByPlaceholderText('0.00'), '10');
    await user.type(screen.getByPlaceholderText(/e.g., electronics/i), 'Hardware');
    await user.clear(screen.getByPlaceholderText('0'));
    await user.type(screen.getByPlaceholderText('0'), '5');
    await user.type(screen.getByPlaceholderText(/product description/i), 'Test widget');

    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Widget', price: '10', category: 'Hardware', stock: '5' })
    );
  });
});

describe('ProductTable', () => {
  it('renders rows and triggers callbacks', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const products = [sampleProduct, { ...sampleProduct, id: 2, name: 'Another' }];

    render(<ProductTable products={products} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('Another')).toBeInTheDocument();

    const firstRow = screen.getAllByRole('row')[1];
    await user.click(within(firstRow).getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(products[0]);

    await user.click(within(firstRow).getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith(products[0].id);
  });
});

describe('ProductCard', () => {
  it('renders product data and handles actions', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(<ProductCard product={sampleProduct} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText(/sample product/i)).toBeInTheDocument();
    expect(screen.getByText(/42.50/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(sampleProduct);

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith(sampleProduct.id);
  });
});
