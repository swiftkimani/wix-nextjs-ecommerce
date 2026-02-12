import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/data";

const ProductList = () => {
  const products = getProducts();

  if (products.length === 0) {
    return (
      <div className="mt-12 text-center text-gray-500 py-12">
        No products available yet.
      </div>
    );
  }

  return (
    <>
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap mb-12">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.url || "/test"}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80">
              {product.image1 && (
                <Image
                  src={product.image1}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                />
              )}
              {product.image2 && (
                <Image
                  src={product.image2}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">
                {product.currency} {product.price.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-gray-500">{product.description}</div>
            <button className="rounded-2xl ring-1 ring-lama text-lama py-2 px-4 w-max text-xs hover:bg-lama hover:text-white">
              Add To Cart
            </button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
