import React, { useState, useEffect } from 'react';
import ImageUpload from "../ImageUpload"; // Assuming ImageUpload handles new files and displays existing ones
import { categories } from "../../utils/categories";
import { uploadServiceImages } from "../../utils/api.js"; // For uploading new images
import { toast } from 'react-toastify';
import {
    commonFields, // Renamed allCommonFields to commonFields for clarity if used directly
    getFieldsForCategory,
    // commonFields as allCommonFieldsOnly, // This alias seems redundant if commonFields is used directly
    predefinedInclusions,
    tierStructureConfig,
    predefinedAddons,
    alaCarteAddonStructureConfig,
} from "../../utils/serviceFieldDefinitions";

const inputClasses = "w-full px-4 py-3 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium focus:ring-primary focus:border-primary";

// Helper to get only the common field definitions that are not category or description (handled separately)
const otherCommonFields = commonFields.filter(f => f.name !== 'category' && f.name !== 'description' && f.name !== 'title');

const RenderField = ({ field, value, onChange, onDynamicChange, error }) => {
  const { name, label, type, required, placeholder, options, helpText, ...props } = field; // Added ...props
  const fieldSpecificInputClasses = `${inputClasses} ${error ? 'border-error' : ''}`;

  switch (type) {
    case 'text':
    case 'number':
    case 'integer': // Added integer type
    case 'date':
      // Determine input type attribute and inputMode for numeric fields
      let inputTypeAttr = type;
      let inputModeAttr = props.inputMode; // Use existing inputMode if passed via props

      if (type === 'integer') {
        inputTypeAttr = 'text'; // Use text for better control with onKeyDown
        inputModeAttr = 'numeric';
      } else if (type === 'number') {
        inputTypeAttr = 'text'; // Use text for better control with onKeyDown
        inputModeAttr = 'decimal';
      }

      return (
        <div>
          <label htmlFor={name} className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">{label}{required && '*'}</label>
          <input
            type={inputTypeAttr}
            inputMode={inputModeAttr}
            id={name}
            name={name}
            value={value || ''}
            onChange={onDynamicChange ? (e) => onDynamicChange(name, e.target.value) : onChange}
            onKeyDown={(e) => {
              if (type === 'integer') {
                if (!((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter' || (e.ctrlKey || e.metaKey))) {
                  e.preventDefault();
                }
              } else if (type === 'number') {
                // Allow numbers, one decimal point, backspace, delete, tab, arrows, enter
                // Prevent 'e', 'E', '+', '-'
                if (['e', 'E', '+', '-'].includes(e.key) || (e.key === '.' && (value || '').toString().includes('.'))) {
                  e.preventDefault();
                } else if (!((e.key >= '0' && e.key <= '9') || e.key === '.' || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter' || (e.ctrlKey || e.metaKey))) {
                  e.preventDefault();
                }
              }
            }}
            placeholder={placeholder}
            required={required}
            className={fieldSpecificInputClasses}
            {...props} // Spread additional props like min, max, step for number
          />
          {helpText && !error && <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">{helpText}</p>}
          {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>
      );
    case 'textarea':
      return (
        <div>
          <label htmlFor={name} className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">{label}{required && '*'}</label>
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={onDynamicChange ? (e) => onDynamicChange(name, e.target.value) : onChange}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={fieldSpecificInputClasses}
            {...props}
          />
          {helpText && !error && <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-medium">{helpText}</p>}
          {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>
      );
    case 'select':
      return (
        <div>
          <label htmlFor={name} className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">{label}{required && '*'}</label>
          <select
            id={name}
            name={name}
            value={value || ''}
            onChange={onDynamicChange ? (e) => onDynamicChange(name, e.target.value) : onChange}
            required={required}
            className={fieldSpecificInputClasses}
            {...props}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          {helpText && !error && <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">{helpText}</p>}
          {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>
      );
    case 'multi-select':
      return (
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">{label}{required && '*'}</label>
          <div className={`space-y-2 mt-2 p-2 rounded-md ${error ? 'border border-error' : ''}`}>
            {options?.map(opt => (
              <label key={opt.value} className="flex items-center text-neutral-dark dark:text-neutral-light">
                <input
                  type="checkbox"
                  name={name}
                  value={opt.value}
                  checked={Array.isArray(value) && value.includes(opt.value)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? [...value] : [];
                    if (e.target.checked) {
                      currentValues.push(opt.value);
                    } else {
                      const index = currentValues.indexOf(opt.value);
                      if (index > -1) currentValues.splice(index, 1);
                    }
                    if (onDynamicChange) onDynamicChange(name, currentValues);
                  }}
                  className="h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {helpText && !error && <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">{helpText}</p>}
          {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>
      );
    case 'toggle':
      // Assuming 'value' will be 'yes' or 'no'. Convert to boolean for the switch.
      const isChecked = value === 'yes';
      return (
        <div>
          <label htmlFor={name} className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">{label}{required && '*'}</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={isChecked}
              onChange={(e) => {
                // Convert boolean back to 'yes'/'no' string for onDynamicChange
                const stringValue = e.target.checked ? 'yes' : 'no';
                if (onDynamicChange) {
                  onDynamicChange(name, stringValue);
                } else if (onChange) { // Fallback, though onDynamicChange is preferred in this component
                  const event = { target: { name, value: stringValue }};
                  onChange(event);
                }
              }}
              className="sr-only peer" // Hide default checkbox
            />
            <div className={`w-11 h-6 bg-neutral-medium/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light dark:peer-focus:ring-accent rounded-full peer dark:bg-neutral-medium dark:border dark:border-neutral-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-medium/50 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${error ? 'ring-2 ring-error' : ''}`}></div>
            <span className="ml-3 text-sm font-medium text-neutral-dark dark:text-neutral-light">{isChecked ? 'Yes' : 'No'}</span>
          </label>
          {helpText && !error && <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">{helpText}</p>}
          {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>
      );
      case 'boolean': // For the 'disabled' field
      return (
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={!!value}
            onChange={onDynamicChange ? (e) => onDynamicChange(name, e.target.checked) : (e) => onChange({ target: { name, value: e.target.checked }})}
            className="h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2"
          />
          <label htmlFor={name} className="text-sm font-medium text-neutral-dark dark:text-neutral-light">{label}</label>
          {helpText && <p className="ml-2 text-xs text-neutral-medium dark:text-neutral-light">{helpText}</p>}
          {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>
      );
    default:
      return <p>Unsupported field type: {type}</p>;
  }
};


const MultiStepServiceForm = (props) => {
  // Destructure props, providing defaults for those not passed in create mode
  const {
    initialData = {}, // initialData.images will now be the source of truth
    onSubmit,
    isEditMode = false,
    // existingImageUrls = [], // This prop is no longer needed
    serviceId = null, // Default for create mode
    user = null,
    setParentLoading = () => {}, // No-op default
    // 'error' prop from parent seems to be unused now, internal stepErrors is used.
  } = props;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Assuming 5 steps as before

  // Internal state for form data, initialized from initialData if in edit mode
  const [formData, setFormData] = useState(() => {
    const baseData = initialData || {};
    
    if (baseData.tiers && Array.isArray(baseData.tiers)) {
      // Ensure initial tiers have IDs only once during initialization
      const tiersWithIds = baseData.tiers.map(tier => ({
        ...tier,
        id: tier.id || `tier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }));
      return { ...baseData, tiers: tiersWithIds };
    }
    
    return baseData;
  });
  const [newImageFiles, setNewImageFiles] = useState([]); // For files selected in ImageUpload
  const [currentExistingImages, setCurrentExistingImages] = useState(() => {
    return (initialData && initialData.images) ? [...initialData.images] : [];
  });

  const [currentCategorySpecificFields, setCurrentCategorySpecificFields] = useState([]);
  const [customTierInclusion, setCustomTierInclusion] = useState('');
  const [stepErrors, setStepErrors] = useState({});
  const [isSubmittingInternal, setIsSubmittingInternal] = useState(false);


  // Update category-specific fields when category changes
  useEffect(() => {
    if (formData.category) {
      const allFieldsForCategory = getFieldsForCategory(formData.category);
      const specificFields = allFieldsForCategory.filter(
        field => !commonFields.some(commonField => commonField.name === field.name && commonField.name !== 'title' && commonField.name !== 'description' && commonField.name !== 'category')
      );
      setCurrentCategorySpecificFields(specificFields);
    } else {
      setCurrentCategorySpecificFields([]);
    }
  }, [formData.category]);


  const handleStepValidation = () => {
    let errors = {};
    // Keep existing validation logic, but ensure it uses `formData`
    switch (currentStep) {
      case 1: // Core Details
        if (!formData.title?.trim()) errors.title = "Service Title is required.";
        if (!formData.category) errors.category = "Category is required.";
        if (!formData.description?.trim()) errors.description = "Detailed Description is required.";

        // Validate images: at least one image required (either existing or new)
        if (currentExistingImages.length === 0 && newImageFiles.length === 0) {
          errors.images = "At least one image is required for the service.";
        }

        commonFields.forEach(field => {
          if (field.required) {
            const value = formData[field.name];
            if (field.type === 'multi-select') {
                 if (!value || (Array.isArray(value) && value.length === 0)) {
                    errors[field.name] = `${field.label} is required.`;
                }
            } else if (field.type === 'number') {
                 if (value === undefined || value === null || value === '') { // Check for empty string too
                    errors[field.name] = `${field.label} is required.`;
                }
            }
            else if (!value || (typeof value === 'string' && !value.trim())) {
              errors[field.name] = `${field.label} is required.`;
            }
          }
        });
        break;
      case 2: // Category Specifics
        errors = {};
        currentCategorySpecificFields.forEach(field => {
          if (field.required) {
            const value = formData[field.name];
             if (field.type === 'multi-select') {
               if (!value || (Array.isArray(value) && value.length === 0)) {
                  errors[field.name] = `${field.label} is required.`;
              }
            } else if (field.type === 'number') {
                 if (value === undefined || value === null || value === '') {
                    errors[field.name] = `${field.label} is required.`;
                }
            } else if (!value || (typeof value === 'string' && !value.trim())) {
              errors[field.name] = `${field.label} is required.`;
            }
          }
        });
        break;
      case 3: // Tiers
        errors = {};
        if (!formData.tiers || formData.tiers.length === 0) {
          errors.tiers_general = "At least one service package (tier) is required.";
        } else {
          formData.tiers.forEach((tier, tierIndex) => {
            tierStructureConfig.fieldsPerTier.forEach(fieldDef => {
              if (fieldDef.required) {
                const value = tier[fieldDef.name];
                // START REMOVED VALIDATION
                // if (fieldDef.name === 'tierInclusions') {
                //   if (!value || value.length === 0) {
                //     errors[`tier_${tierIndex}_${fieldDef.name}`] = `Package ${tierIndex + 1}: At least one inclusion is required.`;
                //   }
                // } else
                // END REMOVED VALIDATION
                if (fieldDef.type === 'number') {
                    if (value === undefined || value === null || value === '') { // Check empty string
                        errors[`tier_${tierIndex}_${fieldDef.name}`] = `Package ${tierIndex + 1}: ${fieldDef.label} is required.`;
                    }
                }
                else if (!value || (typeof value === 'string' && !value.trim())) {
                  errors[`tier_${tierIndex}_${fieldDef.name}`] = `Package ${tierIndex + 1}: ${fieldDef.label} is required.`;
                }
              }
            });
          });
        }
        break;
      case 4: // Addons
        errors = {};
        (formData.addons || []).forEach((addon, addonIndex) => {
          if (addon.isCustom) {
            if (!addon.addonName?.trim()) {
              errors[`addon_${addonIndex}_addonName`] = `Add-on ${addonIndex + 1}: Custom name is required.`;
            }
          } else { // Predefined
            if (!addon.predefinedId) {
              errors[`addon_${addonIndex}_predefinedId`] = `Add-on ${addonIndex + 1}: Predefined service selection is required.`;
            }
          }
          // Common validation for price/description for both types of addons
          alaCarteAddonStructureConfig.fieldsPerAddon.forEach(fieldDef => {
            // Skip addonName for predefined as it's derived
            if (fieldDef.required && (addon.isCustom || fieldDef.name !== 'addonName')) {
              const value = addon[fieldDef.name];
              if (fieldDef.type === 'number') {
                if (value === undefined || value === null || value === '') { // Check empty string
                  errors[`addon_${addonIndex}_${fieldDef.name}`] = `Add-on ${addonIndex + 1}: ${fieldDef.label} is required.`;
                }
              } else if (!value || (typeof value === 'string' && !value.trim())) {
                errors[`addon_${addonIndex}_${fieldDef.name}`] = `Add-on ${addonIndex + 1}: ${fieldDef.label} is required.`;
              }
            }
          });
        });
        break;
      default: // Review step or others
        setStepErrors({});
        return true; // No validation or handled by proceeding
    }

    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return false;
    }
    setStepErrors({});
    return true;
  };


  const nextStep = () => {
    if (!handleStepValidation()) {
      return;
    }
    setStepErrors({}); // Clear errors before proceeding
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setStepErrors({}); // Clear errors when going back
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Update from `data` to `formData` for all handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleDynamicFieldChange = (fieldName, fieldValue) => {
    setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
  };

  const addTier = () => {
    if ((formData.tiers?.length || 0) < tierStructureConfig.maxTiers) {
      const newTierId = `tier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setFormData(prev => ({
        ...prev,
        tiers: [...(prev.tiers || []), {
            id: newTierId, // Add unique ID to the new tier
            tierName: tierStructureConfig.defaultTierNames[prev.tiers?.length || 0] || `Package ${ (prev.tiers?.length || 0) + 1}`,
            tierPrice: '', tierDurationHours: '', tierDescription: '', tierInclusions: []
        }]
      }));
    }
  };

  const removeTier = (index) => {
    setFormData(prev => ({ ...prev, tiers: prev.tiers.filter((_, i) => i !== index) }));
  };

  const handleTierChange = (tierIndex, fieldName, value) => {
    setFormData(prev => {
      const newTiers = prev.tiers.map((tier, i) => {
        if (i === tierIndex) {
          let processedValue = value;
          const fieldDefinition = tierStructureConfig.fieldsPerTier.find(f => f.name === fieldName);
          if (fieldDefinition && fieldDefinition.type === 'number') {
            // Convert to number, ensuring empty string becomes null or undefined if appropriate,
            // or parseFloat for actual numbers.
            // If value is an empty string or cannot be parsed, it might become NaN.
            // Consider how to handle empty numeric fields (e.g., treat as 0, null, or prevent submission via validation)
            processedValue = value === '' ? '' : parseFloat(value); // Keep empty string as is for validation, parse otherwise
            if (isNaN(processedValue) && value !== '') { // If parsing results in NaN and it wasn't an empty string
                processedValue = value; // Fallback to original value if parsing fails for non-empty string (e.g. text in number field)
                                      // Validation should catch this.
            }
          }
          return { ...tier, [fieldName]: processedValue };
        }
        return tier;
      });
      return { ...prev, tiers: newTiers };
    });
  };

  const handleTierInclusionChange = (tierIndex, inclusionId, isChecked) => {
    setFormData(prev => ({
      ...prev,
      tiers: prev.tiers.map((tier, i) => {
        if (i === tierIndex) {
          const newInclusions = [...(tier.tierInclusions || [])];
          const selectedInclusion = predefinedInclusions.find(pi => pi.id === inclusionId);
          if (isChecked) {
            if (selectedInclusion && !newInclusions.find(inc => inc.id === inclusionId && inc.isPredefined)) {
              newInclusions.push({ id: inclusionId, label: selectedInclusion.label, isPredefined: true });
            }
          } else {
            const itemIndex = newInclusions.findIndex(inc => inc.id === inclusionId && inc.isPredefined);
            if (itemIndex > -1) newInclusions.splice(itemIndex, 1);
          }
          return { ...tier, tierInclusions: newInclusions };
        }
        return tier;
      })
    }));
  };

  const addCustomTierInclusion = (tierIndex) => {
    if (customTierInclusion.trim()) {
      setFormData(prev => ({
        ...prev,
        tiers: prev.tiers.map((tier, i) => {
          if (i === tierIndex) {
            // Prevent duplicate custom inclusions by label
            if(!(tier.tierInclusions || []).some(inc => inc.label === customTierInclusion.trim() && !inc.isPredefined)) {
              return { ...tier, tierInclusions: [...(tier.tierInclusions || []), { id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, label: customTierInclusion.trim(), isPredefined: false }] };
            }
          }
          return tier;
        })
      }));
      setCustomTierInclusion(''); // Clear input after adding
    }
  };

  const removeTierInclusion = (tierIndex, inclusionIdToRemove) => {
     setFormData(prev => ({
      ...prev,
      tiers: prev.tiers.map((tier, i) => {
        if (i === tierIndex) {
          return { ...tier, tierInclusions: (tier.tierInclusions || []).filter(inc => inc.id !== inclusionIdToRemove) };
        }
        return tier;
      })
    }));
  };

  const addAddon = () => {
    setFormData(prev => ({
      ...prev,
      addons: [...(prev.addons || []), {
        addonName: '', addonPrice: '', addonDescription: '', isCustom: true, predefinedId: null // Ensure predefinedId is null for new custom
      }]
    }));
  };

  const removeAddon = (index) => {
    setFormData(prev => ({ ...prev, addons: prev.addons.filter((_, i) => i !== index) }));
  };

  const handleAddonChange = (addonIndex, fieldName, value, isPredefinedSelection = false) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.map((addon, i) => {
        if (i === addonIndex) {
          if (isPredefinedSelection) {
            const selectedPredefined = predefinedAddons.find(pa => pa.id === value);
            return {
              ...addon,
              addonName: selectedPredefined ? selectedPredefined.label : '',
              predefinedId: value || null, // Store null if no selection
              isCustom: !selectedPredefined, // Custom if no valid predefined selected
              addonPrice: selectedPredefined ? selectedPredefined.defaultPrice || '' : '', // Reset price for new selection
              addonDescription: selectedPredefined ? selectedPredefined.defaultDescription || '' : '', // Reset desc
            };
          }
          return { ...addon, [fieldName]: value };
        }
        return addon;
      })
    }));
  };

  const handleAddonCustomNameToggle = (addonIndex, newIsCustomState) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.map((addon, i) => {
        if (i === addonIndex) {
          const resetAddon = {
            ...addon,
            isCustom: newIsCustomState,
            predefinedId: newIsCustomState ? null : addon.predefinedId, // Clear predefinedId if switching to custom
            addonName: newIsCustomState ? '' : (addon.predefinedId ? predefinedAddons.find(pa => pa.id === addon.predefinedId)?.label || '' : ''),
            addonPrice: '', // Reset price and description on type toggle
            addonDescription: '',
          };
          return resetAddon;
        }
        return addon;
      })
    }));
  };

  // Image handling for edit mode in Step 1
  const handleImageFilesChange = (files) => {
    setNewImageFiles(files); // Update state for new image files
  };

  const handleRemoveExistingImage = (imageUrlToRemove) => {
    setCurrentExistingImages(prev => prev.filter(url => url !== imageUrlToRemove));
  };

  const finalFormSubmit = async () => {
    if (!handleStepValidation()) { // Perform final validation for the current step (review step usually has none)
        toast.error("Please ensure all required fields are filled correctly.");
        return;
    }
    setIsSubmittingInternal(true);
    setParentLoading(true);

    // Add check for user and user.uid
    if (!props.user || !props.user.uid) {
        toast.error("User information is missing. Cannot submit the form.");
        setIsSubmittingInternal(false);
        setParentLoading(false);
        return;
    }

    let finalImageUrls = [...currentExistingImages];
    if (newImageFiles.length > 0) {
        try {
            // Ensure serviceId and user.uid are available for image path generation
            // The check above ensures props.user.uid exists.
            if (!serviceId && !isEditMode) { // For create mode, serviceId might not exist yet. Backend should handle this.
                 // Or, if serviceId is generated client-side for create mode, use that.
                 // This part depends on how serviceId is handled in create flow.
                 // For now, let's assume image upload might need a temporary ID or user ID path.
                 // The parent [serviceId].jsx handles this for edit by passing serviceId.
                 // For create, the create.jsx page should handle it.
                 // This component is generic, so it relies on parent providing necessary IDs.
            }
            const uploadedNewImageUrls = await uploadServiceImages(newImageFiles, props.user.uid); // Use props.user.uid
            finalImageUrls = [...finalImageUrls, ...uploadedNewImageUrls];
        } catch (uploadError) {
            console.error("Error uploading new images:", uploadError);
            toast.error("Failed to upload new images. " + (uploadError.message || ""));
            setIsSubmittingInternal(false);
            setParentLoading(false);
            return;
        }
    }

    // Prepare final data payload
    let finalPayload = { ...formData, images: finalImageUrls };

    // Ensure numeric fields in tiers are numbers
    // Helper function to parse numeric fields based on type
    const parseNumericField = (value, fieldDef) => {
      if (value === '' || value === null || value === undefined) {
        return fieldDef.required ? (fieldDef.type === 'integer' ? 0 : 0.0) : null; // Default for required empty, else null
      }
      let parsedValue = fieldDef.type === 'integer' ? parseInt(value, 10) : parseFloat(value);
      if (isNaN(parsedValue)) {
        console.warn(`Field ${fieldDef.name} with value "${value}" was NaN after parse. Setting to null or 0 based on requirement.`);
        return fieldDef.required ? (fieldDef.type === 'integer' ? 0 : 0.0) : null;
      }
      return parsedValue;
    };

    if (finalPayload.tiers && Array.isArray(finalPayload.tiers)) {
      finalPayload.tiers = finalPayload.tiers.map(tier => {
        const processedTier = { ...tier };
        tierStructureConfig.fieldsPerTier.forEach(fieldDef => {
          if ((fieldDef.type === 'number' || fieldDef.type === 'integer') && processedTier[fieldDef.name] !== undefined) {
            processedTier[fieldDef.name] = parseNumericField(processedTier[fieldDef.name], fieldDef);
          }
        });
        return processedTier;
      });
    }

    if (finalPayload.addons && Array.isArray(finalPayload.addons)) {
      finalPayload.addons = finalPayload.addons.map(addon => {
        const processedAddon = { ...addon };
        alaCarteAddonStructureConfig.fieldsPerAddon.forEach(fieldDef => {
          if ((fieldDef.type === 'number' || fieldDef.type === 'integer') && processedAddon[fieldDef.name] !== undefined) {
            processedAddon[fieldDef.name] = parseNumericField(processedAddon[fieldDef.name], fieldDef);
          }
        });
        return processedAddon;
      });
    }

    // Ensure numeric fields in category-specific and common fields are parsed
    const allFieldsForCategory = formData.category ? getFieldsForCategory(formData.category) : commonFields;
    allFieldsForCategory.forEach(fieldDef => {
        if ((fieldDef.type === 'number' || fieldDef.type === 'integer') && finalPayload[fieldDef.name] !== undefined) {
            finalPayload[fieldDef.name] = parseNumericField(finalPayload[fieldDef.name], fieldDef);
        }
    });


    // Call the onSubmit passed from parent (e.g., handleFormSubmit in [serviceId].jsx)
    await onSubmit(finalPayload);

    setIsSubmittingInternal(false);
    setParentLoading(false);
  };


  return (
    <div className="space-y-8">
      <div className="px-4 py-2 bg-neutral-light dark:bg-neutral-dark rounded-lg shadow">
        <p className="text-sm font-medium text-center text-neutral-dark dark:text-neutral-light">Step {currentStep} of {totalSteps}</p>
        <div className="mt-1 w-full bg-neutral-medium/30 rounded-full h-2.5 dark:bg-neutral-medium/50">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
        </div>
      </div>

      {/* Display general error from parent if any, but stepErrors are more specific */}
      {props.error && !Object.keys(stepErrors).length && (
        <div className="p-4 bg-error/20 dark:bg-red-900/30 border-l-4 border-error dark:border-error rounded-lg">
          <p className="text-sm font-medium text-red-600 dark:text-red-200">{props.error}</p>
        </div>
      )}

      {currentStep === 1 && (
        <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Step 1: Core Details</h2>
          {/* Title */}
          <div>
            <RenderField
              field={commonFields.find(f => f.name === 'title')}
              value={formData.title}
              onDynamicChange={handleDynamicFieldChange}
              error={stepErrors.title}
            />
          </div>
          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">Category*</label>
            <p className="text-xs text-neutral-medium dark:text-neutral-light mb-2">
              Select the category that best describes your service. This will help us tailor the next steps for you.
            </p>
            <select
              id="category" name="category" value={formData.category || ''} onChange={handleChange} required
              className={`w-full px-4 py-3 border rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light focus:ring-primary focus:border-primary ${stepErrors.category ? 'border-error' : 'border-neutral-medium/50 dark:border-neutral-medium'}`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
            </select>
            {stepErrors.category && <p className="text-error text-xs mt-1">{stepErrors.category}</p>}
          </div>
           {/* Description */}
          <div>
            <RenderField
              field={commonFields.find(f => f.name === 'description')}
              value={formData.description}
              onDynamicChange={handleDynamicFieldChange}
              error={stepErrors.description}
            />
          </div>
          {/* Other Common Fields */}
          {otherCommonFields.map(field => (
              <div key={`common-${field.name}`}>
                <RenderField field={field} value={formData[field.name]} onDynamicChange={handleDynamicFieldChange} error={stepErrors[field.name]}/>
              </div>
          ))}
           {/* Disabled field for Edit Mode */}
           {isEditMode && (
            <div>
                <RenderField
                    field={{ name: 'disabled', label: 'Disable this service (will be hidden from listings)', type: 'boolean' }}
                    value={formData.disabled}
                    onDynamicChange={handleDynamicFieldChange}
                    error={stepErrors.disabled}
                />
            </div>
          )}
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">Images*</label>
             <ImageUpload
                files={newImageFiles} // Pass new files state
                setFile={handleImageFilesChange} // Handler for new files
                existingImages={currentExistingImages} // Pass current existing images state
                setExistingImages={handleRemoveExistingImage} // Handler for removing existing image
                maxFiles={5}
                maxSizeMB={2}
                isEditMode={isEditMode} // Pass edit mode to ImageUpload if it needs different logic
            />
            {stepErrors.images && <p className="text-error text-xs mt-1">{stepErrors.images}</p>}
            <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">Upload images for your service. Max 5 images, 2MB each.</p>
          </div>

          {Object.keys(stepErrors).length > 0 && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-md mt-4">
              <p className="text-sm text-error font-medium">Please correct the errors above before proceeding.</p>
            </div>
          )}
          <div className="flex justify-center">
            <button onClick={nextStep} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm">Next</button>
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">
            Step 2: {formData.category ? `${formData.category} Specifics` : 'Category Specifics'}
          </h2>

          {!formData.category ? (
            <p className="text-accent-orange/80 dark:text-accent-orange/90 text-sm p-3 bg-accent-orange/10 dark:bg-accent-orange/20 rounded-md border border-accent-orange/30">
              Please select a category in Step 1 first.
            </p>
          ) : currentCategorySpecificFields.length > 0 ? (
            <div className="p-4 border border-neutral-medium/30 dark:border-neutral-medium/50 rounded-lg bg-neutral-light/50 dark:bg-neutral-dark/30 space-y-4">
              <h4 className="text-md font-semibold text-neutral-dark dark:text-neutral-light border-b border-neutral-medium/30 pb-2">
                Specifics for {formData.category}
              </h4>
              <div className="space-y-4">
                {currentCategorySpecificFields.map(field => (
                  <div key={`specific-${field.name}`}>
                    <RenderField field={field} value={formData[field.name]} onDynamicChange={handleDynamicFieldChange} error={stepErrors[field.name]} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-neutral-dark dark:text-neutral-light text-sm p-3 bg-sky-100/70 dark:bg-sky-800/30 rounded-md border border-sky-300/50 dark:border-sky-600/50">
              No specific fields for this category. You can proceed to the next step.
            </p>
          )}
          {Object.keys(stepErrors).length > 0 && !stepErrors.tiers_general && !stepErrors.images && !stepErrors.title && !stepErrors.category && !stepErrors.description && !commonFields.some(cf => stepErrors[cf.name]) && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-md mt-4">
              <p className="text-sm text-error font-medium">Please correct the errors above before proceeding.</p>
            </div>
          )}
          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={prevStep} className="bg-neutral-medium hover:bg-neutral-dark text-white px-4 py-2 rounded-lg text-sm">Previous</button>
            <button onClick={nextStep} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm"
              disabled={!formData.category && currentCategorySpecificFields.length === 0} // Corrected condition
            >Next</button>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Step 3: Service Packages (Tiers)</h2>
            {(formData.tiers?.length || 0) < tierStructureConfig.maxTiers && (
                <button type="button" onClick={addTier} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm">Add Package Tier</button>
            )}
          </div>
            {stepErrors.tiers_general && ( // Use general tier error key
                <div className="p-3 bg-error/10 border border-error/30 rounded-md mb-4">
                    <p className="text-sm text-error font-medium">{stepErrors.tiers_general}</p>
                </div>
            )}
            {(formData.tiers || []).map((tier, tierIndex) => (
            // Use tier.id for the key if available, otherwise fall back to tierIndex.
            // This is important because tier.id is now being generated.
            <div key={tier.id || tierIndex} className="p-4 border border-neutral-medium/30 dark:border-neutral-medium/40 rounded-xl shadow-sm bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-5">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-medium/20 dark:border-neutral-medium/30">
                <h3 className="text-lg font-semibold text-primary dark:text-primary-light">
                  {tier.tierName || `Package Tier ${tierIndex + 1}`}
                </h3>
                <button type="button" onClick={() => removeTier(tierIndex)} className="text-error hover:text-red-700 dark:hover:text-red-400 text-sm font-medium">Remove Tier</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {tierStructureConfig.fieldsPerTier.filter(f => f.name !== 'tierInclusions').map(fieldDef => (
                  <div key={fieldDef.name}>
                    <RenderField field={fieldDef} value={tier[fieldDef.name]} onDynamicChange={(name, val) => handleTierChange(tierIndex, name, val)} error={stepErrors[`tier_${tierIndex}_${fieldDef.name}`]}/>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-3 border-t border-neutral-medium/20 dark:border-neutral-medium/30">
                <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-light">
                  {tierStructureConfig.fieldsPerTier.find(f=>f.name==='tierInclusions')?.label || 'Inclusions'}
                  {tierStructureConfig.fieldsPerTier.find(f=>f.name==='tierInclusions')?.required && '*'}
                </label>
                 {stepErrors[`tier_${tierIndex}_tierInclusions`] && <p className="text-error text-xs mb-1">{stepErrors[`tier_${tierIndex}_tierInclusions`]}</p>}
                {predefinedInclusions.length > 0 && (
                  <div className={`p-3 border rounded-md bg-neutral-light/20 dark:bg-neutral-dark/10 ${stepErrors[`tier_${tierIndex}_tierInclusions`] ? 'border-error' : 'border-neutral-medium/20 dark:border-neutral-medium/30'}`}>
                    <p className="text-xs font-medium text-neutral-dark dark:text-neutral-light mb-2">Choose from predefined features:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {predefinedInclusions.map(incOption => (
                        <label key={incOption.id} className="flex items-center text-sm text-neutral-dark dark:text-neutral-light">
                          <input type="checkbox" checked={(tier.tierInclusions || []).some(i => i.id === incOption.id && i.isPredefined)} onChange={(e) => handleTierInclusionChange(tierIndex, incOption.id, e.target.checked)}
                                 className="h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2" />
                          {incOption.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <p className="text-xs font-medium text-neutral-dark dark:text-neutral-light mb-1">Or add your own custom features for this tier:</p>
                  <div className="flex flex-wrap sm:flex-nowrap gap-2">
                    <input type="text" value={customTierInclusion} onChange={(e) => setCustomTierInclusion(e.target.value)} placeholder="Type custom feature and click Add"
                           className={`flex-1 ${inputClasses} text-sm`} />
                    <button type="button" onClick={() => addCustomTierInclusion(tierIndex)} className="bg-accent hover:bg-pink-500 dark:hover:bg-pink-300 text-white px-3 py-2 rounded-lg text-sm shrink-0">Add Custom</button>
                  </div>
                </div>

                {(tier.tierInclusions || []).length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-neutral-dark dark:text-neutral-light mb-1">Current inclusions for this tier:</p>
                    <ul className="list-disc list-inside pl-1 space-y-1 text-sm text-neutral-dark dark:text-neutral-light bg-neutral-light/30 dark:bg-neutral-dark/20 p-3 rounded-md">
                      {(tier.tierInclusions || []).map(inclusion => (
                        <li key={inclusion.id} className="flex justify-between items-center py-0.5">
                          <span>{inclusion.label} {!inclusion.isPredefined && <span className="text-xs text-accent dark:text-pink-400">(Custom)</span>}</span>
                          <button type="button" onClick={() => removeTierInclusion(tierIndex, inclusion.id)} className="text-error hover:text-red-700 dark:hover:text-red-400 text-xs font-medium ml-2">Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
           {Object.keys(stepErrors).length > 0 && !stepErrors.tiers_general && Object.keys(stepErrors).some(k => k.startsWith("tier_")) && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-md mt-4">
              <p className="text-sm text-error font-medium">Please correct the errors in the tiers above before proceeding.</p>
            </div>
          )}
          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={prevStep} className="bg-neutral-medium hover:bg-neutral-dark text-white px-4 py-2 rounded-lg text-sm">Previous</button>
            <button onClick={nextStep} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm">Next</button>
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Step 4: Optional Add-ons</h2>
            <button type="button" onClick={addAddon} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm">Add Add-on</button>
          </div>

          {(formData.addons || []).map((addon, addonIndex) => (
            <div key={addonIndex} className="p-4 border border-neutral-medium/30 dark:border-neutral-medium/40 rounded-xl shadow-sm bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-5">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-medium/20 dark:border-neutral-medium/30">
                  <h3 className="text-lg font-semibold text-primary dark:text-primary-light">Add-on {addonIndex + 1}{addon.addonName && !addon.isCustom ? `: ${addon.addonName}` : ''}</h3>
                  <button type="button" onClick={() => removeAddon(addonIndex)} className="text-error hover:text-red-700 dark:hover:text-red-400 text-sm font-medium">Remove Add-on</button>
              </div>
              <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-light">Add-on Type:</label>
                  <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                      <label htmlFor={`predefinedType-${addonIndex}`} className="flex items-center text-sm text-neutral-dark dark:text-neutral-light cursor-pointer">
                        <input type="radio" id={`predefinedType-${addonIndex}`} name={`addonType-${addonIndex}`} checked={!addon.isCustom}
                               onChange={() => handleAddonCustomNameToggle(addonIndex, false)} className="h-4 w-4 text-primary border-neutral-medium/50 focus:ring-primary mr-1.5" />
                        Predefined Service
                      </label>
                      <label htmlFor={`customType-${addonIndex}`} className="flex items-center text-sm text-neutral-dark dark:text-neutral-light cursor-pointer">
                        <input type="radio" id={`customType-${addonIndex}`} name={`addonType-${addonIndex}`} checked={addon.isCustom || false}
                               onChange={() => handleAddonCustomNameToggle(addonIndex, true)} className="h-4 w-4 text-primary border-neutral-medium/50 focus:ring-primary mr-1.5" />
                        Custom Service
                      </label>
                  </div>
                  {stepErrors[`addon_${addonIndex}_addonName`] && <p className="text-error text-xs mt-1">{stepErrors[`addon_${addonIndex}_addonName`]}</p>}
                  {stepErrors[`addon_${addonIndex}_predefinedId`] && <p className="text-error text-xs mt-1">{stepErrors[`addon_${addonIndex}_predefinedId`]}</p>}
                  {(addon.isCustom || false) ? (
                      <div>
                        <label htmlFor={`customAddonName-${addonIndex}`} className="block text-xs font-medium text-neutral-dark dark:text-neutral-light mb-1">Custom Add-on Name*</label>
                        <input type="text" id={`customAddonName-${addonIndex}`} placeholder="Enter custom add-on name" value={addon.addonName || ''}
                               onChange={(e) => handleAddonChange(addonIndex, 'addonName', e.target.value)}
                               className={`${inputClasses} text-sm ${stepErrors[`addon_${addonIndex}_addonName`] ? 'border-error' : ''}`} />
                      </div>
                  ) : (
                      <div>
                        <label htmlFor={`predefinedAddonName-${addonIndex}`} className="block text-xs font-medium text-neutral-dark dark:text-neutral-light mb-1">Select Predefined Add-on*</label>
                        <select id={`predefinedAddonName-${addonIndex}`} value={addon.predefinedId || ''}
                                onChange={(e) => handleAddonChange(addonIndex, 'predefinedId', e.target.value, true)}
                                className={`${inputClasses} text-sm ${stepErrors[`addon_${addonIndex}_predefinedId`] ? 'border-error' : ''}`}>
                            <option value="">Choose a service...</option>
                            {predefinedAddons.map(pa => <option key={pa.id} value={pa.id}>{pa.label}</option>)}
                        </select>
                      </div>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-2">
                {alaCarteAddonStructureConfig.fieldsPerAddon.map(fieldDef => {
                  if (fieldDef.name === 'addonName' && !addon.isCustom) return null; // Don't render name field for predefined if it's handled by select
                  return (
                    <div key={fieldDef.name}>
                      <RenderField field={fieldDef} value={addon[fieldDef.name]} onDynamicChange={(name, val) => handleAddonChange(addonIndex, name, val)} error={stepErrors[`addon_${addonIndex}_${fieldDef.name}`]} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {Object.keys(stepErrors).length > 0 && Object.keys(stepErrors).some(k => k.startsWith("addon_")) && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-md mt-4">
              <p className="text-sm text-error font-medium">Please correct the errors in the add-ons above before proceeding.</p>
            </div>
          )}
          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={prevStep} className="bg-neutral-medium hover:bg-neutral-dark text-white px-4 py-2 rounded-lg text-sm">Previous</button>
            <button onClick={nextStep} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm">Next</button>
          </div>
        </section>
      )}

      {currentStep === 5 && (
        <section className="space-y-8 p-6 bg-neutral-light dark:bg-neutral-dark shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-neutral-darker dark:text-neutral-lighter mb-8 text-center">
            Step 5 of {totalSteps}: Review your service
          </h2>

          {/* Core Details Section */}
          <div className="p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-4 bg-white dark:bg-neutral-dark/40 shadow-md">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50">
              <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Core details</h3>
              <button type="button" onClick={() => setCurrentStep(1)} className="text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors">Edit</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <div><strong className="font-semibold text-neutral-dark/90 dark:text-neutral-light/90">Service title:</strong> <span className="text-neutral-dark/70 dark:text-neutral-light/70">{formData.title || <i className="text-neutral-medium">Not set</i>}</span></div>
              <div><strong className="font-semibold text-neutral-dark/90 dark:text-neutral-light/90">Service category:</strong> <span className="text-neutral-dark/70 dark:text-neutral-light/70">{formData.category || <i className="text-neutral-medium">Not set</i>}</span></div>
            </div>
            <div>
              <strong className="font-semibold text-neutral-dark/90 dark:text-neutral-light/90 block mb-1">Description:</strong>
              <p className="text-sm whitespace-pre-wrap p-3 bg-neutral-light/50 dark:bg-neutral-dark/20 rounded-md border border-neutral-medium/20 dark:border-neutral-medium/40 text-neutral-dark/70 dark:text-neutral-light/70">{formData.description || <i className="text-neutral-medium">No description provided.</i>}</p>
            </div>
            {/* Display other common fields from formData */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2">
              {otherCommonFields.map(field => {
                   let displayValue = formData[field.name];
                   const label = field.label.endsWith('*') ? field.label.slice(0, -1) : field.label; // Remove trailing asterisk for display
                   if (field.name === 'availableDays' && Array.isArray(displayValue)) {
                      displayValue = displayValue.map(value => {
                          const option = field.options.find(opt => opt.value === value);
                          return option ? option.label : value;
                      }).join(', ') || <i className="text-neutral-medium">Not specified</i>;
                   } else if (field.name === 'availableOnPublicHolidays' && typeof displayValue === 'string') {
                      // Display 'Yes' or 'No' based on the toggle value
                      displayValue = displayValue === 'yes' ? 'Yes' : (displayValue === 'no' ? 'No' : <i className="text-neutral-medium">Not specified</i>);
                   } else if (Array.isArray(displayValue)) {
                      displayValue = displayValue.join(', ') || <i className="text-neutral-medium">Not specified</i>;
                   } else {
                      displayValue = displayValue || <i className="text-neutral-medium">Not set</i>;
                   }
                   return (
                       <div key={`review-common-${field.name}`}><strong className="font-semibold text-neutral-dark/90 dark:text-neutral-light/90">{label}:</strong> <span className="text-neutral-dark/70 dark:text-neutral-light/70">{displayValue}</span></div>
                   );
              })}
            </div>
            <div><strong className="font-semibold text-neutral-dark/90 dark:text-neutral-light/90">Status:</strong> <span className="text-neutral-dark/70 dark:text-neutral-light/70">{formData.disabled ? 'Disabled (Hidden from listings)' : 'Enabled (Visible in listings)'}</span></div>
          </div>

          {/* Category Specifics Section */}
          {formData.category && currentCategorySpecificFields.length > 0 && (
            <div className="p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-4 bg-white dark:bg-neutral-dark/40 shadow-md">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50">
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{formData.category} specifics</h3>
                <button type="button" onClick={() => setCurrentStep(2)} className="text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors">Edit</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {currentCategorySpecificFields.map(field => {
                  const label = field.label.endsWith('*') ? field.label.slice(0, -1) : field.label;
                  let displayValue = formData[field.name];
                  if (Array.isArray(displayValue)) {
                    displayValue = displayValue.join(', ') || <i className="text-neutral-medium">Not specified</i>;
                  } else {
                    displayValue = displayValue || <i className="text-neutral-medium">Not set</i>;
                  }
                  return (
                    <div key={`review-specific-${field.name}`}><strong className="font-semibold text-neutral-dark/90 dark:text-neutral-light/90">{label}:</strong> <span className="text-neutral-dark/70 dark:text-neutral-light/70">{displayValue}</span></div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Service Packages (Tiers) Section */}
          {(formData.tiers || []).length > 0 && (
            <div className="p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-5 bg-white dark:bg-neutral-dark/40 shadow-md">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50">
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Service packages (Tiers)</h3>
                <button type="button" onClick={() => setCurrentStep(3)} className="text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors">Edit</button>
              </div>
              {(formData.tiers || []).map((tier, index) => (
                <div key={`review-tier-${tier.id || index}`} className="p-4 rounded-lg border border-neutral-medium/20 dark:border-neutral-medium/40 bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-2 shadow-sm">
                  <p className="text-lg font-semibold text-primary dark:text-primary-light">{tier.tierName || <i className="text-neutral-medium">Unnamed Package Tier</i>}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div><strong className="font-medium text-neutral-dark/80 dark:text-neutral-light/80">Price:</strong> <span className="text-neutral-dark/70 dark:text-neutral-light/70">${tier.tierPrice !== undefined && tier.tierPrice !== null && tier.tierPrice !== '' ? tier.tierPrice : <i className="text-neutral-medium">N/A</i>}</span></div>
                    <div><strong className="font-medium text-neutral-dark/80 dark:text-neutral-light/80">Duration:</strong> <span className="text-neutral-dark/70 dark:text-neutral-light/70">{tier.tierDurationHours || <i className="text-neutral-medium">N/A</i>} hours</span></div>
                  </div>
                  <div>
                    <strong className="font-medium text-sm text-neutral-dark/80 dark:text-neutral-light/80 block mb-0.5">Description:</strong>
                    <p className="text-xs p-2 bg-neutral-light/50 dark:bg-neutral-dark/10 rounded border border-neutral-medium/10 dark:border-neutral-medium/30 text-neutral-dark/70 dark:text-neutral-light/70">{tier.tierDescription || <i className="text-neutral-medium">No description</i>}</p>
                  </div>
                  <div>
                    <strong className="font-medium text-sm text-neutral-dark/80 dark:text-neutral-light/80">Inclusions:</strong>
                    {(tier.tierInclusions && tier.tierInclusions.length > 0) ? (
                      <ul className="list-disc list-inside pl-4 text-sm space-y-0.5 mt-1 text-neutral-dark/70 dark:text-neutral-light/70">
                        {(tier.tierInclusions || []).map(inc => <li key={inc.id}>{inc.label} {!inc.isPredefined && <span className="text-xs text-accent dark:text-pink-400">(Custom)</span>}</li>)}
                      </ul>
                    ) : (
                      <p className="text-sm text-neutral-medium pl-4"><i>No inclusions for this tier.</i></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Optional Add-ons Section */}
          {(formData.addons || []).length > 0 && (
            <div className="p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-5 bg-white dark:bg-neutral-dark/40 shadow-md">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50">
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Optional add-ons</h3>
                <button type="button" onClick={() => setCurrentStep(4)} className="text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors">Edit</button>
              </div>
              {(formData.addons || []).map((addon, index) => (
                <div key={`review-addon-${index}`} className="p-4 rounded-lg border border-neutral-medium/20 dark:border-neutral-medium/40 bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-2 shadow-sm">
                  <p className="text-lg font-semibold text-primary dark:text-primary-light">{addon.addonName || (addon.predefinedId && predefinedAddons.find(pa => pa.id === addon.predefinedId)?.label) || <i className="text-neutral-medium">Unnamed Add-on</i>}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div><strong className="font-medium text-neutral-dark/80 dark:text-neutral-light/80">Price:</strong><span className="text-neutral-dark/70 dark:text-neutral-light/70"> ${addon.addonPrice !== undefined && addon.addonPrice !== null && addon.addonPrice !== '' ? addon.addonPrice : <i className="text-neutral-medium">N/A</i>}</span></div>
                  </div>
                  <div>
                    <strong className="font-medium text-sm text-neutral-dark/80 dark:text-neutral-light/80 block mb-0.5">Description:</strong>
                    <p className="text-xs p-2 bg-neutral-light/50 dark:bg-neutral-dark/10 rounded border border-neutral-medium/10 dark:border-neutral-medium/30 text-neutral-dark/70 dark:text-neutral-light/70">{addon.addonDescription || <i className="text-neutral-medium">No description</i>}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 pt-8 border-t border-neutral-medium/30 dark:border-neutral-medium/50 space-x-4">
            <button
              onClick={prevStep}
              className="bg-neutral-500 hover:bg-neutral-600 dark:bg-neutral-600 dark:hover:bg-neutral-700 text-white px-8 py-3 rounded-lg text-base font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50"
            >
              Previous
            </button>
            <button
              onClick={finalFormSubmit}
              disabled={isSubmittingInternal}
              className={`px-10 py-3 text-base font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isSubmittingInternal
                  ? "bg-neutral-400 dark:bg-neutral-500 text-neutral-100 dark:text-neutral-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark text-white dark:bg-primary-dark dark:hover:bg-primary-darker dark:text-neutral-light focus:ring-primary"
              }`}
            >
              {isSubmittingInternal ? (isEditMode ? 'Saving Changes...' : 'Publishing Service...') : (isEditMode ? 'Save Changes' : 'Publish Service')}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default MultiStepServiceForm;
