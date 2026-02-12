import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import React from "react";

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mb-12">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>

      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Perspiciatis, vero?
        </p>

        <div className="h-[2px] bg-gra-100" />

        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">Ksh 2500</h3>
          <h2 className="font-medium text-2xl">Ksh 2000</h2>
        </div>

        <div className="h-[2px] bg-gra-100" />

        <CustomizeProducts />
        <Add />

        <div className="h-[2px] bg-gra-100" />

        <div className="text-sm">
          <h4 className="font-medium mb-4 ">Title</h4>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
            quae nemo provident quidem consequatur hic a praesentium? Error,
            corporis vel!
          </p>
        </div>

        <div className="text-sm">
          <h4 className="font-medium mb-4 ">Title</h4>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
            quae nemo provident quidem consequatur hic a praesentium? Error,
            corporis vel!
          </p>
        </div>

        <div className="text-sm">
          <h4 className="font-medium mb-4 ">Title</h4>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
            quae nemo provident quidem consequatur hic a praesentium? Error,
            corporis vel!
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default SinglePage;
