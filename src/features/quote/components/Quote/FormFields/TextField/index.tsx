import { useField } from "formik";
import styles from "./styles.module.css";

const TextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;

  return (
    <div className={styles.outerBox}>
      <label>
        {label}
        {(props.name === "email" ||
          props.name === "fName" ||
          props.name === "contactPersonName") && (
          <span style={{ color: "red", fontSize: "x-large" }}>*</span>
        )}
      </label>
      <div className={styles.innerBox}>
        <input
          {...field}
          {...props}
          className={
            touched && error
              ? `${props.className} ${styles.error_field}`
              : props.className
          }
          placeholder={""}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
      </div>
    </div>
  );
};

export default TextField;
