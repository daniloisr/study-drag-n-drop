import { render, screen } from '@testing-library/react';
import Dnd from 'src/Dnd';

test('renders learn react link', () => {
  render(<Dnd />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
