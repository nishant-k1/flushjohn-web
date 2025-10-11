import { useField } from "formik";
import styles from "./styles.module.css";
import "../../FormFields/styles.css";

const DateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.outerBox}>
      <label className={styles.label}>
        {label}
        {props.name !== "contactPersonPhone" && (
          <span style={{ color: "red", fontSize: "x-large" }}>*</span>
        )}
      </label>
      <div className={styles.innerBox}>
        <div>
          <input
            type="date"
            {...field}
            {...props}
            className={props.className}
            min={today}
            onChange={(e) => {
              if (e.target.value) {
                const date = new Date(e.target.value);
                const formatted = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
                setValue(formatted);
              } else {
                setValue("");
              }
            }}
            onBlur={() => setTouched(true)}
          />
          {touched && error ? (
            <div className={styles.error}>{meta.error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DateField;
