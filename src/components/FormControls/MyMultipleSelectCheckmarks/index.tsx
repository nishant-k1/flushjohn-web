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
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Value is now an array of objects: [{ type: "Standard Portable Restroom", quantity: 1 }, ...]
  const value = Array.isArray(field.value) ? field.value : [];

  const toggleOption = (optionValue: string) => {
    const existingItem = value.find(
      (v: any) => v.type === optionValue || v === optionValue
    );

    if (existingItem) {
      // Remove item
      setValue(value.filter((v: any) => (v.type || v) !== optionValue));
    } else {
      // Add item with default quantity of 1
      setValue([...value, { type: optionValue, quantity: 1 }]);
    }
  };

  const updateQuantity = (optionValue: string, quantity: number) => {
    const newValue = value.map((v: any) => {
      if ((v.type || v) === optionValue) {
        return { type: optionValue, quantity: Math.max(1, quantity) };
      }
      return v;
    });
    setValue(newValue);
  };

  const isSelected = (optionValue: string) => {
    return value.some((v: any) => (v.type || v) === optionValue);
  };

  const getQuantity = (optionValue: string) => {
    const item = value.find((v: any) => (v.type || v) === optionValue);
    return item?.quantity || 1;
  };

  const getTotalUnits = () => {
    return value.reduce(
      (sum: number, item: any) => sum + (item.quantity || 1),
      0
    );
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", width: "100%" }}
    >
      <div
        className={
          touched && error
            ? `${props.className} ${styles.error_field}`
            : props.className
        }
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "0 12px",
          border: `1px solid ${touched && error ? "#ff4d4f" : "#d9d9d9"}`,
          borderRadius: "4px",
          cursor: "pointer",
          height: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          transition: "border-color 0.2s",
        }}
      >
        <span
          style={{
            color: value.length === 0 ? "var(--primary-bg-color)" : "#333",
            fontSize: "14px",
            fontWeight: value.length === 0 ? 600 : 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value.length === 0
            ? label || "Select Rental Item..."
            : value.length === 1
              ? `${getQuantity(value[0].type || value[0])} × ${options.find((opt) => opt.value === (value[0].type || value[0]))?.label}`
              : `${getTotalUnits()} units (${value.length} types)`}
        </span>
        {value.length > 0 && (
          <span
            style={{
              background: "var(--primary-bg-color)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: 600,
              minWidth: "20px",
              textAlign: "center",
            }}
          >
            {getTotalUnits()}
          </span>
        )}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
            marginTop: "6px",
            maxHeight: "240px",
            overflowY: "auto",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: isSelected(option.value)
                  ? "rgba(169, 93, 31, 0.1)"
                  : "white",
                borderBottom: "1px solid #f0f0f0",
                transition: "all 0.2s",
                borderLeft: isSelected(option.value)
                  ? "3px solid var(--primary-bg-color)"
                  : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSelected(option.value)) {
                  e.currentTarget.style.background = "#fafafa";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isSelected(option.value)
                  ? "rgba(169, 93, 31, 0.1)"
                  : "white";
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option.value);
                }}
                style={{
                  width: "18px",
                  height: "18px",
                  border: `2px solid ${
                    isSelected(option.value)
                      ? "var(--primary-bg-color)"
                      : "#d9d9d9"
                  }`,
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isSelected(option.value)
                    ? "var(--primary-bg-color)"
                    : "white",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
              >
                {isSelected(option.value) && (
                  <span
                    style={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: isSelected(option.value) ? 600 : 400,
                  color: isSelected(option.value)
                    ? "var(--primary-bg-color, #a95d1f)"
                    : "#333",
                  flex: 1,
                  cursor: "pointer",
                }}
              >
                {option.label}
              </span>
              {isSelected(option.value) && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "white",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(
                        option.value,
                        getQuantity(option.value) - 1
                      );
                    }}
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "none",
                      background: "#f0f0f0",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#666",
                      borderRadius: "2px",
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={getQuantity(option.value)}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value) || 1;
                      updateQuantity(option.value, qty);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: "50px",
                      height: "24px",
                      border: "none",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: 600,
                      outline: "none",
                      padding: "0 4px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(
                        option.value,
                        getQuantity(option.value) + 1
                      );
                    }}
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "none",
                      background: "var(--primary-bg-color)",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "white",
                      borderRadius: "2px",
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </div>
  );
};

export default MyMultipleSelectCheckmarks;
