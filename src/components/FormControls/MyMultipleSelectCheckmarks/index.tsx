import React from "react";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const options = [
  { label: "Standard Portable Restroom", value: "Standard Portable Restroom" },
  { label: "Deluxe Flushable Restroom", value: "Deluxe Flushable Restroom" },
  { label: "ADA Portable Restroom", value: "ADA Portable Restroom" },
  { label: "Hand Wash Station", value: "Hand Wash Station" },
];

const MyMultipleSelectCheckmarks = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;
  const [isOpen, setIsOpen] = React.useState(false);

  const value = field.value || [];

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v: string) => v !== optionValue)
      : [...value, optionValue];
    setValue(newValue);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        className={touched && error ? `${props.className} ${styles.error_field}` : props.className}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          cursor: 'pointer',
          minHeight: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        {value.length === 0 && (
          <span style={{ color: 'var(--primary-bg-color)', fontWeight: 600 }}>
            Select Rental Item...
          </span>
        )}
        {value.map((v: string) => (
          <span
            key={v}
            style={{
              background: '#f0f0f0',
              padding: '2px 8px',
              borderRadius: '3px',
              fontSize: '0.875rem',
            }}
          >
            {options.find((opt) => opt.value === v)?.label || v}
          </span>
        ))}
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            marginTop: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(option.value);
              }}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: value.includes(option.value) ? '#f0f0f0' : 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fafafa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = value.includes(option.value)
                  ? '#f0f0f0'
                  : 'white';
              }}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => {}}
                style={{ cursor: 'pointer' }}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}

      {touched && error ? <div className={styles.error}>{`Required`}</div> : null}
    </div>
  );
};

export default MyMultipleSelectCheckmarks;
