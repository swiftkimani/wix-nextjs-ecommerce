import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getCategories } from "@/lib/data";

const CatergoryList = () => {
  const categories = getCategories();

  if (categories.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No categories available yet.
      </div>
    );
  }

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            href={`/list?cat=${cat.slug}`}
          >
            <div className="relative bg-slate-100 w-full h-96">
              {cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              )}
            </div>
            <h1 className="mt-8 font-ligt text-cl tracking-wide">
              {cat.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatergoryList;
