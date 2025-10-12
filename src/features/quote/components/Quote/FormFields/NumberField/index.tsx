import { useField } from "formik";
import styles from "./styles.module.css";
import { NumericFormat } from "react-number-format";

const NumberField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  
  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.inputRow}>
        <NumericFormat
          {...field}
          {...props}
          className={`${styles.numberInput} ${touched && error ? styles.error_field : ""}`}
          placeholder="0"
          title="Enter Quantity"
        />
        <span className={styles.unitsText}>Units</span>
      </div>
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default NumberField;
