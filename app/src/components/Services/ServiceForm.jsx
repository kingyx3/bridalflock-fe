import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageUpload from "../ImageUpload";
import Input from "../common/Input";
import { categories } from "../../utils/categories";
import {
  getFieldsForCategory,
  predefinedInclusions,
  predefinedAddons,
  tierStructureConfig,
  alaCarteAddonStructureConfig,
  commonFields as allCommonFields, // Renaming to avoid conflict if getFieldsForCategory also returns common
} from "../../utils/serviceFieldDefinitions";

// Helper component to render individual fields using the reusable Input component
const RenderField = ({ field, value, onChange, onDynamicChange }) => {
  // Handle special cases that don't map directly to Input component
  if (field.type === 'mediaUpload') {
    return (
      <div>
        <label className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">
          {field.label}{field.required && '*'}
        </label>
        <p className="text-xs text-neutral-medium dark:text-neutral-light">
          Media upload for &lsquo;{field.label}&rsquo; will be handled by a dedicated component section if needed, or integrated with the main image uploader.
        </p>
        {field.helpText && <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">{field.helpText}</p>}
      </div>
    );
  }
  
  // For toggle fields, convert 'yes'/'no' to boolean and back
  if (field.type === 'toggle') {
    const toggleValue = value === 'yes';
    return (
      <Input
        {...field}
        value={toggleValue}
        onDynamicChange={onDynamicChange ? (name, boolValue) => {
          onDynamicChange(name, boolValue ? 'yes' : 'no');
        } : undefined}
        onChange={onChange ? (e) => {
          const stringValue = e.target.checked ? 'yes' : 'no';
          const event = { target: { name: field.name, value: stringValue }};
          onChange(event);
        } : undefined}
      />
    );
  }

  return (
    <Input
      {...field}
      value={value}
      onChange={onChange}
      onDynamicChange={onDynamicChange}
    />
  );
};


function ServiceForm({
  data,
  setData,
  files, // For main service images
  setFile, // For main service images
  existingImages = [],
  setExistingImages = () => {},
  error,
  isSubmitting,
  onSubmit,
}) {
  const [currentCategoryFields, setCurrentCategoryFields] = useState({ common: [], specific: [] });
  const [customTierInclusion, setCustomTierInclusion] = useState(''); // For the current tier being edited
  const [customAddonName, setCustomAddonName] = useState(''); // For custom add-on input

  useEffect(() => {
    if (data.category) {
      const allFields = getFieldsForCategory(data.category);
      // Separate common from specific. Assuming commonFields from definition is the source of truth for "common".
      const specificFields = allFields.filter(field => !allCommonFields.some(cf => cf.name === field.name));
      setCurrentCategoryFields({ common: allCommonFields, specific: specificFields });
    } else {
      setCurrentCategoryFields({ common: allCommonFields, specific: [] }); // Show common fields even if no category
    }
  }, [data.category]);

  // Generic handleChange for top-level data properties
  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // More specific handler for dynamic fields (common or category-specific)
  const handleDynamicFieldChange = (fieldName, fieldValue) => {
    setData(prev => ({ ...prev, [fieldName]: fieldValue }));
  };

  // Tier handlers
  const addTier = () => {
    if ((data.tiers?.length || 0) < tierStructureConfig.maxTiers) {
      setData(prev => ({
        ...prev,
        tiers: [...(prev.tiers || []), {
            tierName: tierStructureConfig.defaultTierNames[prev.tiers?.length || 0] || `Package ${ (prev.tiers?.length || 0) + 1}`,
            tierPrice: '',
            tierDurationHours: '',
            tierDescription: '',
            tierInclusions: []
        }]
      }));
    }
  };

  const removeTier = (index) => {
    setData(prev => ({ ...prev, tiers: prev.tiers.filter((_, i) => i !== index) }));
  };

  const handleTierChange = (tierIndex, fieldName, value) => {
    setData(prev => ({
      ...prev,
      tiers: prev.tiers.map((tier, i) => i === tierIndex ? { ...tier, [fieldName]: value } : tier)
    }));
  };

  const handleTierInclusionChange = (tierIndex, inclusionId, isChecked) => {
    setData(prev => ({
      ...prev,
      tiers: prev.tiers.map((tier, i) => {
        if (i === tierIndex) {
          const newInclusions = [...tier.tierInclusions];
          if (isChecked) {
            if (!newInclusions.find(inc => inc.id === inclusionId && inc.isPredefined)) {
              newInclusions.push({ id: inclusionId, label: predefinedInclusions.find(pi => pi.id === inclusionId)?.label, isPredefined: true });
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
      setData(prev => ({
        ...prev,
        tiers: prev.tiers.map((tier, i) => {
          if (i === tierIndex) {
            return { ...tier, tierInclusions: [...tier.tierInclusions, { id: `custom-${Date.now()}`, label: customTierInclusion.trim(), isPredefined: false }] };
          }
          return tier;
        })
      }));
      setCustomTierInclusion('');
    }
  };

  const removeTierInclusion = (tierIndex, inclusionIdToRemove) => {
     setData(prev => ({
      ...prev,
      tiers: prev.tiers.map((tier, i) => {
        if (i === tierIndex) {
          return { ...tier, tierInclusions: tier.tierInclusions.filter(inc => inc.id !== inclusionIdToRemove) };
        }
        return tier;
      })
    }));
  };


  // Add-on handlers
  const addAddon = () => {
    setData(prev => ({ ...prev, addons: [...(prev.addons || []), { addonName: '', addonPrice: '', addonDescription: '', isCustom: true }] }));
  };

  const removeAddon = (index) => {
    setData(prev => ({ ...prev, addons: prev.addons.filter((_, i) => i !== index) }));
  };

  const handleAddonChange = (addonIndex, fieldName, value, isPredefinedSelection = false) => {
    setData(prev => ({
      ...prev,
      addons: prev.addons.map((addon, i) => {
        if (i === addonIndex) {
          if (isPredefinedSelection) {
            const selectedPredefined = predefinedAddons.find(pa => pa.id === value);
            return {
              ...addon,
              addonName: selectedPredefined ? selectedPredefined.label : '',
              predefinedId: value, // Store the ID of the predefined addon
              isCustom: !selectedPredefined, // It's not custom if a predefined one is selected
              addonPrice: selectedPredefined ? '' : addon.addonPrice, // Reset price if predefined, or keep if switching to custom
              addonDescription: selectedPredefined ? '' : addon.addonDescription, // Reset desc
            };
          }
          return { ...addon, [fieldName]: value };
        }
        return addon;
      })
    }));
  };

  const handleAddonCustomNameToggle = (addonIndex, isCustom) => {
    setData(prev => ({
      ...prev,
      addons: prev.addons.map((addon, i) => {
        if (i === addonIndex) {
          return {
            ...addon,
            isCustom: isCustom,
            predefinedId: isCustom ? undefined : addon.predefinedId, // Clear predefinedId if switching to custom
            addonName: isCustom ? '' : (predefinedAddons.find(pa => pa.id === addon.predefinedId)?.label || ''),
          };
        }
        return addon;
      })
    }));
  };


  return (
    <div className="space-y-10">
      {error && (
        <div className="p-4 bg-error/20 dark:bg-red-900/30 border-l-4 border-error dark:border-error rounded-lg">
          <p className="text-sm font-medium text-red-600 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Core Details Section */}
      <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
        <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Core Service Details</h2>
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">Category*</label>
          <select
            id="category"
            name="category"
            value={data.category || ''}
            onChange={handleChange} // Uses the generic handleChange for top-level 'category'
            required
            className="w-full px-4 py-3 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light focus:ring-primary focus:border-primary"
          >
            <option value="">Select a category</option>
            {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
          </select>
        </div>

        {/* Common Fields */}
        {currentCategoryFields.common.map(field => (
          <RenderField
            key={`common-${field.name}`}
            field={field}
            value={data[field.name]}
            onDynamicChange={handleDynamicFieldChange}

          />
        ))}
         {/* Main Service Images (using existing ImageUpload) */}
        <div>
            <label className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">Main Service Images*</label>
            <ImageUpload
                files={files}
                setFile={setFile}
                maxFiles={5}
                maxSizeMB={2}
            />
            {existingImages.length > 0 && (
              <div className="mt-4 flex gap-3 flex-wrap">
                {existingImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border border-neutral-medium/30 dark:border-neutral-medium rounded overflow-hidden">
                    <Image 
                      src={imgUrl} 
                      alt={`Existing Image ${idx}`} 
                      fill
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                      className="object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => setExistingImages(existingImages.filter(img => img !== imgUrl))} // Simplified remove
                      className="absolute top-1 right-1 bg-neutral-light dark:bg-neutral-dark text-error border border-error rounded-full w-6 h-6 flex items-center justify-center hover:bg-error hover:text-white dark:hover:bg-error"
                    >×</button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">These are the primary images for your service listing.</p>
        </div>
      </section>

      {/* Category-Specific Fields Section */}
      {data.category && currentCategoryFields.specific.length > 0 && (
        <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{data.category} Specifics</h2>
          {currentCategoryFields.specific.map(field => (
            <RenderField
                key={`specific-${field.name}`}
                field={field}
                value={data[field.name]}
                onDynamicChange={handleDynamicFieldChange}
            />

          ))}
        </section>
      )}

      {/* Tiered Pricing Section */}
      <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Service Packages (Tiers)</h2>
            {(data.tiers?.length || 0) < tierStructureConfig.maxTiers && (
                <button type="button" onClick={addTier} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm">Add Package Tier</button>
            )}
        </div>
        {(data.tiers || []).map((tier, tierIndex) => (
          <div key={tierIndex} className="p-4 border border-neutral-medium/30 dark:border-neutral-medium rounded-lg space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-neutral-dark dark:text-neutral-light">Package Tier {tierIndex + 1}</h3>
                <button type="button" onClick={() => removeTier(tierIndex)} className="text-error hover:text-red-700 dark:hover:text-red-400 text-sm">Remove Tier</button>
            </div>
            {tierStructureConfig.fieldsPerTier.map(fieldDef => {
              if (fieldDef.name === 'tierInclusions') {
                return (
                  <div key={fieldDef.name}>
                    <label className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">{fieldDef.label}{fieldDef.required && '*'}</label>
                    {/* Predefined Inclusions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                      {predefinedInclusions.map(incOption => (
                        <label key={incOption.id} className="flex items-center text-neutral-dark dark:text-neutral-light">
                          <input type="checkbox"
                                 checked={tier.tierInclusions?.some(i => i.id === incOption.id && i.isPredefined)}
                                 onChange={(e) => handleTierInclusionChange(tierIndex, incOption.id, e.target.checked)}
                                 className="h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2"
                          />
                          {incOption.label}
                        </label>
                      ))}
                    </div>
                    {/* Custom Inclusion Input */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-2">
                      <input type="text"
                             value={customTierInclusion}
                             onChange={(e) => setCustomTierInclusion(e.target.value)}
                             placeholder="Add a custom inclusion item"
                             className="flex-1 px-3 py-2 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium focus:ring-primary focus:border-primary text-sm"
                      />
                      <button type="button" onClick={() => addCustomTierInclusion(tierIndex)} className="bg-accent hover:bg-pink-500 dark:hover:bg-pink-300 text-white px-3 py-2 rounded-lg text-sm">Add Custom</button>
                    </div>
                    {/* Display Tier Inclusions */}
                    {tier.tierInclusions?.length > 0 && (
                      <ul className="list-disc list-inside pl-1 space-y-1 text-sm text-neutral-dark dark:text-neutral-light">
                        {tier.tierInclusions.map(inclusion => (
                          <li key={inclusion.id} className="flex justify-between items-center">
                            <span>{inclusion.label} {!inclusion.isPredefined && '(Custom)'}</span>
                            <button type="button" onClick={() => removeTierInclusion(tierIndex, inclusion.id)} className="text-error hover:text-red-700 dark:hover:text-red-400 text-xs ml-2">Remove</button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }
              // Default rendering for other tier fields
              return (
                <RenderField
                  key={fieldDef.name}
                  field={fieldDef}
                  value={tier[fieldDef.name]}
                  onDynamicChange={(name, val) => handleTierChange(tierIndex, name, val)}
                />
              );
            })}
          </div>
        ))}
      </section>

      {/* A La Carte Add-ons Section */}
      <section className="space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Optional Add-ons</h2>
            <button type="button" onClick={addAddon} className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm">Add Add-on</button>
        </div>
        {(data.addons || []).map((addon, addonIndex) => (
          <div key={addonIndex} className="p-4 border border-neutral-medium/30 dark:border-neutral-medium rounded-lg space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-neutral-dark dark:text-neutral-light">Add-on {addonIndex + 1}</h3>
                <button type="button" onClick={() => removeAddon(addonIndex)} className="text-error hover:text-red-700 dark:hover:text-red-400 text-sm">Remove Add-on</button>
            </div>
            {/* Hybrid Addon Name Input */}
            <div>
                <label id={`addonServiceItemLabel-${addonIndex}`} className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">Add-on Service/Item*</label>
                <div className="flex items-center gap-2 mb-2">
                    <input type="checkbox" id={`customToggle-${addonIndex}`} checked={addon.isCustom} onChange={(e) => handleAddonCustomNameToggle(addonIndex, e.target.checked)} className="h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary"/>
                    <label htmlFor={`customToggle-${addonIndex}`} className="text-sm text-neutral-dark dark:text-neutral-light">Custom Add-on</label>
                </div>
                {addon.isCustom ? (
                    <input type="text"
                           id={`customAddonName-${addonIndex}`}
                           name={`customAddonName-${addonIndex}`}
                           placeholder="Enter custom add-on name"
                           value={addon.addonName || ''}
                           onChange={(e) => handleAddonChange(addonIndex, 'addonName', e.target.value)}
                           aria-labelledby={`addonServiceItemLabel-${addonIndex}`}
                           className="w-full px-4 py-3 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium focus:ring-primary focus:border-primary"
                    />
                ) : (
                    <select id={`predefinedAddonName-${addonIndex}`}
                            name={`predefinedAddonName-${addonIndex}`}
                            value={addon.predefinedId || ''}
                            onChange={(e) => handleAddonChange(addonIndex, 'addonName', e.target.value, true)}
                            aria-labelledby={`addonServiceItemLabel-${addonIndex}`}
                            className="w-full px-4 py-3 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light focus:ring-primary focus:border-primary"
                    >
                        <option value="">Select a predefined add-on</option>
                        {predefinedAddons.map(pa => <option key={pa.id} value={pa.id}>{pa.label}</option>)}
                    </select>
                )}
            </div>

            {alaCarteAddonStructureConfig.fieldsPerAddon.map(fieldDef => {
              if (fieldDef.name === 'addonName') return null; // Handled by hybrid input above
              return (
                <RenderField
                  key={fieldDef.name}
                  field={fieldDef}
                  value={addon[fieldDef.name]}
                  onDynamicChange={(name, val) => handleAddonChange(addonIndex, name, val)}
                />
              );
            })}
          </div>
        ))}
      </section>


      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full md:w-auto px-8 py-3.5 text-lg font-semibold rounded-lg transition ${
            isSubmitting
              ? "bg-neutral-medium/50 dark:bg-neutral-medium text-neutral-light dark:text-neutral-light/70 cursor-not-allowed"
              : "bg-primary hover:bg-primary-darker dark:bg-primary dark:hover:bg-primary-darker text-primary-darker dark:text-white"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Service"}
        </button>
      </div>
    </div>
  );
}

export default ServiceForm;
