import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Divide, Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropDown] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    // skip = 20 → skip first 20 pages
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products);
      })
      .catch((error) => {
        console.log('ERROR FETCHING THE DATA', error);
      });
  }, [currentPage, keyword]);

  const getFilteredProduct = () => {
    let filteredProduct = products;

    if (selectedCategory) {
      filteredProduct = filteredProduct.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProduct = filteredProduct.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProduct = filteredProduct.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProduct = filteredProduct.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case 'expensive':
        return filteredProduct.sort((a, b) => b.price - a.price);

      case 'cheap':
        return filteredProduct.sort((a, b) => a.price - b.price);

      case 'popular':
        return filteredProduct.sort((a, b) => b.rating - a.rating);

      default:
        return filteredProduct;
    }
  };

  const filteredProduct = getFilteredProduct();
  console.log(filteredProduct);
  return (
    <div className="rounded w-full flex justify-between flex-wrap">
      <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-5 mt-5">
              <button className="border px-4 py-2 rounded-full flex items-center ">
                <Tally3 className="mr-2"></Tally3>

                {filter === 'all'
                  ? 'Filter'
                  : filter.charAt(0).toLowerCase() + filter.slice(1)}
              </button>

              {dropdownOpen && (
                <div>
                  <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                    <button
                      onClick={() => setFilter('cheap')}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      Cheap
                    </button>

                    <button
                      onClick={() => setFilter('expensive')}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      Expensive
                    </button>

                    <button
                      onClick={() => setFilter('popular')}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      Popular
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredProduct.map((product) => (
              <BookCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                price={product.price}
              ></BookCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
