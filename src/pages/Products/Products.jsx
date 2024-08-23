import React, { useEffect, useState } from "react";

function MediaCard({ product }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white">
      <img
        src={product.attributes.image}
        alt={product.attributes.title}
        className="h-60 w-full object-cover"
      />
      <div className="p-4">
        <h5 className="text-xl font-bold mb-2 text-gray-800">
          {product.attributes.title}
        </h5>
        <p className="text-sm text-gray-500 mb-1">
          {product.attributes.category}
        </p>
        <p className="text-sm text-gray-500">{product.attributes.company}</p>
        <p className="text-lg text-blue-600 mt-4 font-semibold">
          ${product.attributes.price}
        </p>
      </div>
    </div>
  );
}

function Cards({ products }) {
  return (
    <div className="container mx-auto mt-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 &&
          products.map((product, index) => (
            <div key={index} className="p-2">
              <MediaCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}

function Form({ filter }) {
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState("a-z");
  const [priceValue, setPriceValue] = useState(100);

  function handleSearch() {
    let copiedProducts = JSON.parse(JSON.stringify(filter.products));

    if (category !== "all") {
      copiedProducts = copiedProducts.filter(
        (product) => product.attributes.category === category
      );
    }

    if (company !== "all") {
      copiedProducts = copiedProducts.filter(
        (product) => product.attributes.company === company
      );
    }

    filter.setFilteredProducts(copiedProducts);
  }

  return (
    <div className="container mx-auto mt-8 bg-blue-100 rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="product"
            className="block text-sm font-medium text-gray-700"
          >
            Search Product
          </label>
          <input
            type="text"
            id="product"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white text-black"
          >
            <option value="all">All</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Company
          </label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white text-black"
          >
            <option value="all">All</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white text-black"
          >
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="high">High Price</option>
            <option value="low">Low Price</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Price
          </label>
          <div className="flex justify-between items-center">
            <span>$0</span>
            <span>${priceValue}.00</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div className="col-span-1 flex items-center">
          <input
            type="checkbox"
            className="ml-2 h-4 w-4 text-blue-600 border border-gray-300 rounded bg-white"
          />
          <label className="block text-sm font-medium text-gray-700 ml-2">
            Free Shipping
          </label>
        </div>

        <div className="col-span-1">
          <button
            onClick={handleSearch}
            className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>

        <div className="col-span-1">
          <button className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sendProducts, setSendProducts] = useState([]);

  useEffect(() => {
    fetch(`https://strapi-store-server.onrender.com/api/products`)
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  useEffect(() => {
    setSendProducts(filteredProducts.length > 0 ? filteredProducts : products);
  }, [products, filteredProducts]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Form filter={{ setFilteredProducts, products }} />
      <div className="mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {sendProducts.length} products
          </h2>
        </div>
        <Cards products={sendProducts} />
      </div>
    </div>
  );
}

export default Products;
