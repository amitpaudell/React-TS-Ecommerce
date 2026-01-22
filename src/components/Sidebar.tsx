import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,

    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    'apple',
    'watch',
    'fashion',
    'trend',
    'shoes',
    'shirt',
  ]);

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        console.log(data);
        setCategories(uniqueCategories);
      };
      fetchCategories();
    } catch (error) {
      console.log('Error', error);
    }
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword('');
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          name=""
          id=""
        />

        <div className="flex justify-center items-center ">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Categories Section */}

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3 ">Categories</h2>
        </div>

        <section>
          {categories.map((category, index) => (
            <label htmlFor={category} key={index} className="block mb-2 ">
              <input
                id={category}
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategory(category)}
                checked={selectedCategory === category}
                className="mr-2 w-4 h-4"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/* Keywords Section */}

        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilter}
          className="w-full py-2 mb-16 bg-black text-white rounded mt-5 "
        >
          Reset Filter
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
