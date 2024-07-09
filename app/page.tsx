import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav>
          <Link href="/">SUMATRA BUS</Link>
          <Link href="/loginxsqwt">Login Admin</Link>
          <Link href="/login">Login Customer</Link>
        </nav>
      <p>Hallo ini halaman Home</p>
    </div>
  )
}

