import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ServiceForm from './ServiceForm';

// --- Mocks ---
// Mock ImageUpload component
jest.mock('../ImageUpload', () => {
  const MockImageUpload = ({ files, setFile, maxFiles, maxSizeMB }) => (
    <div data-testid="mock-image-upload">
      <input type="file" data-testid="image-upload-input-main" onChange={(e) => setFile(Array.from(e.target.files))} />
      {files.map((file, index) => <div key={index}>{file.name}</div>)}
    </div>
  );
  MockImageUpload.displayName = 'MockImageUpload';
  return MockImageUpload;
});

// Mock serviceFieldDefinitions
const mockCommonFields = [
  { name: 'title', label: 'Service Title', type: 'text', required: true, placeholder: 'e.g., Awesome Wedding Photos' },
  { name: 'description', label: 'Detailed Description', type: 'textarea', required: true },
  { name: 'durationHours', label: 'Typical Duration (Hours)', type: 'number', required: false },
  { name: 'languagesSpoken', label: 'Languages Spoken', type: 'multi-select', options: [{value: 'en', label: 'English'}, {value: 'es', label: 'Spanish'}] },
];
const mockCategorySpecificFields = {
  'Photo': [
    { name: 'photoStyle', label: 'Photo Style', type: 'select', required: true, options: [{value: 'natural', label: 'Natural'}, {value: 'posed', label: 'Posed'}] },
  ],
  'Video': [
    { name: 'videoResolution', label: 'Video Resolution', type: 'text', required: false },
  ]
};
const mockPredefinedInclusions = [{ id: 'consult', label: 'Consultation' }, { id: 'editing', label: 'Basic Editing' }];
const mockPredefinedAddons = [{ id: 'extra_hr', label: 'Extra Hour' }, { id: 'raw_files', label: 'Raw Files' }];
const mockTierStructureConfig = {
    maxTiers: 3,
    defaultTierNames: ['Basic', 'Standard', 'Premium'],
    fieldsPerTier: [
        { name: 'tierName', label: 'Package Name', type: 'text', required: true },
        { name: 'tierPrice', label: 'Price', type: 'number', required: true },
        { name: 'tierDescription', label: 'Description of this Package', type: 'textarea', required: false },
        { name: 'tierInclusions', label: 'What\'s Included', type: 'hybridList', predefinedOptions: mockPredefinedInclusions, required: true },
    ]
};
const mockAlaCarteAddonStructureConfig = {
    fieldsPerAddon: [
        { name: 'addonName', label: 'Add-on Service/Item', type: 'hybridInput', predefinedOptions: mockPredefinedAddons, required: true },
        { name: 'addonPrice', label: 'Price for this Add-on', type: 'number', required: true },
        { name: 'addonDescription', label: 'Brief Description', type: 'textarea', required: false },
    ]
};

jest.mock('../../utils/serviceFieldDefinitions.js', () => {
  const localMockCommonFields = [
    { name: 'title', label: 'Service Title', type: 'text', required: true, placeholder: 'e.g., Awesome Wedding Photos' },
    { name: 'description', label: 'Detailed Description', type: 'textarea', required: true },
    { name: 'durationHours', label: 'Typical Duration (Hours)', type: 'number', required: false },
    { name: 'languagesSpoken', label: 'Languages Spoken', type: 'multi-select', options: [{value: 'en', label: 'English'}, {value: 'es', label: 'Spanish'}] },
  ];
  const localMockCategorySpecificFields = {
    'Photo': [
      { name: 'photoStyle', label: 'Photo Style', type: 'select', required: true, options: [{value: 'natural', label: 'Natural'}, {value: 'posed', label: 'Posed'}] },
    ],
    'Video': [
      { name: 'videoResolution', label: 'Video Resolution', type: 'text', required: false },
    ]
  };
  const localMockPredefinedInclusions = [{ id: 'consult', label: 'Consultation' }, { id: 'editing', label: 'Basic Editing' }];
  const localMockPredefinedAddons = [{ id: 'extra_hr', label: 'Extra Hour' }, { id: 'raw_files', label: 'Raw Files' }];

  const localMockTierStructureConfig = {
      maxTiers: 3,
      defaultTierNames: ['Basic', 'Standard', 'Premium'],
      fieldsPerTier: [
          { name: 'tierName', label: 'Package Name', type: 'text', required: true },
          { name: 'tierPrice', label: 'Price', type: 'number', required: true },
          { name: 'tierDescription', label: 'Description of this Package', type: 'textarea', required: false },
          { name: 'tierInclusions', label: 'What\'s Included', type: 'hybridList', predefinedOptions: localMockPredefinedInclusions, required: true },
      ]
  };
  const localMockAlaCarteAddonStructureConfig = {
      fieldsPerAddon: [
          { name: 'addonName', label: 'Add-on Service/Item', type: 'hybridInput', predefinedOptions: localMockPredefinedAddons, required: true },
          { name: 'addonPrice', label: 'Price for this Add-on', type: 'number', required: true },
          { name: 'addonDescription', label: 'Brief Description', type: 'textarea', required: false },
      ]
  };

  return {
    getFieldsForCategory: jest.fn((category) => {
      const specific = localMockCategorySpecificFields[category] || [];
      return [...localMockCommonFields, ...specific];
    }),
    predefinedInclusions: localMockPredefinedInclusions,
    predefinedAddons: localMockPredefinedAddons,
    tierStructureConfig: localMockTierStructureConfig,
    alaCarteAddonStructureConfig: localMockAlaCarteAddonStructureConfig,
    commonFields: localMockCommonFields,
  };
});

// Mock categories (can be simpler than the actual file)
jest.mock('../../utils/categories.js', () => ({
  categories: [
    { name: 'Photo', slug: 'photo' },
    { name: 'Video', slug: 'video' },
    { name: 'Other', slug: 'other' },
  ],
}));


// --- Test Suite ---
describe('ServiceForm Component (Overhauled)', () => {
  let mockSetData;
  let mockSetFile;
  let mockOnSubmit;
  let defaultData;
  let defaultProps;
  const user = userEvent.setup();

  beforeEach(() => {
    mockSetData = jest.fn();
    mockSetFile = jest.fn();
    mockOnSubmit = jest.fn();

    defaultData = {
      category: '',
      title: '',
      description: '',
      durationHours: '',
      languagesSpoken: [],
      photoStyle: '', // for 'Photo' category
      videoResolution: '', // for 'Video' category
      tiers: [],
      addons: [],
    };

    defaultProps = {
      data: defaultData,
      setData: mockSetData,
      files: [],
      setFile: mockSetFile,
      existingImages: [],
      setExistingImages: jest.fn(),
      error: '',
      isSubmitting: false,
      onSubmit: mockOnSubmit,
    };
    // Clear mock call counts
    require('../../utils/serviceFieldDefinitions.js').getFieldsForCategory.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Render & Dynamic Fields', () => {
    it('renders common fields initially', () => {
      render(<ServiceForm {...defaultProps} />);
      expect(screen.getByLabelText(/service title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/detailed description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
      // Check that old "Features" input is gone
      expect(screen.queryByPlaceholderText(/e.g., 8 hours coverage, online gallery/i)).not.toBeInTheDocument();
      // The following line was causing issues due to matching "Add Package Tier" and "Add Add-on"
      // expect(screen.queryByRole('button', { name: /add/i, exact: true })).not.toBeInTheDocument(); // Old "Add" feature button
    });

    it('loads and renders category-specific fields when a category is selected', async () => {
      const { getFieldsForCategory } = require('../../utils/serviceFieldDefinitions.js');
      render(<ServiceForm {...defaultProps} />);

      // Select 'Photo' category
      // setData needs to be mocked to actually update the data prop for the component to re-render
      mockSetData.mockImplementation(fn => {
        const newState = fn(defaultProps.data); // Simulate state update
        render(<ServiceForm {...defaultProps} data={newState} />); // Re-render with new data
      });

      await user.selectOptions(screen.getByLabelText(/category/i), 'Photo');

      expect(getFieldsForCategory).toHaveBeenCalledWith('Photo');
      // Common fields should still be there
      expect(screen.getByLabelText(/service title/i)).toBeInTheDocument();
      // Category specific field for 'Photo'
      await waitFor(() => { // Wait for re-render
        expect(screen.getByLabelText(/photo style/i)).toBeInTheDocument();
      });
      expect(screen.queryByLabelText(/video resolution/i)).not.toBeInTheDocument();
    });

    it('calls setData when a common text field is changed', async () => {
      let currentData = { ...defaultProps.data };
      const mockSetDataFn = jest.fn(updater => {
        currentData = typeof updater === 'function' ? updater(currentData) : updater;
      });

      const { rerender } = render(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
      let titleInput = screen.getByLabelText(/service title/i);

      // Using fireEvent.change for more direct value update
      fireEvent.change(titleInput, { target: { value: 'My New Service Title' } });
      // mockSetDataFn should be called by the event handler in the component
      // Ensure currentData is updated based on how mockSetDataFn is implemented
      // If mockSetDataFn is not called, this test will fail on currentData.title check.
      // Let's assume handleDynamicFieldChange (which calls setData) is triggered by 'change'

      rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);

      titleInput = screen.getByLabelText(/service title/i); // Re-query after rerender
      expect(titleInput).toHaveValue('My New Service Title'); // Check DOM
      expect(currentData.title).toBe('My New Service Title'); // Check state
    });
    
    it('calls setData for multi-select (checkboxes)', async () => {
        let currentData = {...defaultData, category: 'Photo', languagesSpoken: []};
        const mockSetDataFn = jest.fn(updater => {
            currentData = typeof updater === 'function' ? updater(currentData) : updater;
        });

        const { rerender } = render(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
        await waitFor(() => screen.getByLabelText('English'));

        const englishCheckbox = screen.getByLabelText('English');

        await user.click(englishCheckbox); // Check
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
        expect(currentData.languagesSpoken).toContain('en');
        expect(englishCheckbox).toBeChecked();

        await user.click(englishCheckbox); // Uncheck
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
        expect(currentData.languagesSpoken).not.toContain('en');
        expect(englishCheckbox).not.toBeChecked();
    });

  });

  describe('Tiered Pricing Section', () => {
    // For 'adds and removes tiers', the existing mockSetData approach might be okay if it's just testing
    // that the correct function is called to update array length, not specific field values after typing.
    // I'll leave it for now unless it causes issues or is unstable.
    it('adds and removes tiers', async () => {
      render(<ServiceForm {...defaultProps} />);
      const addTierButton = screen.getByRole('button', { name: /add package tier/i });
      await user.click(addTierButton);
      expect(mockSetData).toHaveBeenCalled();
      const addTierCall = mockSetData.mock.calls.find(call => typeof call[0] === 'function' && call[0](defaultProps.data).tiers?.length === 1);
      expect(addTierCall).toBeDefined();

      const dataWithOneTier = { ...defaultProps.data, tiers: [{ tierName: 'Basic', tierPrice: '10', tierInclusions: [] }] };
      // Use a fresh mockSetData for this specific scenario to avoid interference
      const specificMockSetData = jest.fn();
      render(<ServiceForm {...defaultProps} data={dataWithOneTier} setData={specificMockSetData} />);
      const removeTierButton = screen.getByRole('button', { name: /remove tier/i });
      await user.click(removeTierButton);
      expect(specificMockSetData).toHaveBeenCalled();
      const removeTierCall = specificMockSetData.mock.calls.find(call => typeof call[0] === 'function' && call[0](dataWithOneTier).tiers?.length === 0);
      expect(removeTierCall).toBeDefined();
    });


    it('updates tier name and price', async () => {
      const initialTiers = [{ tierName: '', tierPrice: '', tierDescription: '', tierInclusions: [] }];
      let currentData = { ...defaultData, tiers: initialTiers };
      const mockSetDataFn = jest.fn(updater => {
        currentData = typeof updater === 'function' ? updater(currentData) : updater;
      });

      const { rerender } = render(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
      
      let tierNameInput = screen.getByLabelText(/package name/i);
      fireEvent.change(tierNameInput, { target: { value: 'Super Basic' } });
      rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
      tierNameInput = screen.getByLabelText(/package name/i); // Re-query
      expect(tierNameInput).toHaveValue('Super Basic');
      expect(currentData.tiers[0].tierName).toBe('Super Basic');

      let tierPriceInput = await waitFor(() => screen.getByRole('spinbutton', { name: /^Price\s*\*?$/i }));
      fireEvent.change(tierPriceInput, { target: { value: '123' } });
      rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
      tierPriceInput = await waitFor(() => screen.getByRole('spinbutton', { name: /^Price\s*\*?$/i })); // Re-query
      expect(tierPriceInput).toHaveValue(123); // number input
      expect(currentData.tiers[0].tierPrice).toBe('123');
    });

    it('handles predefined and custom tier inclusions', async () => {
        let currentData = { ...defaultData, tiers: [{ tierName: 'Test Tier', tierPrice: '10', tierInclusions: [] }] };
        const mockSetDataFn = jest.fn(updater => {
            currentData = typeof updater === 'function' ? updater(currentData) : updater;
        });

        const { rerender } = render(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);

        const predefinedCheckbox = screen.getByLabelText(mockPredefinedInclusions[0].label);
        await user.click(predefinedCheckbox);
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
        expect(currentData.tiers[0].tierInclusions).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: mockPredefinedInclusions[0].id, isPredefined: true })])
        );

        const initialInclusions = [...currentData.tiers[0].tierInclusions];

        // Get the specific input for this tier (assuming one tier for simplicity in this test)
        const customInclusionInput = screen.getAllByPlaceholderText(/add a custom inclusion item/i)[0];
        await user.type(customInclusionInput, 'My Custom Item');
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);

        const addCustomButton = screen.getAllByRole('button', { name: /add custom/i })[0];
        await user.click(addCustomButton);
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);

        expect(currentData.tiers[0].tierInclusions).toEqual(
            expect.arrayContaining([
                ...initialInclusions,
                expect.objectContaining({ label: 'My Custom Item', isPredefined: false })
            ])
        );
    });
  });

  describe('A La Carte Add-ons Section', () => {
    // Similar to 'adds and removes tiers', this test might be okay with the simpler mock
    // if it's only checking array length changes.
    it('adds and removes add-ons', async () => {
      render(<ServiceForm {...defaultProps} />);
      const addAddonButton = screen.getByRole('button', { name: /add add-on/i });
      await user.click(addAddonButton);
      expect(mockSetData).toHaveBeenCalled();
      const addAddonCall = mockSetData.mock.calls.find(call => typeof call[0] === 'function' && call[0](defaultProps.data).addons?.length === 1);
      expect(addAddonCall).toBeDefined();

      const dataWithOneAddon = { ...defaultProps.data, addons: [{ addonName: 'Extra', addonPrice: '5' }] };
      const specificMockSetData = jest.fn();
      render(<ServiceForm {...defaultProps} data={dataWithOneAddon} setData={specificMockSetData} />);
      const removeAddonButton = screen.getByRole('button', { name: /remove add-on/i });
      await user.click(removeAddonButton);
      expect(specificMockSetData).toHaveBeenCalled();
      const removeAddonCall = specificMockSetData.mock.calls.find(call => typeof call[0] === 'function' && call[0](dataWithOneAddon).addons?.length === 0);
      expect(removeAddonCall).toBeDefined();
    });
    
    it('switches between custom and predefined addon name', async () => {
        const initialAddons = [{ addonName: '', addonPrice: '', addonDescription: '', isCustom: true, predefinedId: null }];
        let currentData = { ...defaultData, addons: initialAddons };
        const mockSetDataFn = jest.fn(updater => {
            currentData = typeof updater === 'function' ? updater(currentData) : updater;
        });

        const { rerender } = render(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);

        const customToggle = screen.getByLabelText(/custom add-on/i); // Assumes one add-on, so label is unique enough
        fireEvent.click(customToggle); // Uncheck to switch to predefined
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
        expect(currentData.addons[0].isCustom).toBe(false);

        const predefinedSelect = await waitFor(() => screen.getByRole('combobox', { name: /add-on service\/item/i }));
        expect(predefinedSelect).toBeInTheDocument();

        // userEvent.selectOptions is fine for select elements
        await user.selectOptions(predefinedSelect, mockPredefinedAddons[0].id);
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);

        expect(currentData.addons[0].predefinedId).toBe(mockPredefinedAddons[0].id);
        expect(currentData.addons[0].addonName).toBe(mockPredefinedAddons[0].label);
    });

    it('updates custom addon name and price', async () => {
        let currentData = { ...defaultData, addons: [{ addonName: '', addonPrice: '', addonDescription: '', isCustom: true }] };
        const mockSetDataFn = jest.fn(updater => {
            currentData = typeof updater === 'function' ? updater(currentData) : updater;
        });
        const { rerender } = render(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);

        let customAddonNameInput = screen.getByPlaceholderText(/enter custom add-on name/i); // Assumes one add-on
        fireEvent.change(customAddonNameInput, { target: { value: 'My Custom Addon' } });
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
        customAddonNameInput = screen.getByPlaceholderText(/enter custom add-on name/i); // Re-query
        expect(customAddonNameInput).toHaveValue('My Custom Addon');
        expect(currentData.addons[0].addonName).toBe('My Custom Addon');

        let addonPriceInput = screen.getByLabelText(/price for this add-on/i); // Assumes one add-on
        fireEvent.change(addonPriceInput, { target: { value: '25' } });
        rerender(<ServiceForm {...defaultProps} data={currentData} setData={mockSetDataFn} />);
        addonPriceInput = screen.getByLabelText(/price for this add-on/i); // Re-query
        expect(addonPriceInput).toHaveValue(25);
        expect(currentData.addons[0].addonPrice).toBe('25');
    });
  });

  describe('Error Display and Submission', () => {
    it('displays an error message when error prop is provided', () => {
      render(<ServiceForm {...defaultProps} error="Test submission error" />);
      expect(screen.getByText("Test submission error")).toBeInTheDocument();
    });

    it('calls onSubmit when the main submit button is clicked', async () => {
      render(<ServiceForm {...defaultProps} />);
      const submitButton = screen.getByRole('button', { name: /save service/i });
      await user.click(submitButton);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('disables submit button when isSubmitting is true', () => {
      render(<ServiceForm {...defaultProps} isSubmitting={true} />);
      expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
    });
  });
});
