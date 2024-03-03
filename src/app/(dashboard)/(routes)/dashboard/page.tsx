import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
