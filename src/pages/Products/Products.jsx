import React, { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-2xl">Loading products...</div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.attributes.title}
                </h2>
                <p className="text-indigo-600 mt-2 text-lg font-medium">
                  ${(product.attributes.price / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <ul className="inline-flex items-center -space-x-px">
            {[
              ...Array(Math.ceil(products.length / productsPerPage)).keys(),
            ].map((page) => (
              <li
                key={page}
                onClick={() => paginate(page + 1)}
                className={`cursor-pointer px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 ${
                  currentPage === page + 1 ? "bg-blue-600 text-white" : ""
                }`}
              >
                {page + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Products;
