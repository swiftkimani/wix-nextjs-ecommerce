import CatergoryList from "@/components/CatergoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import { getSlides } from "@/lib/data"

const HomePage = () => {
  const slides = getSlides();

  return (
    <div className=''>
      <Slider initialSlides={slides} />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList/>
      </div>

      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">Categories</h1>
        <CatergoryList/>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList/>
      </div>
    </div>
  )
}

export default HomePage