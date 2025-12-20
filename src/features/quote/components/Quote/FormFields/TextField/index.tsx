import { useField } from "formik";
import styles from "./styles.module.css";

const TextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>
        {label}
        {(props.name === "email" ||
          props.name === "fName" ||
          props.name === "contactPersonName" ||
          props.name === "streetAddress" ||
          props.required) && (
          <span style={{ color: "var(--primary-dark)", fontSize: "x-large" }}>
            *
          </span>
        )}
      </label>
      <div className={styles.inputContainer}>
        <input
          {...field}
          {...props}
          className={`${styles.textInput} ${touched && error ? styles.error_field : ""}`}
          placeholder={props.placeholder || label}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
        {touched && error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default TextField;
