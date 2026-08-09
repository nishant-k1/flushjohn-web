export default function Loading() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      background: "var(--bg-primary)",
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: "3px solid var(--border-color, #e5e7eb)",
        borderTopColor: "var(--text-primary, #111827)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
