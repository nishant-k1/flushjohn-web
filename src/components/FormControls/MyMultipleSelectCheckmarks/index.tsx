import React from "react";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";
import { formatInputValue } from "@/utils/displayFormatting";
import "./dropdown.css";

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

  const value = Array.isArray(field.value) ? field.value : [];

  const toggleOption = (optionValue: string) => {
    const existingItem = value.find(
      (v: any) => v.item === optionValue || v === optionValue
    );

    // Mark as touched when user makes a selection/deselection
    if (!touched) {
      setTouched(true);
    }

    if (existingItem) {
      setValue(value.filter((v: any) => v.item !== optionValue));
    } else {
      setValue([
        ...value,
        {
          id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          item: optionValue,
          desc: optionValue,
          quantity: 1, // Default quantity is 1 (user can change it)
          rate: 0.0, // Empty rate - user will enter their own
          amount: 0.0, // Will be calculated when user enters rate
        },
      ]);
    }
  };

  const updateQuantity = (optionValue: string, quantityInput: string) => {
    if (!/^\d+$/.test(quantityInput)) {
      return;
    }

    const quantity = parseInt(quantityInput, 10);
    if (isNaN(quantity) || quantity < 1) {
      return;
    }

    const newValue = value.map((v: any) => {
      if (v.item === optionValue) {
        const qty = Math.max(1, quantity);
        const rate = Number(v.rate) || 0;
        const amount = rate * qty;

        return {
          ...v,
          item: v.item || optionValue,
          desc: v.desc || v.item || optionValue,
          quantity: qty, // Proper number type
          rate: rate, // Proper number type
          amount: amount, // Proper number type
        };
      }
      return v;
    });
    setValue(newValue);
  };

  const isSelected = (optionValue: string) => {
    return value.some((v: any) => v.item === optionValue);
  };

  const getQuantity = (optionValue: string) => {
    const item = value.find((v: any) => v.item === optionValue);
    const quantity = item?.quantity || 1;
    return Number(quantity) || 1; // Already a number in application state
  };

  const getTotalUnits = () => {
    return value.reduce((sum: number, item: any) => {
      const quantity = Number(item.quantity || 1) || 1;
      return sum + quantity;
    }, 0);
  };

  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    // Show error only after field is touched (blurred) and there's an error
    if (touched && error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking on a datepicker input
      if (
        target.closest(".custom-datepicker") ||
        target.closest(".react-datepicker-popper")
      ) {
        return;
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Mark as touched when clicking outside (equivalent to blur)
        setTouched(true);
        // Only hide error if field is not touched yet
        // If field is touched and has error, keep showing it
        if (!touched) {
          setShowError(false);
        }
      }
    };

    if (isOpen || showError) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, showError, touched, setTouched]);

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      <div
        className={
          touched && error
            ? `${props.className} ${styles.error_field}`
            : props.className
        }
        onClick={() => {
          setIsOpen(!isOpen);
          // Hide error when field is focused/clicked (but don't mark as touched yet)
          setShowError(false);
          // Don't mark as touched on click - only on blur or after selection
        }}
        onBlur={() => {
          // Only mark as touched on blur (when user clicks away)
          setTouched(true);
        }}
        style={{
          padding: "0 12px",
          border: `1px solid ${touched && error ? "var(--error-border)" : "var(--border-light)"}`,
          borderRadius: "0",
          cursor: "pointer",
          height: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--bg-white)",
          transition: "border-color 0.2s",
        }}
      >
        <span
          style={{
            color:
              value.length === 0
                ? "var(--text-form-placeholder)"
                : "var(--text-form-value)",
            fontSize: "14px",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
          }}
        >
          {value.length === 0
            ? label || "Select Items"
            : value.length === 1
              ? `${getQuantity(value[0].item || value[0])} × ${options.find((opt) => opt.value === (value[0].item || value[0]))?.label}`
              : `${getTotalUnits()} units (${value.length} types)`}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, opacity: 0.6 }}
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            minWidth: "100%",
            width: "max-content",
            maxWidth: "min(100%, calc(100vw - 32px))",
            background: "var(--bg-white)",
            border: `1px solid var(--primary-bg-color, var(--primary))`,
            borderRadius: "0",
            marginTop: "0",
            maxHeight: "280px",
            overflowY: "auto",
            zIndex: 10000,
            boxShadow: `0 12px 48px var(--black-alpha-25), 0 6px 20px var(--black-alpha-15), 0 0 0 1px var(--primary-alpha-20)`,
            padding: "4px 0",
            animation:
              "datePickerSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="products-dropdown-menu"
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(option.value);
              }}
              style={{
                padding: "6px 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: isSelected(option.value)
                  ? "var(--primary-alpha-12)"
                  : "var(--bg-white)",
                borderBottom:
                  index < options.length - 1
                    ? `1px solid var(--border-lighter)`
                    : "none",
                borderLeft: isSelected(option.value)
                  ? `4px solid var(--primary-bg-color, var(--primary))`
                  : "4px solid transparent",
                transition: "all 0.15s ease",
                cursor: "pointer",
                margin: index < options.length - 1 ? "0 0 2px 0" : "0",
                borderRadius: "0",
                boxShadow: isSelected(option.value)
                  ? `inset 0 0 0 1px var(--primary-alpha-10)`
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected(option.value)) {
                  e.currentTarget.style.background = "var(--bg-lighter)";
                  e.currentTarget.style.borderLeft = `4px solid var(--primary-alpha-30)`;
                  e.currentTarget.style.boxShadow = `inset 0 0 0 1px var(--primary-alpha-08)`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected(option.value)) {
                  e.currentTarget.style.background = "var(--bg-white)";
                  e.currentTarget.style.borderLeft = "4px solid transparent";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option.value);
                }}
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  border: `2px solid ${
                    isSelected(option.value)
                      ? "var(--primary-bg-color, var(--primary))"
                      : "var(--border-checkbox)"
                  }`,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isSelected(option.value)
                    ? "var(--primary-bg-color, var(--primary))"
                    : "var(--bg-white)",
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                }}
              >
                {isSelected(option.value) && (
                  <span
                    style={{
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                      lineHeight: "1",
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: isSelected(option.value) ? 600 : 500,
                  color: isSelected(option.value)
                    ? "var(--primary-bg-color, var(--primary))"
                    : "var(--text-dark)",
                  flex: 1,
                  cursor: "pointer",
                  lineHeight: "1.2",
                  letterSpacing: "-0.01em",
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
                    background: "var(--bg-white)",
                    border: `1px solid var(--border-light)`,
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
                        (getQuantity(option.value) - 1).toString()
                      );
                    }}
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "none",
                      background: "var(--bg-button-light)",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "var(--gray-text)",
                      borderRadius: "2px",
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={formatInputValue(
                      getQuantity(option.value),
                      "number"
                    )}
                    onChange={(e) => {
                      updateQuantity(option.value, e.target.value);
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
                        (getQuantity(option.value) + 1).toString()
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

      <div
        className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}
      >
        {touched && error ? (typeof error === "string" ? error : "Required") : ""}
      </div>
    </div>
  );
};

export default MyMultipleSelectCheckmarks;
