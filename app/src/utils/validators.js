import { getFieldsForCategory, predefinedAddons } from './serviceFieldDefinitions'; // Removed commonFields for now, assuming getFieldsForCategory is comprehensive

export const validateServiceInput = ({ data, images = [] }) => {
  if (!data.category?.trim()) {
    return "Please select a service category.";
  }

  const allFields = getFieldsForCategory(data.category);

  for (const fieldDef of allFields) {
    const value = data[fieldDef.name];
    if (fieldDef.required) {
      let isEmpty = false;
      if (fieldDef.type === 'multi-select') {
        isEmpty = !value || !Array.isArray(value) || value.length === 0;
      } else if (typeof value === 'string') {
        isEmpty = !value.trim();
      } else if (value === undefined || value === null) {
        isEmpty = true;
      }
      if (isEmpty) return `${fieldDef.label} is required.`;
    }
    if (fieldDef.type === 'number' && value !== undefined && value !== null && value !== '') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return `${fieldDef.label} must be a valid number.`;
      if (fieldDef.min !== undefined && numValue < fieldDef.min) return `${fieldDef.label} must be at least ${fieldDef.min}.`;
      if (fieldDef.max !== undefined && numValue > fieldDef.max) return `${fieldDef.label} must be no more than ${fieldDef.max}.`;
      // For price, ensure it's not more than 2 decimal places
      if ((fieldDef.name.toLowerCase().includes('price') || fieldDef.name.toLowerCase().includes('amount')) && !/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        return `${fieldDef.label} can have up to two decimal places.`;
      }
    } else if (fieldDef.type === 'integer' && value !== undefined && value !== null && value !== '') {
      const intValue = parseFloat(value); // Use parseFloat first to catch non-numeric strings
      if (isNaN(intValue) || !Number.isInteger(intValue)) return `${fieldDef.label} must be a whole number.`;
      if (fieldDef.min !== undefined && intValue < fieldDef.min) return `${fieldDef.label} must be at least ${fieldDef.min}.`;
      if (fieldDef.max !== undefined && intValue > fieldDef.max) return `${fieldDef.label} must be no more than ${fieldDef.max}.`;
    }
  }

  if (!data.tiers || !Array.isArray(data.tiers) || data.tiers.length === 0) {
    return "Please define at least one service package/tier.";
  }
  for (let i = 0; i < data.tiers.length; i++) {
    const tier = data.tiers[i];
    const tierLabel = tier.tierName?.trim() || `Package ${i + 1}`;
    if (!tier.tierName?.trim()) return `Package ${i + 1} must have a name.`; // Updated to be more generic
    if (tier.tierPrice === undefined || tier.tierPrice === null || tier.tierPrice === '' || parseFloat(tier.tierPrice) <= 0) {
      return `Price for package '${tierLabel}' must be a positive number.`;
    }
    if (isNaN(parseFloat(tier.tierPrice))) return `Price for package '${tierLabel}' is not a valid number.`;

    // Check if the current tier's price is strictly greater than the previous tier's price
    if (i > 0) {
      const previousTierPrice = parseFloat(data.tiers[i-1].tierPrice);
      const currentTierPrice = parseFloat(tier.tierPrice);
      if (currentTierPrice <= previousTierPrice) {
        return `Price for package '${tierLabel}' must be higher than the previous package's price.`;
      }
    }

    if (!tier.tierInclusions || !Array.isArray(tier.tierInclusions) || tier.tierInclusions.length === 0) {
      return `Package '${tierLabel}' must include at least one feature/item.`;
    }
    if (tier.tierDurationHours !== undefined && tier.tierDurationHours !== null && tier.tierDurationHours !== '') {
      if (isNaN(parseFloat(tier.tierDurationHours)) || parseFloat(tier.tierDurationHours) <= 0) {
        return `Duration for package '${tierLabel}' must be a positive number if specified.`;
      }
    }
  }

  if (data.addons && Array.isArray(data.addons)) {
    for (let i = 0; i < data.addons.length; i++) {
      const addon = data.addons[i];
      let addonDisplayName = `Add-on ${i + 1}`; // Default identifier

      // Determine the effective name for error messages
      if (addon.isCustom && addon.addonName?.trim()) {
        addonDisplayName = `'${addon.addonName.trim()}'`;
      } else if (!addon.isCustom && addon.predefinedId) {
        const pa = predefinedAddons.find(p => p.id === addon.predefinedId);
        if (pa) {
          addonDisplayName = `'${pa.label}'`;
        } else {
          // Invalid predefinedId, keep generic name for now, error out soon
          addonDisplayName = `Predefined Add-on (ID: ${addon.predefinedId})`;
        }
      } else if (addon.addonName?.trim()) { // Fallback if isCustom is not set but name exists
         addonDisplayName = `'${addon.addonName.trim()}'`;
      }

      if ((addon.isCustom && !addon.addonName?.trim()) || (!addon.isCustom && !addon.predefinedId)) {
         return `Each add-on (Add-on ${i + 1}) must have a name or a predefined service selected.`;
      }

      // Validate predefinedId if it's a non-custom addon
      if (!addon.isCustom && addon.predefinedId) {
        if (!predefinedAddons.some(pa => pa.id === addon.predefinedId)) {
          return `Add-on ${addonDisplayName} uses an invalid predefined ID. Please re-select or contact support.`;
        }
      }

      if (addon.addonPrice === undefined || addon.addonPrice === null || addon.addonPrice === '' || parseFloat(addon.addonPrice) <= 0) {
        return `Price for add-on ${addonDisplayName} must be a positive number.`;
      }
      if (isNaN(parseFloat(addon.addonPrice))) {
        return `Price for add-on ${addonDisplayName} is not a valid number.`;
      }
    }
  }

  if (!images || images.length === 0) {
    return "Please upload at least one main image for the service.";
  }
  return null;
};
