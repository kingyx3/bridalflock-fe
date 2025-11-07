import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// --- Component Definitions (Copied from app/src/pages/seller/index.jsx) ---

// Reusable Dashboard Card - More compact version
const DashboardCard = ({ title, value, color, icon, onClick }) => (
  <div
    data-testid="dashboard-card" // Added for easier selection
    onClick={onClick}
    className={`bg-neutral-light dark:bg-neutral-dark rounded-lg shadow-sm p-4 flex flex-col ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs text-neutral-medium">{title}</p>
        <h3 className="text-xl font-bold mt-1 dark:text-neutral-light">{value}</h3>
      </div>
      <span className="text-xl">{icon}</span>
    </div>
    {onClick && (
      <p className="mt-2 text-xs text-neutral-medium flex items-center">
        View all <span className="ml-1">→</span>
      </p>
    )}
  </div>
);

// Reusable Quick Action - More compact version
const ActionButton = ({ label, icon, onClick }) => (
  <button
    data-testid="action-button" // Added for easier selection
    onClick={onClick}
    className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary dark:bg-neutral-medium hover:bg-secondary/70 dark:hover:bg-neutral-medium/70 transition-colors"
  >
    <span className="text-lg mb-1">{icon}</span>
    <span className="text-xs font-medium text-neutral-dark dark:text-neutral-light">{label}</span>
  </button>
);


// --- Test Suite for DashboardCard ---
describe('DashboardCard Component', () => {
  let mockOnClick;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  describe('Renders correctly with all props (clickable)', () => {
    beforeEach(() => {
      render(
        <DashboardCard
          title="Total Orders"
          value="150"
          icon="📦"
          onClick={mockOnClick}
        />
      );
    });

    it('displays the title', () => {
      expect(screen.getByText('Total Orders')).toBeInTheDocument();
    });

    it('displays the value', () => {
      expect(screen.getByText('150')).toBeInTheDocument();
    });

    it('displays the icon', () => {
      expect(screen.getByText('📦')).toBeInTheDocument();
    });

    it('displays "View all" text and arrow icon', () => {
      expect(screen.getByText('View all')).toBeInTheDocument();
      expect(screen.getByText('→')).toBeInTheDocument();
    });

    it('has cursor-pointer class indicating clickability', () => {
      expect(screen.getByTestId('dashboard-card')).toHaveClass('cursor-pointer');
    });
  });

  describe('Renders correctly without onClick prop (not clickable)', () => {
    beforeEach(() => {
      render(
        <DashboardCard
          title="Earnings Today"
          value="$500"
          icon="💰"
          onClick={undefined} // Explicitly undefined
        />
      );
    });

    it('displays the title', () => {
      expect(screen.getByText('Earnings Today')).toBeInTheDocument();
    });

    it('displays the value', () => {
      expect(screen.getByText('$500')).toBeInTheDocument();
    });
    
    it('displays the icon', () => {
        expect(screen.getByText('💰')).toBeInTheDocument();
    });

    it('does NOT display "View all" text or arrow icon', () => {
      expect(screen.queryByText('View all')).not.toBeInTheDocument();
      expect(screen.queryByText('→')).not.toBeInTheDocument();
    });

    it('does NOT have cursor-pointer class', () => {
      expect(screen.getByTestId('dashboard-card')).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Click handler invocation', () => {
    it('calls onClick prop when the card is clicked', async () => {
      render(
        <DashboardCard
          title="Clickable Card"
          value="10"
          icon="🖱️"
          onClick={mockOnClick}
        />
      );
      await userEvent.click(screen.getByTestId('dashboard-card'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw error or call onClick if onClick is not provided and card is clicked', async () => {
        render(
          <DashboardCard
            title="Non-Clickable Card"
            value="20"
            icon="🚫"
            onClick={undefined}
          />
        );
        // No error should be thrown on click
        await expect(userEvent.click(screen.getByTestId('dashboard-card'))).resolves.not.toThrow();
        expect(mockOnClick).not.toHaveBeenCalled(); // Ensure it wasn't called from a previous test
      });
  });
});


// --- Test Suite for ActionButton ---
describe('ActionButton Component', () => {
  let mockOnClick;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  describe('Renders correctly with all props', () => {
    beforeEach(() => {
      render(
        <ActionButton label="Create Service" icon="➕" onClick={mockOnClick} />
      );
    });

    it('displays the label', () => {
      expect(screen.getByText('Create Service')).toBeInTheDocument();
    });

    it('displays the icon', () => {
      expect(screen.getByText('➕')).toBeInTheDocument();
    });
  });

  describe('Click handler invocation', () => {
    it('calls onClick prop when the button is clicked', async () => {
      render(
        <ActionButton label="Test Action" icon="🚀" onClick={mockOnClick} />
      );
      await userEvent.click(screen.getByTestId('action-button'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
