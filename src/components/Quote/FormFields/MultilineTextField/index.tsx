import { useField } from "formik";
import styles from "./styles.module.css";

const MultilineTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className={styles.innerBox}>
        <textarea
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error + " "}</div>
        ) : null}
      </div>
    </div>
  );
};

export default MultilineTextField;
