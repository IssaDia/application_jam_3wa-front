import { useState } from "react";

function App() {
  const handleFilterSubmit = () => {
    // Handle form submission and filtering here
  };

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <>
      <h1 className="text-3xl text-right font-bold underline">Hello world!</h1>
      <div className="row mt-4">
        <div className="col-12 mt-4" id="content">
          <div className="row">
            <div className="col-4">
              <form onSubmit={handleFilterSubmit}>
                <input type="hidden" name="minPrice" />
                <input type="hidden" name="maxPrice" />

                <div className="my-5" id="slider"></div>
                <select name="filter">
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="name_asc">Alphabétique</option>
                  <option value="name_desc">Alphabétique Z-A</option>
                </select>
                <br />
                <br />
                {categories.map((category) => (
                  <div className="form-check" key={category.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="category[]"
                      value={category.id}
                      id={`flexCheckDefault${category.id}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheckDefault${category.id}`}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
                <br />
                <button className="btn btn-dark" type="submit">
                  FILTRER
                </button>
              </form>
            </div>
            <div className="col-8">
              <div className="row">
                {products.map((product) => (
                  <div className="m-2 col-3 m-22 card" key={product.id}>
                    <img
                      className="p-4 card-img-top"
                      src={`uploads/${product.image}`}
                      alt={product.name}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {(product.price / 100).toLocaleString("fr", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>
                      <div className="row">
                        <form
                          className="col"
                          action={`addCart?id=${product.id}`}
                        >
                          {app.session.cart[product.id] === undefined ? (
                            <>
                              <input
                                className="quantity form-control"
                                name="quantity"
                                type="number"
                                value="1"
                              />
                              <button
                                data-product={product.id}
                                className="mt-2 addCartButton btn btn-dark"
                                type="submit"
                              >
                                AJOUTER
                              </button>
                            </>
                          ) : (
                            <>
                              <input
                                className="quantity form-control"
                                name="quantity"
                                type="number"
                                value={app.session.cart[product.id]}
                              />
                              <button
                                data-product={product.id}
                                className="mt-2 addCartButton btn btn-dark"
                                type="submit"
                              >
                                MODIFIER
                              </button>
                            </>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
