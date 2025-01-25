export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="max-w-7xl h-screen flex flex-col items-center justify-center">{children}</div>
    );
  }
  