// 1. Predefined Options for Picklists
export const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'mandarin', label: 'Mandarin Chinese' },
  { value: 'malay', label: 'Malay' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'hindi', label: 'Hindi' },
  // Add more common languages as needed
];

export const experienceYearOptions = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: '10+ years' },
];

export const contactMethodOptions = [
  { value: 'platform_chat', label: 'Platform Chat Only' },
  { value: 'email', label: 'Email (Shared after booking)' },
  { value: 'phone', label: 'Phone (Shared after booking)' },
];

// Removed contactMethodOptions

export const deliveryFormatOptions = [ // Example for photographer/videographer
  { value: 'online_gallery', label: 'Online Gallery' },
  { value: 'usb_drive', label: 'USB Drive' },
  { value: 'digital_download', label: 'Digital Download Link' },
];

const yesNoAddonOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'addon', label: 'Available as Add-on' } // Indicates the feature can be offered as a paid extra
];

// 2. Common Fields Definition
export const commonFields = [
  { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Full Day Wedding Photography Service' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe your service, approach, and what makes you unique.' },
  { name: 'languagesSpoken', label: 'Languages Spoken', type: 'multi-select', required: true, options: languageOptions },
  { name: 'experienceYears', label: 'Years of Experience', type: 'select', required: true, options: experienceYearOptions },
  {
    name: 'cancellationPolicy',
    label: 'Cancellation Policy',
    type: 'select',
    required: true,
    options: [
      { value: 'flexible_7_day', label: 'Flexible (Full refund if canceled within 7 days)' },
      { value: 'standard_30_day', label: 'Standard (Full refund if canceled within 30 days)' },
      { value: 'strict_90_day', label: 'Strict (Full refund if canceled within 90 days)' },
    ]
  },
  // { name: 'contactMethod', label: 'Preferred Contact Method (Post-Booking)', type: 'select', required: false, options: contactMethodOptions }, // Removed
  {
    name: 'availableDays',
    label: 'Available Days of the Week',
    type: 'multi-select',
    required: true,
    options: [
      { value: 'monday', label: 'Monday' },
      { value: 'tuesday', label: 'Tuesday' },
      { value: 'wednesday', label: 'Wednesday' },
      { value: 'thursday', label: 'Thursday' },
      { value: 'friday', label: 'Friday' },
      { value: 'saturday', label: 'Saturday' },
      { value: 'sunday', label: 'Sunday' },
    ],
    helpText: 'Select the regular days your service is typically available. Specify public holiday availability separately below.'
  },
  {
    name: 'availableOnPublicHolidays',
    label: 'Available on Singapore Public Holidays?',
    type: 'toggle', // Changed from 'select' to 'toggle'
    required: true,
    // Options are removed as it's a toggle now
    helpText: 'Specify if your service can be booked on Singapore public holidays.'
  },
];

// 3. Category-Specific Fields (Illustrative - expand based on user's full list)
// These are fields *in addition* to commonFields.
export const weddingServiceFields = {
  "Wedding Photographer": [
    { name: 'numberOfPhotographers', label: 'Number of Photographers', type: 'integer', required: false, placeholder: 'e.g., 1 or 2', min: 1 },
    { name: 'photoDeliveryTime', label: 'Photo Delivery Time', type: 'text', required: false, placeholder: 'e.g., 4-6 weeks' },
    { name: 'numberOfEditedPhotos', label: 'Number of Edited Photos', type: 'text', required: false, placeholder: 'e.g., Approx. 500' },
    { name: 'rawPhotosIncluded', label: 'Raw Photos Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'deliveryFormat', label: 'Photo Delivery Format', type: 'multi-select', required: false, options: deliveryFormatOptions },
  ],
  "Wedding Videographer": [
    { name: 'numberOfVideographers', label: 'Number of Videographers', type: 'integer', required: false, placeholder: 'e.g., 1 or 2', min: 1 },
    { name: 'videoLengthEstimate', label: 'Estimated Video Length', type: 'text', required: false, placeholder: 'e.g., 3-5 min highlight, 20 min feature' },
    { name: 'sameDayEdit', label: 'Same Day Edit Available?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'droneUsage', label: 'Drone Usage Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'videoDeliveryTime', label: 'Video Delivery Time', type: 'text', required: false, placeholder: 'e.g., 6-8 weeks' },
  ],
  "Bridal Makeup Artist": [
    { name: 'trialMakeupIncluded', label: 'Trial Makeup Session Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'touchUpService', label: 'On-site Touch-up Service?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'brandsUsed', label: 'Brands of Makeup Used', type: 'text', required: false, placeholder: 'e.g., MAC, Dior, NARS (Optional)' },
    { name: 'additionalPaxMakeup', label: 'Makeup for Additional Pax (e.g., Bridesmaids)?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Wedding Emcee": [
    { name: 'hostingStyle', label: 'Hosting Style', type: 'text', required: false, placeholder: 'e.g., Bilingual, Humorous, Formal' },
    { name: 'programConsultation', label: 'Program Consultation Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'scriptWriting', label: 'Script Writing Assistance?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Wedding Band": [
    { name: 'bandSize', label: 'Number of Musicians/Vocalists', type: 'text', required: false, placeholder: 'e.g., 2-piece, 5-piece' },
    { name: 'musicGenres', label: 'Music Genres Offered', type: 'text', required: false, placeholder: 'e.g., Pop, Jazz, Ballads' },
    { name: 'soundSystemProvided', label: 'Sound System Provided?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Wedding Decorator": [
    { name: 'decorThemeConsultation', label: 'Theme Consultation Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'packageOptions', label: 'Available Decor Package Options', type: 'textarea', required: false, placeholder: 'e.g., Stage setup, Floral arrangements, Aisle decor. Describe basic packages or customization options.' },
    { name: 'setupTearDownIncluded', label: 'Setup & Teardown Included?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "ROM Solemnizer": [
    { name: 'solemnizationStyle', label: 'Solemnization Style', type: 'text', required: false, placeholder: 'e.g., Modern, Traditional, Bilingual' },
    { name: 'scriptCustomization', label: 'Vow/Script Customization Offered?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'preMeeting', label: 'Pre-Solemnization Meeting?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Wedding Planner": [
    { name: 'planningScope', label: 'Scope of Planning Services', type: 'multi-select', required: false, options: [{ value: 'full', label: 'Full Planning' }, { value: 'partial', label: 'Partial Planning' }, { value: 'day_of', label: 'Day-of Coordination' }] },
    { name: 'vendorCoordination', label: 'Vendor Coordination Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'budgetManagement', label: 'Budget Management Assistance?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Photo Booth Services": [
    { name: 'boothType', label: 'Type of Photo Booth', type: 'text', required: false, placeholder: 'e.g., Open-air, Enclosed, Mirror Booth' },
    { name: 'propsIncluded', label: 'Props Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'instantPrints', label: 'Instant Prints Available?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'customBackdrop', label: 'Custom Backdrop Option?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Live Painter": [
    { name: 'paintingStyle', label: 'Painting Style', type: 'text', required: false, placeholder: 'e.g., Impressionistic, Realistic, Caricature' },
    { name: 'canvasSize', label: 'Typical Canvas Size', type: 'text', required: false, placeholder: 'e.g., 16x20 inches' },
    { name: 'paintingCompletionTime', label: 'On-site Painting Completion Time', type: 'text', required: false, placeholder: 'e.g., Completed during event, or studio touch-up' },
  ],
  "Florist": [
    { name: 'floralArrangementTypes', label: 'Types of Arrangements Offered', type: 'textarea', required: false, placeholder: 'e.g., Bridal bouquet, Corsages, Table centerpieces, Arch decor' },
    { name: 'flowerTypes', label: 'Commonly Used Flower Types', type: 'text', required: false, placeholder: 'e.g., Roses, Lilies, Orchids (Optional)' },
    { name: 'deliveryAndSetup', label: 'Delivery and Setup Included?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Gown Rental": [
    { name: 'gownStyles', label: 'Available Gown Styles', type: 'textarea', required: false, placeholder: 'e.g., A-line, Ballgown, Mermaid, Cheongsam' },
    { name: 'alterationIncluded', label: 'Basic Alteration Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'rentalDuration', label: 'Standard Rental Duration', type: 'text', required: false, placeholder: 'e.g., 3 days, 5 days' },
    { name: 'accessoriesIncluded', label: 'Accessories Included (Veil, Petticoat)?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
  "Suit Tailor": [
    { name: 'suitTypes', label: 'Types of Suits Offered', type: 'textarea', required: false, placeholder: 'e.g., 2-piece, 3-piece, Tuxedo, Bespoke, Made-to-Measure' },
    { name: 'fabricOptions', label: 'Fabric Options Available', type: 'text', required: false, placeholder: 'e.g., Wool, Linen, Cotton blends (Optional)' },
    { name: 'fittingsRequired', label: 'Number of Fittings Typically Required', type: 'integer', required: false, placeholder: 'e.g., 2-3', min: 0 },
    { name: 'leadTime', label: 'Typical Lead Time for Suit Completion', type: 'text', required: false, placeholder: 'e.g., 4-8 weeks' },
  ],
  "Catering Services": [
    { name: 'cuisineTypes', label: 'Cuisine Types Offered', type: 'textarea', required: false, placeholder: 'e.g., Chinese, Western, International Buffet, Halal options' },
    { name: 'menuCustomization', label: 'Menu Customization Available?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'foodTasting', label: 'Food Tasting Session Provided?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'staffingIncluded', label: 'Service Staff Included?', type: 'select', required: false, options: yesNoAddonOptions },
    { name: 'tablewareSetup', label: 'Tableware and Setup Included?', type: 'select', required: false, options: yesNoAddonOptions },
  ],
};

// 4. Predefined Inclusions (for Hybrid Model)
export const predefinedInclusions = [
  { id: 'consultation_pre', label: 'Pre-Event Consultation' },
  { id: 'high_res_photos', label: 'High-Resolution Edited Photos' },
  { id: 'online_gallery', label: 'Online Gallery (Client Access)' },
  { id: 'timeline_planning', label: 'Timeline Planning Assistance' },
  // Add more common inclusions
];

// 5. Predefined Add-ons (for Hybrid Model)
// defaultPrice and defaultDescription are optional and can be used to pre-fill add-on details in the form.
export const predefinedAddons = [
  { id: 'extra_hour_service', label: 'Additional Hour of Service', defaultPrice: '100', defaultDescription: 'One extra hour of on-site service.' },
  { id: 'raw_footage_access', label: 'Raw Footage/Photos Access', defaultPrice: '150', defaultDescription: 'Access to all unedited (RAW) footage or photos.' },
  { id: 'express_delivery', label: 'Express Delivery of Final Product', defaultPrice: '200', defaultDescription: 'Final product delivered in half the standard time.' },
  { id: 'second_photographer', label: 'Second Photographer/Assistant', defaultPrice: '300', defaultDescription: 'Ensures more coverage and different angles.' },
  // Add more common add-ons
];

// 6. Tier & Add-on Structure Configuration (Conceptual constants for form logic guidance)
export const tierStructureConfig = {
  maxTiers: 3,
  defaultTierNames: ['Basic', 'Standard', 'Premium'], // Suggestion for placeholders
  fieldsPerTier: [
    { name: 'tierName', label: 'Package Name', type: 'text', required: true },
    { name: 'tierPrice', label: 'Price', type: 'number', required: true },
    { name: 'tierDurationHours', label: 'Duration in this Package (Hours)', type: 'number', required: false },
    { name: 'tierDescription', label: 'Description of this Package', type: 'textarea', required: false },
    { name: 'tierInclusions', label: 'What\'s Included in this Package', type: 'hybridList', predefinedOptions: predefinedInclusions, required: false }, // 'hybridList' is a conceptual type
  ]
};

export const alaCarteAddonStructureConfig = {
  fieldsPerAddon: [
    // For custom addons, name is text. For predefined, it's selected.
    { name: 'addonName', label: 'Add-on Service/Item', type: 'hybridInput', predefinedOptions: predefinedAddons, required: true }, // 'hybridInput' is conceptual
    { name: 'addonPrice', label: 'Price for this Add-on', type: 'number', required: true },
    { name: 'addonDescription', label: 'Brief Description of Add-on', type: 'textarea', required: false },
  ]
};

// Helper function to get all fields for a category (common + specific).
// If a category name is not found in weddingServiceFields, it defaults to returning only commonFields.
export const getFieldsForCategory = (categoryName) => {
  const categorySpecificFields = weddingServiceFields[categoryName] || [];
  if (!weddingServiceFields[categoryName] && categoryName) { // only warn if categoryName was provided but not found
    console.warn(`No specific fields defined for category: "${categoryName}". Returning common fields only.`);
  }
  return [...commonFields, ...categorySpecificFields];
};
