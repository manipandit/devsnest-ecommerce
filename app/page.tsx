"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Skeleton from "@/components/Skeleton";

interface Product {
  name: string;
  id: string;
}

export default function page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    selectedProducts();
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage: number) => {
    if (selectedPage >= 1 && selectedPage <= totalPages) setPage(selectedPage);
  };

  const renderPageNums = () => {
    const maxPages = 7;
    let startPage = Math.max(1, page - Math.floor(maxPages / 2));
    let endPage = startPage + maxPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // fetch product categories from database
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/category`, {
        withCredentials: true,
      });

      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.products.length / 6));
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // fetch selected categories
  const selectedProducts = async () => {
    try {
      const { data } = await axios.get(`/api/category/select`, {
        withCredentials: true,
      });

      const categories = data.selectedCategories;

      const updatedCategories = categories.map(
        (category: { categoryId: string }) => {
          return category.categoryId;
        }
      );
      setSelectedCategories(updatedCategories);
    } catch (error) {
      alert(error);
    }
  };

  const selectCategory = async (categoryId: string) => {
    try {
      const newSelectedCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId];

      // Update the local state immediately to reflect the change
      setSelectedCategories(newSelectedCategories);

      const { data } = await axios.post(
        `/api/category/select/?categoryId=${categoryId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-[576px] h-[658px] mt-[78px] mb-6 border border-[#C1C1C1] rounded-[20px]">
        <div>
          <div className="font-semibold text-[32px] leading-[38px] pt-10 text-center">
            Please mark your interests!
          </div>
          <div className="text-center pt-5 font-normal text-[16px]">
            We will keep you notified.
          </div>
          <div className="pt-10 pl-10 font-medium text-[20px] leading-[26px]">
            My saved interests!
          </div>

          {loading ? (
            <Skeleton />
          ) : (
            <div className="pt-5 pl-10">
              <div className="flex flex-col gap-x-3">
                <div className="flex flex-col gap-y-4">
                  {products.slice(page * 6 - 6, page * 6).map((product) => {
                    return (
                      <div
                        key={product.id}
                        className="flex gap-x-3 items-center mb-3 "
                      >
                        <input
                          type="checkbox"
                          onChange={() => selectCategory(product.id)}
                          checked={selectedCategories.includes(product.id)}
                          className="w-6 h-6 rounded-[4px] text-black bg-[#CCCCCC] border-gray-300 checked:accent-black "
                        />

                        <li className="list-none text-[16px] font-normal leading-[26px]">
                          {product.name}
                        </li>
                      </div>
                    );
                  })}
                </div>
                {products.length > 0 && (
                  <div className="flex items-center pt-16">
                    <span
                      onClick={() => selectPageHandler(page - 2)}
                      className="py-4 px-0 cursor-pointer"
                    >
                      <ChevronsLeft size={25} color="#ACACAC" />
                    </span>
                    <span
                      onClick={() => selectPageHandler(page - 1)}
                      className="py-4 px-0 cursor-pointer"
                    >
                      <ChevronLeft size={20} color="#ACACAC" />
                    </span>
                    {renderPageNums().map((pageNumber) => (
                      <span
                        onClick={() => selectPageHandler(pageNumber)}
                        className={`py-4 px-2 cursor-pointer font-medium text-[20px]  ${
                          page === pageNumber ? "text-black" : "text-[#ACACAC]"
                        }`}
                        key={pageNumber}
                      >
                        {pageNumber}
                      </span>
                    ))}
                    <span className="text-[#ACACAC]">...</span>
                    <span
                      onClick={() => selectPageHandler(page + 1)}
                      className="py-4 px-2 cursor-pointer"
                    >
                      <ChevronRight size={20} color="#ACACAC" />
                    </span>
                    <span
                      onClick={() => selectPageHandler(page + 2)}
                      className="py-4 px-0 cursor-pointer"
                    >
                      <ChevronsRight size={25} color="#ACACAC" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
