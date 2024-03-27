import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <div>
      <div className="w-full  bg-white text-black  px-10 py-2">
        <div className="h-[100px]">
          <div className="h-[36px] pt-[-10px]  w-full">
            <div className="flex justify-end gap-x-5 text-xs">
              <div>Help</div>
              <div>Orders & Returns</div>
              <div>Hi, John</div>
            </div>
          </div>

          <div className="flex w-full justify-between items-end pt-1">
            <div className="font-bold text-3xl">ECOMMERCE</div>

            <div className="flex gap-x-12  text-sm font-semibold px-5 pr-20">
              <div>Categories</div>
              <div>Sale</div>
              <div>Clearance</div>
              <div>New Stock</div>
              <div>Trending</div>
            </div>

            <div className="flex justify-between gap-x-10">
              <Search size={20} className="text-xs text-gray-600" />
              <ShoppingCart size={20} className="text-xs text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[36px] bg-[#F4F4F4] text-black flex justify-center gap-x-6 items-center text-xs">
        <div>
          <ChevronLeft size={20} />
        </div>
        <div className="font-semibold text-[14px]">
          Get 10% off on business sign up
        </div>
        <div>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}
