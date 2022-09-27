export default function BusinessContainer({ children }: any) {
    return (
      <>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 my-12 md:mx-auto px-1 md:px-12 items-center justify-center">
             {children}
        </div>
      </>
    )
}