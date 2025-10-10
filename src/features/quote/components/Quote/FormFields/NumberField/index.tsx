import { useField } from "formik";
import styles from "./styles.module.css";
import { Tooltip } from "antd";
import { NumericFormat } from "react-number-format";

const NumberField = ({ label, ...props }: any) => {
  const [field, _] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label>{label}</label>
      <div className={styles.innerBox}>
        <Tooltip
          placement="top"
          title="Enter Quantity"
        >
          <NumericFormat
            {...field}
            {...props}
          />
        </Tooltip>
        <p className={styles.units}>Units</p>
      </div>
    </div>
  );
};

export default NumberField;
