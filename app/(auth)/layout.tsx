export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full flex  justify-center">{children}</div>;
}
