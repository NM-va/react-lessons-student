// src/components/UniversalInput.tsx
import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface UniversalInputProps {
    label: string;
    type: 'text' | 'email' | 'number' | 'select' | 'radio';
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    options?: Option[]; // для select и radio
    disabled?: boolean;
}

const UniversalInput: React.FC<UniversalInputProps> = ({
                                                           label,
                                                           type,
                                                           value,
                                                           onChange,
                                                           placeholder,
                                                           required = false,
                                                           error,
                                                           options = [],
                                                           disabled = false
                                                       }) => {
    const baseInputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px',
        border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
        borderRadius: '6px',
        fontSize: '14px',
        transition: 'border-color 0.2s ease',
        backgroundColor: disabled ? '#f9fafb' : 'white'
    };
    
    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        style={baseInputStyle}
                        disabled={disabled}
                        required={required}
                    >
                        <option value="">{placeholder || 'Выберите...'}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            
            case 'radio':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {options.map((option) => (
                            <label
                                key={option.value}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: disabled ? 'not-allowed' : 'pointer',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #e5e7eb',
                                    backgroundColor: value === option.value ? '#f0f9ff' : 'transparent'
                                }}
                            >
                                <input
                                    type="radio"
                                    name={label}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={(e) => onChange(e.target.value)}
                                    disabled={disabled}
                                    style={{ margin: 0 }}
                                />
                                <span style={{ fontSize: '14px' }}>{option.label}</span>
                            </label>
                        ))}
                    </div>
                );
            
            default:
                return (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        style={baseInputStyle}
                        disabled={disabled}
                        required={required}
                    />
                );
        }
    };
    
    return (
        <div style={{ marginBottom: '16px' }}>
            <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
            }}>
                {label}
                {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
            </label>
            
            {renderInput()}
            
            {error && (
                <div style={{
                    marginTop: '4px',
                    fontSize: '12px',
                    color: '#ef4444'
                }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default UniversalInput;