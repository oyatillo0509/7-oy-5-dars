import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../Hooks/UseProducts";
import Header from "../components/Header"; // Headerni import qilish

function ProductDetail() {
  const { id } = useParams();
  const { product, addToBag } = useProduct(id);

  if (!product) return <div>Yuklanmoqda...</div>;

  const handleAddToBag = () => {
    addToBag();
    alert("Mahsulot qo'shildi!"); // Alert chiqarish
  };

  return (
    <>
      <Header /> {/* Headerni qo'shish */}
      <div className="main-container bg-slate-50">
        <div className="container mx-auto px-8 py-20 max-w-6xl ">
          <div className="flex">
            <img
              className="w-[500px] h-[500px] rounded-xl"
              src={product.attributes.image}
              alt={product.attributes.title}
            />
            <div className="ml-10">
              <h2 className="text-4xl font-bold text-sky-600 uppercase">{product.attributes.title}</h2>
              <p className="mt-7">
                ${(product.attributes.price / 100).toFixed(2)}
              </p>
              <p className="mt-7">{product.attributes.description}</p>
              <div className="mt-7">
                <button
                  onClick={handleAddToBag} // Alert chiqish va savatga qo'shish
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
