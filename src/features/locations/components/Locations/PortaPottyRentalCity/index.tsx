import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./styles.module.css";
import Link from "next/link";
import { phone } from "@/constants";
import { cityPageData } from "../../../constants";

export default function PortaPottyRentalCity({ city }: { city: string }) {
  return (
    <main className={styles.city}>
      <div className={styles.container}>
        <Breadcrumbs path={""} />
        <div className={styles.cityWrapper}>
          <h1>{cityPageData?.title.replace("{city}", city)}</h1>
          <p>{cityPageData?.description.replace("{city}", city)}</p>

          <h2>Why Choose FlushJohn for Porta Potty Rentals in {city}?</h2>
          <ul>
            <li>✔ Fast & Reliable Same-Day Delivery in {city}</li>
            <li>✔ Clean & Sanitized Portable Toilets</li>
            <li>✔ Affordable Rental Prices with No Hidden Fees</li>
            <li>✔ Options for Events, Construction, Weddings & More</li>
            <li>✔ Flexible Short-Term & Long-Term Rental Plans</li>
          </ul>

          <h2>Our Portable Toilet Rental Services in {city}</h2>
          <p>
            At FlushJohn, we offer a range of portable toilet rental solutions,
            including:
          </p>
          <ul>
            <li>
              🚧 <strong>Construction Site Porta Potties</strong> – Durable &
              OSHA-compliant
            </li>
            <li>
              🎉 <strong>Event Porta Potties</strong> – Ideal for concerts,
              festivals, and fairs
            </li>
            <li>
              🏕 <strong>Outdoor & Camping Toilets</strong> – Convenient for
              remote locations
            </li>
            <li>
              💍 <strong>Luxury Restroom Trailers</strong> – Perfect for
              weddings & VIP events
            </li>
            <li>
              🆘 <strong>Emergency & Disaster Relief Toilets</strong> – Quick
              deployment in emergencies
            </li>
          </ul>

          <h2>How Much Does a Porta Potty Rental Cost in {city}?</h2>
          <p>
            Porta potty rental prices in {city} vary based on the rental
            duration, unit type, and location. We provide competitive pricing
            for both short-term and long-term rentals.
          </p>
          <p>
            <strong>
              💲 Get an Instant Quote:
              <Link href="/quote">Request a Free Quote Now</Link>
            </strong>
          </p>

          <h2>Rent a Porta Potty in {city} Today!</h2>
          <p>
            Whether you need a porta potty for a construction project, a
            wedding, or an outdoor event, FlushJohn is your go-to provider in
            {city}. We ensure clean, reliable, and hassle-free rentals.
          </p>
          <p>
            <Link href="/contact">
              <strong>📞 Contact Us</strong>
            </Link>
            or
            <Link href="/quote">
              <strong>Get a Free Quote</strong>
            </Link>
            now!
          </p>

          <h2>📞 Call Us for Porta Potty Rentals in {city}</h2>
          <p>
            Need assistance? Call our porta potty rental experts now at{" "}
            <Link href={phone.phone_link}>
              <strong>{phone.phone_number}</strong>
            </Link>{" "}
            for fast service!
          </p>

          <h3>🔗 Explore More:</h3>
          <ul>
            <li>
              <Link href="/">🏠 Visit Homepage</Link>
            </li>
            <li>
              <Link href="/quote">💰 Get a Free Quote</Link>
            </li>
            <li>
              <Link href="/rental-products">🚽 View All Rental Services</Link>
            </li>
            <li>
              <Link href="/blog">📝 View Our Blog</Link>
            </li>
            <li>
              <Link href="/faq">❓ Porta Potty Rental FAQs</Link>
            </li>
            <li>
              <Link href="/contact">📞 Contact Us</Link>
            </li>
            <li>
              <Link href={phone.phone_link}>📞 Call Us Now</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
