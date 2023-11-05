import CategoryCard from "./cards/CategoryCard";

const Categories = () => {
  return (
    <section
      id='categories'
      aria-labelledby='categories-heading'
      className='space-y-6 px-4 py-8 md:pt-10 lg:pt-24'>
      <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>
          Categories
        </h2>
        <h3 className='max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
          Find the best skateboarding gears from stores around the world
        </h3>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <CategoryCard category='Skateboards' />
        <CategoryCard category='Clothing' />
        <CategoryCard category='Shoes' />
        <CategoryCard category='Accessories' />
      </div>
    </section>
  );
};

export default Categories;
