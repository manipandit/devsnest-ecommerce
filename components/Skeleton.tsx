import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

function Skeleton() {
  // Dummy product array
  const dummyProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
    { id: 6, name: "Product 6" },
  ];

  return (
    <div>
      <div className="pt-5 pl-10">
        <div className="flex flex-col gap-x-3">
          <div className="flex w-10/12 flex-col gap-y-4">
            {/* Mapping through dummyProducts */}
            {dummyProducts.map((product) => (
              <div
                key={product.id}
                className="z-20 flex gap-x-3 items-center mb-3 opacity-10 bg-gray-800 transition-opacity duration-500"
              >
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded-[4px] text-black bg-[#CCCCCC] border-gray-300 checked:accent-black"
                />

                <li className="list-none text-[16px] font-normal leading-[26px] ml-6">
                  {product.name}
                </li>
              </div>
            ))}
          </div>
          {
            <div className="flex items-center pt-16">
              <span className="py-4 px-0 cursor-pointer">
                <ChevronsLeft size={25} color="#ACACAC" />
              </span>
              <span className="py-4 px-0 cursor-pointer">
                <ChevronLeft size={20} color="#ACACAC" />
              </span>
              {Array.from({ length: 7 }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <span
                    className={`py-4 px-2 cursor-pointer font-medium text-[20px] ${
                      pageNumber === 1 ? "text-black" : "text-[#ACACAC]"
                    }`}
                  >
                    {pageNumber}
                  </span>
                )
              )}
              <span className="text-[#ACACAC]">...</span>
              <span className="py-4 px-2 cursor-pointer">
                <ChevronRight size={20} color="#ACACAC" />
              </span>
              <span className="py-4 px-0 cursor-pointer">
                <ChevronsRight size={25} color="#ACACAC" />
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
