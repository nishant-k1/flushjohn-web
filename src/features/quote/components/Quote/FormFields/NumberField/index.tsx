import { useField } from "formik";
import styles from "./styles.module.css";
import { NumericFormat } from "react-number-format";

const NumberField = ({ label, ...props }: any) => {
  const [field, _] = useField(props);
  
  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.inputRow}>
        <NumericFormat
          {...field}
          {...props}
          className={styles.numberInput}
          title="Enter Quantity"
        />
        <span className={styles.unitsText}>Units</span>
      </div>
    </div>
  );
};

export default NumberField;
