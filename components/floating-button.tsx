import Link from "next/link";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <div className="fixed z-10 hover:bg-orange-500 transition-colors cursor-pointer bottom-24 right-5 bg-orange-400 rounded-full p-4 text-white shadow-xl">
        {children}
      </div>
    </Link>
  );
}
