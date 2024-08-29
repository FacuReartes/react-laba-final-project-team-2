import Header from "@/components/common/Header";

export default function Layout({ children }: 
  Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}