import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  // Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('render one item list', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => ({ count: 1 }) }); // Count fetch
  (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [{ id: 1, label: 'My Task', checked: false }] });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/TODO List \(1\)/)).toBeInTheDocument();
    expect(screen.getByText(/My Task/)).toBeInTheDocument()
  });
});

test('render one item list', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => ({ count: 1 }) }); // Count fetch
  (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [{ id: 1, label: 'My Task', checked: false }] });

  render(<App />);

  act(() => {
    const addButton = screen.getByTestId('item-1');
    fireEvent.click(addButton);
  });

  await waitFor(() => {
    expect(screen.getByText(/TODO List \(1\)/)).toBeInTheDocument();
    expect((global.fetch as jest.Mock).mock.calls[2][0]).toBe('/api/todo/1');
  });
});

// test('adds a new todo item', async () => {
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => ({ count: 1 }) }); // Count fetch
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [] }); // Initial list fetch
//   (global.fetch as jest.Mock).mockResolvedValueOnce({}); // Add item request
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => ({ count: 2 }) }); // Updated count
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [{ id: 1, label: 'New Task', checked: false }] }); // Updated list

//   render(<App />);

//   const input = screen.getByPlaceholderText('New item...');
//   fireEvent.change(input, { target: { value: 'New Task' } });

//   const addButton = screen.getByText('Add');
//   fireEvent.click(addButton);

//   await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
// });

// test('filters todo items', async () => {
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => ({ count: 3 }) }); // Count fetch
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [
//     { id: 1, label: 'Task One', checked: false },
//     { id: 2, label: 'Task Two', checked: false }
//   ] }); // Initial list
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [{ id: 2, label: 'Task Two', checked: false }] }); // Filtered list

//   render(<App />);

//   const searchInput = screen.getByPlaceholderText('Search...');
//   fireEvent.change(searchInput, { target: { value: 'Two' } });

//   await waitFor(() => {
//     expect(screen.getByText('Task Two')).toBeInTheDocument();
//     expect(screen.queryByText('Task One')).not.toBeInTheDocument();
//   });
// });

// test('toggles todo item checked state', async () => {
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => ({ count: 1 }) }); // Count fetch
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [{ id: 1, label: 'Sample Task', checked: false }] }); // Initial list
//   (global.fetch as jest.Mock).mockResolvedValueOnce({}); // Toggle request
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => ({ count: 1 }) }); // Re-fetch count
//   (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => [{ id: 1, label: 'Sample Task', checked: true }] }); // Updated list

//   render(<App />);

//   const item = await screen.findByText('Sample Task');
//   fireEvent.click(item);

//   await waitFor(() => expect(item).toHaveClass('todo-item-checked'));
// });
});
