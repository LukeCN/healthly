import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: 36 }}>Page not found</h1>
      <p style={{ color: "#5b716b" }}>The page you’re looking for isn’t here.</p>
      <p><Link href="/" className="btn" style={{ background: "#1f9d78", color: "#fff" }}>Back to Healthly</Link></p>
    </div>
  );
}
