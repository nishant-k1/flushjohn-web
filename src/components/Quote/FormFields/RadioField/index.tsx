import { useField } from "formik";
import styles from "./styles.module.css";

const RadioField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;

  return (
    <div>
      <div className={styles.radio_outerBox}>
        <label>{label}</label>
        <input
          {...field}
          {...props}
          style={{
            height: "1.5rem",
            width: "1.5rem",
          }}
          type="radio"
          checked={field.value === props.value}
          className={props.className}
          // placeholder={label}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>

      {touched && error ? (
        <div className={styles.error}>{error + " "}</div>
      ) : null}
    </div>
  );
};

export default RadioField;
