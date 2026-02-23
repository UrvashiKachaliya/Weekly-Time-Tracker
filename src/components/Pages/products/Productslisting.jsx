import Card from "react-bootstrap/Card";
import { useQuery } from "@tanstack/react-query";
import { BASE_URLS } from "../../constants/serviceBaseUrls";
import * as apiUrl from "../../constants/urls";

const API_ENDPOINT = BASE_URLS.BACKEND_URL;

const Products = () => {
  const fetchProducts = async () => {
    const response = await fetch(`${API_ENDPOINT}${apiUrl.viewProduct}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageNo: 1,
        limit: 2,
        search: "",
        sort_field: "price",
        sort_dir: "ASC",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.message || "API returned unsuccessful response");
    }

    return json;
  };

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["products", "page-1"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div className="text-center py-5">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-danger text-center py-5">
        Error loading products: {error.message}
      </div>
    );
  }

  const products = data?.data || [];

  if (isSuccess && products.length === 0) {
    return <div className="text-center py-5">No products found.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 3fr))",
        gap: "24px",
        padding: "20px",
      }}
    >
      {products.map((product) => {
        const priceNum = parseFloat(product.price);
        const formattedPrice = isNaN(priceNum)
          ? product.price
          : `₹${priceNum.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;

        return (
          <Card
            key={product.id}
            style={{
              backgroundColor: "#F9F6EE",
              border: "1px solid #e0e0e0",
              transition: "transform 0.15s",
            }}
            className="shadow-sm hover-shadow"
          >
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{
                height: "220px",
                objectFit: "contain",
                padding: "16px",
                backgroundColor: "white",
              }}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/300x220?text=Image+Not+Found";
              }}
            />

            <Card.Body className="d-flex flex-column">
              <Card.Title className="mb-2" style={{ fontSize: "1.1rem" }}>
                {product.title}
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted text-capitalize" style={{ fontSize: "0.9rem" }}>
                {product.category}
              </Card.Subtitle>

              <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "0.95rem" }}>
                {product.description?.length > 120
                  ? product.description.substring(0, 117) + "..."
                  : product.description}
              </Card.Text>

              <Card.Text className="mt-auto mb-0">
                <strong style={{ fontSize: "1.25rem", color: "#c0392b" }}>
                  {formattedPrice}
                </strong>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;