interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date'
  value: any
  onChange: (value: any) => void
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  rows?: number
  error?: string
  disabled?: boolean
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  options,
  rows = 4,
  error,
  disabled = false,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{placeholder}</span>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      )}
      
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
