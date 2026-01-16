import Link from "next/link";
import styles from "./styles.module.css";

type LocationsProps = {
  title: string;
  list: string[];
};

export default function Locations({ title, list }: LocationsProps) {
  const formatCityUrl = (city: string) =>
    city.toLowerCase().replace(/\s+/g, "-").replace(/,/g, "");

  return (
    <div className={styles.locations}>
      <div className={styles.container}>
        {title && <h2>{title}</h2>}
        <p className={styles.list}>
          {list.map((city, index) => (
            <span key={city}>
              <Link
                href={`/porta-potty-rental/${formatCityUrl(city)}`}
                className={styles.link}
                prefetch={true}
              >
                {city}
              </Link>
              {index < list.length - 1 && " | "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
