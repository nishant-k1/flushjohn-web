import { useField } from "formik";
import styles from "./styles.module.css";

const MultilineTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.fieldRow}>
      <label
        className={styles.fieldLabel}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div className={styles.inputContainer}>
        <textarea
          {...field}
          {...props}
          className={`${styles.textareaInput} ${meta.touched && meta.error ? styles.error_field : ""}`}
          placeholder={props.placeholder || label}
        />
        {meta.touched && meta.error && (
          <div className={styles.error}>{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default MultilineTextField;
