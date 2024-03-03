import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>This is the landing page</div>
      <Link href="/dashboard">
        <Button>Go to dashboard</Button>
      </Link>
    </>
  );
}
