import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return (
    <div className="maincontainer bg-slate-50">
      <div className="container mx-auto px-8 py-20 max-w-6xl">
        <div className="flex justify-between">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-slate-700 mt-5">
              We are changing the way people shop
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <Link to="/products" className="mt-5 text-white btn btn-info">
              OUR PRODUCTS
            </Link>
          </div>
          <div
            className="carousel carousel-center bg-neutral rounded-box space-x-4 p-4"
            style={{ width: "496px", height: "448px" }}
          >
            {[
              "hero1-deae5a1f.webp",
              "hero2-2271e3ad.webp",
              "hero3-a83f0357.webp",
              "hero4-4b9de90e.webp",
            ].map((img, index) => (
              <div className="carousel-item" key={index}>
                <img
                  width={320}
                  height={416}
                  src={`https://react-vite-comfy-store-v2.netlify.app/assets/${img}`}
                  className="rounded-box"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="featured-products mt-20">
          <h2 className="text-3xl font-medium tracking-wider capitalize pb-5 max-w-6xl mx-auto">
            Featured Products
          </h2>
          <div className="flex justify-between max-w-6xl mx-auto border-t-2 pt-10 mb-10">
            {data.length > 0 &&
              data.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="shadow-xl hover:shadow-2xl transition duration-300 p-4 rounded-2xl"
                  style={{ width: "352px", height: "332px" }}
                >
                  <div className="text-center">
                    <img
                      className="w-80 h-52 rounded-xl"
                      src={product.attributes.image}
                      alt={product.attributes.title}
                    />
                    <h3 className="pt-9 capitalize tracking-wider">
                      {product.attributes.title}
                    </h3>
                    <p>${(product.attributes.price / 100).toFixed(2)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
