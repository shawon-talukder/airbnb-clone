"use client";

import { categories } from "@/app/utils/categories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";

const CategoryList = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a Category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto scrollbar scrollbar-w-[5px] scrollbar-rounded-lg scrollbar-thumb-rose-400 scrollbar-track-neutral-500">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={() => {}}
              selected={false}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
