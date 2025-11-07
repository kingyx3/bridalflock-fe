import React from 'react';

const inputClasses = "w-full px-4 py-3 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium focus:ring-primary focus:border-primary";

const Input = React.forwardRef(({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  onDynamicChange,
  required = false, 
  placeholder, 
  options = [], 
  helpText, 
  error,
  rows = 4,
  className = '',
  ...props 
}, ref) => {
  const fieldSpecificInputClasses = `${inputClasses} ${error ? 'border-error' : ''} ${className}`;
  
  // Handle dynamic change for custom components
  const handleChange = (e) => {
    if (onDynamicChange) {
      onDynamicChange(name, e.target.value);
    } else if (onChange) {
      onChange(e);
    }
  };

  const handleCheckboxChange = (e, optionValue) => {
    const currentValues = Array.isArray(value) ? [...value] : [];
    if (e.target.checked) {
      currentValues.push(optionValue);
    } else {
      const index = currentValues.indexOf(optionValue);
      if (index > -1) currentValues.splice(index, 1);
    }
    if (onDynamicChange) onDynamicChange(name, currentValues);
  };

  // Determine input type and inputMode for numeric fields
  let inputTypeAttr = type;
  let inputModeAttr = props.inputMode;

  if (type === 'integer') {
    inputTypeAttr = 'text';
    inputModeAttr = 'numeric';
  } else if (type === 'number') {
    inputTypeAttr = 'text';
    inputModeAttr = 'decimal';
  }

  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'number':
      case 'integer':
      case 'date':
        return (
          <input
            ref={ref}
            id={name}
            name={name}
            type={inputTypeAttr}
            inputMode={inputModeAttr}
            value={value || ''}
            onChange={handleChange}
            required={required}
            placeholder={placeholder}
            className={fieldSpecificInputClasses}
            onKeyDown={type === 'integer' || type === 'number' ? (e) => {
              // Allow: backspace, delete, tab, escape, enter, arrows, home, end
              const allowedKeys = [8, 9, 27, 13, 46, 37, 38, 39, 40, 36, 35];
              // Allow decimal point for number type
              const isDecimal = type === 'number' && (e.key === '.' || e.keyCode === 190 || e.keyCode === 110);
              // Allow digits
              const isDigit = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);
              
              if (!allowedKeys.includes(e.keyCode) && !isDigit && !isDecimal) {
                e.preventDefault();
              }
            } : undefined}
            {...props}
          />
        );

      case 'textarea':
        return (
          <textarea
            ref={ref}
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className={fieldSpecificInputClasses}
            {...props}
          />
        );

      case 'select':
        return (
          <select
            ref={ref}
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            required={required}
            className={fieldSpecificInputClasses}
            {...props}
          >
            <option value="">Select {label?.toLowerCase()}</option>
            {options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'multi-select':
        return (
          <div className={`space-y-2 mt-2 p-2 rounded-md ${error ? 'border border-error' : ''}`}>
            {options?.map(opt => (
              <label key={opt.value} className="flex items-center text-neutral-dark dark:text-neutral-light">
                <input
                  type="checkbox"
                  name={name}
                  value={opt.value}
                  checked={Array.isArray(value) && value.includes(opt.value)}
                  onChange={(e) => handleCheckboxChange(e, opt.value)}
                  className="h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'toggle':
        return (
          <label className="flex items-center cursor-pointer">
            <input
              ref={ref}
              type="checkbox"
              name={name}
              checked={!!value}
              onChange={(e) => {
                if (onDynamicChange) {
                  onDynamicChange(name, e.target.checked);
                } else if (onChange) {
                  onChange(e);
                }
              }}
              className="sr-only"
              {...props}
            />
            <div className={`relative w-11 h-6 rounded-full transition-colors ${
              value ? 'bg-primary' : 'bg-neutral-medium/50'
            }`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                value ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
            <span className="ml-3 text-sm text-neutral-dark dark:text-neutral-light">
              {value ? 'Yes' : 'No'}
            </span>
          </label>
        );

      default:
        return <p className="text-error">Unsupported field type: {type}</p>;
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light">
          {label}{required && '*'}
        </label>
      )}
      {renderInput()}
      {helpText && !error && (
        <p className="mt-1 text-xs text-neutral-medium dark:text-neutral-light">
          {helpText}
        </p>
      )}
      {error && (
        <p className="text-error text-xs mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
