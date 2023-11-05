const Billboard = () => {
  return (
    <div className="p-4 xl:px-0 sm:py-6 rounded-xl overflow-hidden">
      <div
        className="rounded-3xl bg-center relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: "url('/images/billboard.webp')" }}
      />
    </div>
  )
}

export default Billboard