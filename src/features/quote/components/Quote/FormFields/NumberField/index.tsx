import { useField } from "formik";
import styles from "./styles.module.css";
import { NumericFormat } from "react-number-format";

const NumberField = ({ label, ...props }: any) => {
  const [field, _] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label>{label}</label>
      <div className={styles.innerBox}>
        <div title="Enter Quantity">
          <NumericFormat
            {...field}
            {...props}
          />
        </div>
        <p className={styles.units}>Units</p>
      </div>
    </div>
  );
};

export default NumberField;
