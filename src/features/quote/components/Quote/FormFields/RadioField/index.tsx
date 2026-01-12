import { useField } from "formik";
import styles from "./styles.module.css";

const RadioField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  const fieldId = props.id || `${props.name}-${props.value || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={styles.radioWrapper}>
      <label className={styles.radioLabel} htmlFor={fieldId}>
        <input
          {...field}
          {...props}
          id={fieldId}
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
