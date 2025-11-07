import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiStepServiceForm from './MultiStepServiceForm';
import * as serviceFieldDefinitions from '../../utils/serviceFieldDefinitions';
import { categories } from '../../utils/categories';

// Mock serviceFieldDefinitions
jest.mock('../../utils/serviceFieldDefinitions', () => ({
  ...jest.requireActual('../../utils/serviceFieldDefinitions'),
  getFieldsForCategory: jest.fn(),
}));

// Mock ImageUpload component
jest.mock('../ImageUpload', () => {
  const MockImageUpload = () => <div data-testid="image-upload">ImageUpload Mock</div>;
  MockImageUpload.displayName = 'MockImageUpload';
  return MockImageUpload;
});

describe('MultiStepServiceForm', () => {
  let mockOnSubmit;
  let initialData; // This will be reset for each test in beforeEach

  const getFreshInitialData = () => ({
    title: '',
    description: '',
    category: '',
    durationHours: '',
    languagesSpoken: [],
    experienceYears: '',
    cancellationPolicy: '',
    // contactMethod: '', // Removed
    tiers: [],
    addons: [],
    // any other category specific fields that might get added
  });


  beforeEach(() => {
    initialData = getFreshInitialData(); // Reset initialData for each test
    mockOnSubmit = jest.fn();
    serviceFieldDefinitions.getFieldsForCategory.mockClear();
    // Default mock for getFieldsForCategory to return only commonFields
    serviceFieldDefinitions.getFieldsForCategory.mockImplementation(() => [...serviceFieldDefinitions.commonFields]);
  });

  const renderForm = (props) => {
    // Use the current MultiStepServiceForm API
    const currentTestData = props && props.initialData ? props.initialData : initialData;
    return render(
      <MultiStepServiceForm
        initialData={currentTestData} // Changed from 'data' to 'initialData'
        onSubmit={mockOnSubmit}
        isEditMode={props?.isEditMode || false}
        user={props?.user || { uid: 'test-user-id' }}
        serviceId={props?.serviceId || null}
        {...props} // Spread any other props passed in
      />
    );
  };

  describe('Step 1: Core Details', () => {
    test('renders Step 1 initially', () => {
      renderForm();
      // Check for step indicator and title separately
      expect(screen.getByText(/Step 1 of 5/i)).toBeInTheDocument(); // Check for the "Step X of Y" part
      expect(screen.getByText('Step 1: Core Details', { selector: 'h2' })).toBeInTheDocument(); // Check for the title part within an h2
      expect(screen.getByLabelText('Title*')).toBeInTheDocument();
      expect(screen.getByLabelText('Category*')).toBeInTheDocument();
      expect(screen.getByTestId('image-upload')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    test('updates internal state when a core field is changed', () => {
      renderForm();
      const titleInput = screen.getByLabelText('Title*');
      fireEvent.change(titleInput, { target: { value: 'New Service Title' } });
      // Verify the input value was updated (indicating internal state changed)
      expect(titleInput).toHaveValue('New Service Title');
    });

    describe('Validation', () => {
      test('prevents proceeding to Step 2 if title is missing and shows error', () => {
        const testData = { ...initialData, title: '' };
        renderForm({ data: testData, files: [{ name: 'test.png', type: 'image/png' }], }); // other fields valid
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByText('Step 1: Core Details', { selector: 'h2' })).toBeInTheDocument(); // Check title
        expect(screen.getByText('Title is required.')).toBeInTheDocument();
      });

      test('allows proceeding to Step 2 if all required fields are filled', async () => {
        renderForm({ initialData: initialData });
        
        // Simulate user filling out the form
        fireEvent.change(screen.getByLabelText('Title*'), { target: { value: 'Valid Title' } });
        fireEvent.change(screen.getByLabelText('Category*'), { target: { value: categories[0].name } });
        fireEvent.change(screen.getByLabelText('Description*'), { target: { value: 'Valid Description' } });
        
        // Try to proceed to the next step
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        
        await waitFor(() => {
          expect(screen.getByText(/Step 2 of 5:/)).toBeInTheDocument();
        });
        
        expect(screen.queryByText('Title is required.')).not.toBeInTheDocument();
      });
    });
  });


  test('navigates to Step 2 on Next click from Step 1 (if valid)', () => {
    const validStep1Data = { 
      ...initialData, 
      title: 'Valid Title', 
      category: categories[0].name, 
      description: 'Valid Desc',
      images: ['https://example.com/image1.jpg'], // Add mock image to satisfy validation
      languagesSpoken: ['en'], // Required field
      experienceYears: '2-5', // Required field
      cancellationPolicy: 'flexible_7_day', // Required field
      availableDays: ['monday', 'tuesday'], // Required field
    };
    renderForm({ initialData: validStep1Data });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/Step 2 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(`Step 2: ${categories[0].name} Specifics`, { selector: 'h2' })).toBeInTheDocument();
  });

  describe('Step 2: Category Specifics', () => {
    const specificFieldName = 'specificField1';
    const specificFieldLabel = 'Specific Field 1';

    beforeEach(() => {
      initialData.title = "Valid title"; // Make step 1 valid
      initialData.description = "Valid description";
      initialData.category = categories[0].name;

      serviceFieldDefinitions.getFieldsForCategory.mockImplementation((categoryName) => {
        const common = [...serviceFieldDefinitions.commonFields]; // Use a copy
        if (categoryName === categories[0].name) {
          return [
            ...common,
            { name: specificFieldName, label: specificFieldLabel, type: 'text', required: true },
          ];
        }
        return common;
      });
    });

    test('fetches and displays specific fields when a category is selected', async () => {
      renderForm({ files: [{ name: 'test.png' }] }); // Pass files to make step 1 valid
      fireEvent.click(screen.getByRole('button', { name: 'Next' })); // Navigate to Step 2

      await waitFor(() => {
        expect(serviceFieldDefinitions.getFieldsForCategory).toHaveBeenCalledWith(categories[0].name);
      });
      expect(screen.getByText(/Step 2 of 5/i)).toBeInTheDocument();
      expect(screen.getByText(`Step 2: ${categories[0].name} Specifics`, { selector: 'h2' })).toBeInTheDocument();
      expect(screen.getByLabelText(`${specificFieldLabel}*`)).toBeInTheDocument();
    });

    describe('Validation', () => {
      test('prevents proceeding if a required specific field is empty', async () => {
        renderForm({ data: { ...initialData, [specificFieldName]: '' }, files: [{ name: 'test.png' }] });
        fireEvent.click(screen.getByRole('button', { name: 'Next' })); // To Step 2

        await waitFor(() => { // Ensure category specific fields effect has run
          expect(serviceFieldDefinitions.getFieldsForCategory).toHaveBeenCalledWith(initialData.category);
          expect(screen.getByLabelText(`${specificFieldLabel}*`)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Attempt to go to Step 3
        expect(screen.getByText(`Step 2: ${categories[0].name} Specifics`, { selector: 'h2' })).toBeInTheDocument();
        expect(screen.getByText(`${specificFieldLabel} is required.`)).toBeInTheDocument();
      });

      test('allows proceeding if required specific fields are filled', async () => {
        renderForm({ initialData: { ...initialData, [specificFieldName]: 'Valid specific value' }, files: [{ name: 'test.png' }] });
        fireEvent.click(screen.getByRole('button', { name: 'Next' })); // To Step 2

        await waitFor(() => { // Ensure category specific fields effect has run
          expect(serviceFieldDefinitions.getFieldsForCategory).toHaveBeenCalledWith(initialData.category);
          expect(screen.getByLabelText(`${specificFieldLabel}*`)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Attempt to go to Step 3
        expect(screen.getByText(/Step 3 of 5:/)).toBeInTheDocument();
      });
    });
  });

  describe('Step 3: Service Packages (Tiers)', () => {
    beforeEach(() => {
      initialData = {
        ...getFreshInitialData(),
        title: 'Valid Title',
        category: categories[0].name,
        description: 'Valid Description',
      };
      // Step 2 specific fields might need to be filled if any were required for chosen category
      serviceFieldDefinitions.getFieldsForCategory.mockReturnValue([...serviceFieldDefinitions.commonFields]);
    });

    test('allows adding and removing a tier', async () => {
      renderForm({ files: [{ name: 'test.png' }]});

      fireEvent.click(screen.getByRole('button', { name: 'Next' })); // Step 1 -> 2
      await waitFor(() => expect(screen.getByText(`Step 2 of 5: ${categories[0].name} Specifics`)).toBeInTheDocument());
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Step 2 -> 3
      await waitFor(() => {
        expect(screen.getByText(/Step 3 of 5/i)).toBeInTheDocument();
        expect(screen.getByText('Step 3: Service Packages (Tiers)', { selector: 'h2' })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: 'Add Package Tier' }));
      // Component should re-render automatically with its internal state changes
      await waitFor(() => expect(screen.getByRole('button', { name: 'Remove Tier' })).toBeInTheDocument());

      fireEvent.click(screen.getByRole('button', { name: 'Remove Tier' }));
      // Component should re-render automatically when tier is removed
      await waitFor(() => expect(screen.queryByRole('button', { name: 'Remove Tier' })).not.toBeInTheDocument());
    });

    describe('Validation', () => {
      test('prevents proceeding if no tiers are added', async () => {
        renderForm({ files: [{ name: 'test.png' }] });
        fireEvent.click(screen.getByRole('button', { name: 'Next' })); // Step 1 -> 2
        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Step 2 -> 3
        await waitFor(() => {
          expect(screen.getByText(/Step 3 of 5/i)).toBeInTheDocument();
          expect(screen.getByText('Step 3: Service Packages (Tiers)', { selector: 'h2' })).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Attempt Step 3 -> 4
        expect(screen.getByText('At least one service package (tier) is required.')).toBeInTheDocument();
      });

      test('prevents proceeding if a required field in a tier is empty', async () => {
        initialData.tiers = [{ tierName: '', tierPrice: '100', tierInclusions: [{id: 'consultation_pre', label: 'Pre-Event Consultation', isPredefined: true}] }];
        // Ensure Step 2 specific fields (if any for initialData.category) are valid to pass Step 2
        const specificFieldsForCatStep2 = serviceFieldDefinitions.getFieldsForCategory(initialData.category)
            .filter(field => !serviceFieldDefinitions.commonFields.some(cf => cf.name === field.name));
        specificFieldsForCatStep2.forEach(sf => {
            if(sf.required && !initialData[sf.name]) initialData[sf.name] = `Valid ${sf.label}`;
        });
        renderForm({ data: initialData, files: [{ name: 'test.png' }] });

        // Navigate Step 1 -> Step 2
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        await waitFor(() => expect(screen.getByText(`Step 2: ${initialData.category} Specifics`, { selector: 'h2' })).toBeInTheDocument());

        // Navigate Step 2 -> Step 3
        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
        await waitFor(() => {
          expect(screen.getByText(/Step 3 of 5/i)).toBeInTheDocument();
          expect(screen.getByText('Step 3: Service Packages (Tiers)', { selector: 'h2' })).toBeInTheDocument();
        });

        // Attempt Step 3 -> Step 4
        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
        expect(screen.getByText('Package 1: Package Name is required.')).toBeInTheDocument();
      });
    });
  });

  describe('Step 4: Optional Add-ons', () => {
     beforeEach(() => {
      initialData = {
        ...getFreshInitialData(),
        title: 'Valid Title',
        category: categories[0].name,
        description: 'Valid Description',
        tiers: [{ tierName: 'Basic', tierPrice: '100', tierDescription: 'Desc', tierInclusions: [{id: 'consultation_pre', label: 'Pre-Event Consultation', isPredefined: true}] }], // Make step 3 valid
      };
       serviceFieldDefinitions.getFieldsForCategory.mockReturnValue([...serviceFieldDefinitions.commonFields]);
    });

    test('allows adding and removing an add-on', async () => {
      renderForm({ files: [{ name: 'test.png' }] });
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
      await waitFor(() => {
        expect(screen.getByText(/Step 4 of 5/i)).toBeInTheDocument();
        expect(screen.getByText('Step 4: Optional Add-ons', { selector: 'h2' })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: 'Add Add-on' }));
      // Component should re-render automatically with its internal state changes
      await waitFor(() => expect(screen.getByRole('button', { name: 'Remove Add-on' })).toBeInTheDocument());

      fireEvent.click(screen.getByRole('button', { name: 'Remove Add-on' }));
      // Component should re-render automatically when add-on is removed  
      await waitFor(() => expect(screen.queryByRole('button', { name: 'Remove Add-on' })).not.toBeInTheDocument());
    });

    describe('Validation', () => {
      test('prevents proceeding if required add-on fields are empty', async () => {
        initialData.addons = [{ isCustom: true, addonName: '', addonPrice: '' }]; // Empty custom name and price
         // Ensure Step 2 specific fields are valid
        const specificFieldsForCatStep2 = serviceFieldDefinitions.getFieldsForCategory(initialData.category)
            .filter(field => !serviceFieldDefinitions.commonFields.some(cf => cf.name === field.name));
        specificFieldsForCatStep2.forEach(sf => {
            if(sf.required && !initialData[sf.name]) initialData[sf.name] = `Valid ${sf.label}`;
        });
        // Ensure Step 3 has a valid tier
        if (!initialData.tiers || initialData.tiers.length === 0) {
            initialData.tiers = [{ tierName: 'Basic', tierPrice: '10', tierDescription: 'Valid Tier Desc', tierInclusions: [{id:'consultation_pre', label:'Test Inc', isPredefined:true}] }];
        }

        renderForm({ data: initialData, files: [{ name: 'test.png' }] });

        // Navigate Step 1 -> Step 2
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        await waitFor(() => expect(screen.getByText(`Step 2: ${initialData.category} Specifics`, { selector: 'h2' })).toBeInTheDocument());

        // Navigate Step 2 -> Step 3
        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
        await waitFor(() => expect(screen.getByText('Step 3: Service Packages (Tiers)', { selector: 'h2' })).toBeInTheDocument());

        // Navigate Step 3 -> Step 4
        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
        await waitFor(() => {
          expect(screen.getByText(/Step 4 of 5/i)).toBeInTheDocument();
          expect(screen.getByText('Step 4: Optional Add-ons', { selector: 'h2' })).toBeInTheDocument();
        });

        // Attempt Step 4 -> Step 5
        fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
        expect(screen.getByText('Add-on 1: Custom name is required.')).toBeInTheDocument();
        expect(screen.getByText('Add-on 1: Price for this Add-on is required.')).toBeInTheDocument();
      });
    });
  });

  describe('Step 5: Review Your Service', () => {
    const reviewData = {
      ...getFreshInitialData(),
      title: 'My Awesome Service',
      category: categories[0].name,
      description: 'This is a detailed description.',
      durationHours: '10',
      languagesSpoken: [serviceFieldDefinitions.languageOptions[0].value],
      experienceYears: serviceFieldDefinitions.experienceYearOptions[1].value,
      tiers: [{ tierName: 'Basic Tier', tierPrice: '50', tierDurationHours: '2', tierDescription: 'Basic tier desc', tierInclusions: [{id: 'consultation_pre', label: 'Pre-Event Consultation', isPredefined: true}] }],
      addons: [{ isCustom: true, addonName: 'Extra Fast Delivery', addonPrice: '25', addonDescription: 'Super fast!' }],
      // Add a category specific field for display
      specificField1: "Specific Value 1",
    };
     beforeEach(() => {
        initialData = reviewData; // Use rich data for review step
        serviceFieldDefinitions.getFieldsForCategory.mockImplementation((categoryName) => {
            const common = [...serviceFieldDefinitions.commonFields];
            if (categoryName === categories[0].name) {
                return [...common, { name: 'specificField1', label: 'Specific Field 1', type: 'text' }];
            }
            return common;
        });
    });

    test('navigates to Step 5 and displays data correctly', async () => {
      renderForm({ data: reviewData, files: [{ name: 'test.png' }] }); // Pass files for Step 1 validation

      // Simulate navigating through all steps with valid data
      fireEvent.click(screen.getByRole('button', { name: 'Next' })); // Step 1 -> 2
      await waitFor(() => expect(screen.getByText(`Step 2: ${reviewData.category} Specifics`, { selector: 'h2' })).toBeInTheDocument());
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Step 2 -> 3
      await waitFor(() => expect(screen.getByText('Step 3: Service Packages (Tiers)', { selector: 'h2' })).toBeInTheDocument());
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Step 3 -> 4
      await waitFor(() => expect(screen.getByText('Step 4: Optional Add-ons', { selector: 'h2' })).toBeInTheDocument());
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]); // Step 4 -> 5

      await waitFor(() => expect(screen.getByText('Step 5 of 5: Review Your Service', { selector: 'h2' })).toBeInTheDocument());

      expect(screen.getByText(reviewData.title)).toBeInTheDocument();
      expect(screen.getByText(reviewData.category)).toBeInTheDocument();
      expect(screen.getByText(reviewData.description)).toBeInTheDocument();
      expect(screen.getByText(reviewData.tiers[0].tierName)).toBeInTheDocument();
      expect(screen.getByText(reviewData.addons[0].addonName)).toBeInTheDocument();
      expect(screen.getByText("Specific Value 1")).toBeInTheDocument(); // Check category specific data
    });

    test('Edit Core Details button navigates to Step 1', async () => {
      // Ensure all data needed to pass validations for steps 1-4 is present in reviewData
      // (The beforeEach for Step 5 already sets initialData = reviewData)
      // and getFieldsForCategory is mocked to include specificField1 for reviewData.category
      renderForm({ data: reviewData, files: [{ name: 'test.png' }] });

      // Navigate Step 1 -> Step 2
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      await waitFor(() => expect(screen.getByText(`Step 2: ${reviewData.category} Specifics`, { selector: 'h2' })).toBeInTheDocument());

      // Navigate Step 2 -> Step 3
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
      await waitFor(() => expect(screen.getByText('Step 3: Service Packages (Tiers)', { selector: 'h2' })).toBeInTheDocument());

      // Navigate Step 3 -> Step 4
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
      await waitFor(() => expect(screen.getByText('Step 4: Optional Add-ons', { selector: 'h2' })).toBeInTheDocument());

      // Navigate Step 4 -> Step 5
      fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
      await waitFor(() => expect(screen.getByText('Step 5 of 5: Review Your Service', { selector: 'h2' })).toBeInTheDocument());

      fireEvent.click(screen.getByRole('button', { name: 'Edit Core Details' }));
      expect(screen.getByText('Step 1: Core Details', { selector: 'h2' })).toBeInTheDocument();
    });
     // Similar tests for Edit Specifics, Edit Tiers, Edit Add-ons
  });

  test('calls onSubmit when Save and Publish Service button is clicked in Step 5', async () => {
    const finalData = { ...initialData, title: 'Final Service', category: categories[0].name, description: 'Final Desc',
                        tiers: [{ tierName: 'Basic', tierPrice: '10', tierDescription: 'Desc', tierInclusions: [{id:'consultation_pre', label:'Test', isPredefined:true}]}] };
    renderForm({data: finalData, files: [{name: 'test.png'}], user: { uid: 'test-uid' } }); // Added user prop

    // Navigate Step 1 -> Step 2
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(screen.getByText(`Step 2: ${finalData.category} Specifics`, { selector: 'h2' })).toBeInTheDocument());

    // Navigate Step 2 -> Step 3
    // Ensure specific fields for this category are valid if any were defined by getFieldsForCategory mock for this category
    const specificFieldsForCatStep2 = serviceFieldDefinitions.getFieldsForCategory(finalData.category)
        .filter(field => !serviceFieldDefinitions.commonFields.some(cf => cf.name === field.name));
    specificFieldsForCatStep2.forEach(sf => {
        if(sf.required && !finalData[sf.name]) finalData[sf.name] = `Valid ${sf.label}`; // Add valid data if missing
    });
    // Re-render or ensure component picks up updated finalData if necessary, though click should trigger validation on current data
    fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
    await waitFor(() => expect(screen.getByText('Step 3: Service Packages (Tiers)', { selector: 'h2' })).toBeInTheDocument());

    // Navigate Step 3 -> Step 4
    // Ensure tiers are valid (already set in finalData for this test)
    fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
    await waitFor(() => expect(screen.getByText('Step 4: Optional Add-ons', { selector: 'h2' })).toBeInTheDocument());

    // Navigate Step 4 -> Step 5
    // Ensure addons are valid (if any, finalData currently has no addons, which is fine for this step)
    fireEvent.click(screen.getAllByRole('button', { name: 'Next' })[0]);
    await waitFor(() => expect(screen.getByText('Step 5 of 5: Review Your Service', { selector: 'h2' })).toBeInTheDocument());

    const saveButton = screen.getByRole('button', { name: /Publish Service/i });
    fireEvent.click(saveButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });


});
