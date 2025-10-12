import { useField } from "formik";
import styles from "./styles.module.css";

const RadioField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <div className={styles.radioWrapper}>
      <label className={styles.radioLabel}>
        <input
          {...field}
          {...props}
          aria-label={props.name}
          type="radio"
          checked={field.value === props.value}
          className={props.className}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <span className={styles.labelText}>{label}</span>
      </label>
    </div>
  );
};

export default RadioField;
