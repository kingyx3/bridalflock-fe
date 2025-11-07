import { validateServiceInput } from './validators';
import { getFieldsForCategory, predefinedAddons, commonFields } from './serviceFieldDefinitions';

// Mock serviceFieldDefinitions to control getFieldsForCategory
jest.mock('./serviceFieldDefinitions', () => ({
  ...jest.requireActual('./serviceFieldDefinitions'), // Import actual predefinedAddons and commonFields
  getFieldsForCategory: jest.fn(),
}));

describe('validateServiceInput', () => {
  let mockImageData;
  let baseValidData;

  beforeEach(() => {
    // Reset mocks before each test
    getFieldsForCategory.mockClear();

    mockImageData = [{ name: 'image1.jpg', type: 'image/jpeg' }]; // Mock image file

    // Define a base valid data structure
    baseValidData = {
      category: 'Wedding Photographer',
      title: 'Beautiful Wedding Photography',
      description: 'Capturing your special day.',
      languagesSpoken: ['english'],
      experienceYears: '3-5',
      cancellationPolicy: 'standard_30_day',
      // contactMethod: 'email', // Removed
      tiers: [
        {
          tierName: 'Basic Package',
          tierPrice: '500',
          tierDurationHours: '4',
          tierDescription: 'Basic coverage',
          tierInclusions: [{ id: 'consultation', label: 'Consultation', isCustom: false }],
        },
      ],
      addons: [],
      // Assuming 'Wedding Photographer' specific fields for this base data
      numberOfPhotographers: '1',
      photoDeliveryTime: '4 weeks',
      numberOfEditedPhotos: '300',
      rawPhotosIncluded: 'no',
      deliveryFormat: ['online_gallery'],
    };

    // Default mock for getFieldsForCategory to return commonFields plus some specific ones
    // Find 'title' in commonFields and ensure it's marked as required for testing
    const commonFieldsWithRequiredTitle = commonFields.map(field =>
      field.name === 'title' ? { ...field, required: true } : field
    );

    const weddingPhotographerSpecificFields = [
      { name: 'numberOfPhotographers', label: 'Number of Photographers', type: 'number', required: false },
      { name: 'photoDeliveryTime', label: 'Photo Delivery Time', type: 'text', required: false },
      { name: 'numberOfEditedPhotos', label: 'Number of Edited Photos', type: 'text', required: true }, // Made one required
      { name: 'rawPhotosIncluded', label: 'Raw Photos Included?', type: 'select', required: false, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { name: 'deliveryFormat', label: 'Photo Delivery Format', type: 'multi-select', required: false, options: [{ value: 'online_gallery', label: 'Online Gallery' }] },
    ];
    // Use the modified commonFields list for the mock
    getFieldsForCategory.mockReturnValue([...commonFieldsWithRequiredTitle, ...weddingPhotographerSpecificFields]);
  });

  // 1. Basic Valid Input
  describe('Basic Valid Input', () => {
    it('should return null for valid input', () => {
      const result = validateServiceInput({ data: baseValidData, images: mockImageData });
      expect(result).toBeNull();
    });
  });

  // 2. Missing Required Fields
  describe('Missing Required Fields', () => {
    it('should return error if category is missing', () => {
      const data = { ...baseValidData, category: '' };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe('Please select a service category.');
    });

    it('should return error if a required common field (e.g., title) is missing', () => {
      const data = { ...baseValidData, title: '' };
      // The beforeEach setup already ensures title is required via commonFieldsWithRequiredTitle
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe('Title is required.');
    });

    it('should return error if a required category-specific field is missing', () => {
      // numberOfEditedPhotos is marked as required in the beforeEach mock for Wedding Photographer
      const data = { ...baseValidData, numberOfEditedPhotos: '' };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe('Number of Edited Photos is required.');
    });
  });

  // 3. Invalid Field Types
  describe('Invalid Field Types', () => {
    it('should return error if a number field has non-numeric string', () => {
      // numberOfPhotographers is type: 'number' as per weddingPhotographerSpecificFields
      const data = { ...baseValidData, numberOfPhotographers: 'abc' };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe('Number of Photographers must be a valid number.');
    });
  });

  // 4. Tier Validations
  describe('Tier Validations', () => {
    it('should return error if no tiers are provided', () => {
      const data = { ...baseValidData, tiers: [] };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe('Please define at least one service package/tier.');
    });

    it('should return error if a tier is missing a name', () => {
      const data = { ...baseValidData, tiers: [{ ...baseValidData.tiers[0], tierName: '' }] };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe('Package 1 must have a name.');
    });

    it('should return error if a tier has a non-positive price', () => {
      const data = { ...baseValidData, tiers: [{ ...baseValidData.tiers[0], tierPrice: '0' }] };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Price for package 'Basic Package' must be a positive number.");
    });

    it('should return error if a tier has an invalid price string', () => {
      const data = { ...baseValidData, tiers: [{ ...baseValidData.tiers[0], tierPrice: 'abc' }] };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Price for package 'Basic Package' is not a valid number.");
    });

    it('should return error if a tier is missing tierInclusions', () => {
      const data = { ...baseValidData, tiers: [{ ...baseValidData.tiers[0], tierInclusions: [] }] };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Package 'Basic Package' must include at least one feature/item.");
    });

    it('should return error if a tier has invalid tierDurationHours (negative)', () => {
      const data = { ...baseValidData, tiers: [{ ...baseValidData.tiers[0], tierDurationHours: '-5' }] };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Duration for package 'Basic Package' must be a positive number if specified.");
    });

    it('should return error if a tier has invalid tierDurationHours (non-numeric)', () => {
      const data = { ...baseValidData, tiers: [{ ...baseValidData.tiers[0], tierDurationHours: 'abc' }] };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Duration for package 'Basic Package' must be a positive number if specified.");
    });

    it('should return null for valid tier prices (strictly increasing)', () => {
      const data = {
        ...baseValidData,
        tiers: [
          { tierName: 'Bronze', tierPrice: '10', tierInclusions: ['Feature 1'] },
          { tierName: 'Silver', tierPrice: '20', tierInclusions: ['Feature 1', 'Feature 2'] },
          { tierName: 'Gold', tierPrice: '30', tierInclusions: ['Feature 1', 'Feature 2', 'Feature 3'] },
        ],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBeNull();
    });

    it('should return error if tier price is not strictly greater than previous (equal)', () => {
      const data = {
        ...baseValidData,
        tiers: [
          { tierName: 'Bronze', tierPrice: '10', tierInclusions: ['Feature 1'] },
          { tierName: 'Silver', tierPrice: '10', tierInclusions: ['Feature 1', 'Feature 2'] },
          { tierName: 'Gold', tierPrice: '20', tierInclusions: ['Feature 1', 'Feature 2', 'Feature 3'] },
        ],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Price for package 'Silver' must be higher than the previous package's price.");
    });

    it('should return error if tier price is lower than previous', () => {
      const data = {
        ...baseValidData,
        tiers: [
          { tierName: 'Bronze', tierPrice: '10', tierInclusions: ['Feature 1'] },
          { tierName: 'Silver', tierPrice: '5', tierInclusions: ['Feature 1', 'Feature 2'] },
          { tierName: 'Gold', tierPrice: '15', tierInclusions: ['Feature 1', 'Feature 2', 'Feature 3'] },
        ],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Price for package 'Silver' must be higher than the previous package's price.");
    });

    it('should handle single tier without price progression error', () => {
      // baseValidData already has a single tier, so this is implicitly tested if not failing elsewhere
      // For clarity, explicitly create data with just one tier
      const data = {
        ...baseValidData,
        tiers: [
          { tierName: 'Solo', tierPrice: '100', tierInclusions: ['Feature 1'] },
        ],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      // Expect null assuming all other aspects of 'Solo' tier are valid
      // This test primarily ensures the price progression logic doesn't crash on i=0
      expect(result).toBeNull();
    });

    it('should correctly identify the failing tier in a sequence', () => {
      const data = {
        ...baseValidData,
        tiers: [
          { tierName: 'Tier A', tierPrice: '10', tierInclusions: ['Feature 1'] },
          { tierName: 'Tier B', tierPrice: '20', tierInclusions: ['Feature 1', 'Feature 2'] },
          { tierName: 'Tier C', tierPrice: '15', tierInclusions: ['Feature 1', 'Feature 2', 'Feature 3'] }, // Fails here
          { tierName: 'Tier D', tierPrice: '25', tierInclusions: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
        ],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Price for package 'Tier C' must be higher than the previous package's price.");
    });
  });

  // 5. Addon Validations
  describe('Addon Validations', () => {
    it('should return error if a custom addon is missing a name', () => {
      const data = {
        ...baseValidData,
        addons: [{ isCustom: true, addonName: '', addonPrice: '50', addonDescription: 'Test' }],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe('Each add-on (Add-on 1) must have a name or a predefined service selected.');
    });

    it('should return error if a custom addon has a non-positive price', () => {
      const data = {
        ...baseValidData,
        addons: [{ isCustom: true, addonName: 'Custom Addon', addonPrice: '0', addonDescription: 'Test' }],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Price for add-on 'Custom Addon' must be a positive number.");
    });

    it('should return error if a custom addon has an invalid price string', () => {
      const data = {
        ...baseValidData,
        addons: [{ isCustom: true, addonName: 'Custom Addon', addonPrice: 'abc', addonDescription: 'Test' }],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Price for add-on 'Custom Addon' is not a valid number.");
    });

    it('should return error if a predefined addon uses an invalid predefinedId', () => {
      const data = {
        ...baseValidData,
        addons: [{ isCustom: false, predefinedId: 'invalid-id-123', addonPrice: '50' }],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe("Add-on Predefined Add-on (ID: invalid-id-123) uses an invalid predefined ID. Please re-select or contact support.");
    });

    it('should return null if a valid predefined addon is selected and price is valid', () => {
      if (predefinedAddons.length === 0) {
        console.warn("Skipping predefined addon test as predefinedAddons array is empty.");
        return;
      }
      const validPredefinedId = predefinedAddons[0].id;
      const data = {
        ...baseValidData,
        addons: [{ isCustom: false, predefinedId: validPredefinedId, addonPrice: '100' }],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBeNull();
    });

    it('should return error if a predefined addon is selected but price is invalid (e.g., zero)', () => {
      if (predefinedAddons.length === 0) {
        console.warn("Skipping predefined addon test as predefinedAddons array is empty.");
        return;
      }
      const validPredefinedId = predefinedAddons[0].id;
      const addonLabel = predefinedAddons.find(pa => pa.id === validPredefinedId)?.label;
      const data = {
        ...baseValidData,
        addons: [{ isCustom: false, predefinedId: validPredefinedId, addonPrice: '0' }],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe(`Price for add-on '${addonLabel}' must be a positive number.`);
    });

    it('should return error if a predefined addon is selected but price is non-numeric', () => {
      if (predefinedAddons.length === 0) {
        console.warn("Skipping predefined addon test as predefinedAddons array is empty.");
        return;
      }
      const validPredefinedId = predefinedAddons[0].id;
      const addonLabel = predefinedAddons.find(pa => pa.id === validPredefinedId)?.label;
      const data = {
        ...baseValidData,
        addons: [{ isCustom: false, predefinedId: validPredefinedId, addonPrice: 'abc' }],
      };
      const result = validateServiceInput({ data, images: mockImageData });
      expect(result).toBe(`Price for add-on '${addonLabel}' is not a valid number.`);
    });
  });

  // 6. Image Validations
  describe('Image Validations', () => {
    it('should return error if no images are provided', () => {
      const result = validateServiceInput({ data: baseValidData, images: [] });
      expect(result).toBe('Please upload at least one main image for the service.');
    });
  });
});
