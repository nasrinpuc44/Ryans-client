// OrderPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [specialRequests, setSpecialRequests] = useState('');
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Products data (same as in Home.jsx)
  const productsData = [
    {
      "category": "Gaming",
      "products": [
        {
          "id": 1,
          "name": "Gaming Beast X1",
          "image": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2042&q=80",
          "price": "$1200",
          "description": "High-end gaming PC with RTX 4080 and 32GB RAM.",
          "details": "Experience unparalleled gaming performance with the Gaming Beast X1. Features include liquid cooling, RGB lighting, and ultra-fast SSD storage. Perfect for competitive gaming and content creation."
        },
        {
          "id": 2,
          "name": "Pro Gamer Z3",
          "image": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2042&q=80",
          "price": "$999",
          "description": "Compact gaming setup with fast SSD and RGB lighting.",
          "details": "The Pro Gamer Z3 offers a perfect balance of performance and size. With its compact design, it fits in any space while delivering exceptional gaming experiences with its high-refresh-rate capabilities."
        },
        {
          "id": 3,
          "name": "Elite Gaming Alpha",
          "image": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2042&q=80",
          "price": "$1500",
          "description": "Ultimate gaming experience with liquid cooling and high FPS.",
          "details": "The Elite Gaming Alpha is our flagship model, designed for the most demanding gamers. Featuring advanced liquid cooling, overclockable components, and premium aesthetics for the ultimate battlestation."
        }
      ]
    },
    {
      "category": "Printer",
      "products": [
        {
          "id": 4,
          "name": "Ultra Printer P1",
          "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          "price": "$499",
          "description": "High-speed printer with wireless connectivity.",
          "details": "The Ultra Printer P1 delivers professional-quality prints at remarkable speeds. With wireless connectivity, mobile printing, and automatic duplexing, it's perfect for home offices and small businesses."
        },
        {
          "id": 5,
          "name": "LaserJet Pro L2",
          "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          "price": "$399",
          "description": "Efficient laser printer for home and office use.",
          "details": "The LaserJet Pro L2 combines efficiency with reliability. Its toner-saving mode reduces operating costs while maintaining crisp, clear prints. Ideal for high-volume printing needs."
        },
        {
          "id": 6,
          "name": "All-in-One Printer X3",
          "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          "price": "$599",
          "description": "Print, scan, and copy in one sleek device.",
          "details": "The All-in-One Printer X3 is the complete office solution. With its flatbed scanner, automatic document feeder, and high-quality printing capabilities, it handles all your document needs in one compact device."
        }
      ]
    },
    {
      "category": "Laptop",
      "products": [
        {
          "id": 7,
          "name": "Laptop Pro 15",
          "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
          "price": "$899",
          "description": "Powerful laptop with Intel i7, 16GB RAM, 512GB SSD.",
          "details": "The Laptop Pro 15 combines performance with portability. With its vibrant display, long battery life, and powerful internals, it's perfect for professionals, students, and creatives on the go."
        },
        {
          "id": 8,
          "name": "UltraBook Z5",
          "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
          "price": "$1099",
          "description": "Slim ultrabook for professionals and creators.",
          "details": "The UltraBook Z5 redefines thin and light computing. With its premium aluminum chassis, stunning display, and all-day battery life, it's the perfect companion for mobile professionals."
        },
        {
          "id": 9,
          "name": "Gaming Laptop G9",
          "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
          "price": "$1299",
          "description": "Laptop optimized for gaming with RTX 4070 and high refresh screen.",
          "details": "The Gaming Laptop G9 brings desktop-level performance to a portable form factor. With its high-refresh-rate display, advanced cooling system, and powerful graphics, it delivers immersive gaming anywhere."
        }
      ]
    },
    {
      "category": "Monitor",
      "products": [
        {
          "id": 10,
          "name": "4K Ultra Monitor M1",
          "image": "https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
          "price": "$499",
          "description": "High-resolution 4K monitor with HDR support.",
          "details": "The 4K Ultra Monitor M1 delivers stunning visuals with its 3840x2160 resolution and HDR support. Perfect for content creators, designers, and anyone who demands exceptional image quality."
        },
        {
          "id": 11,
          "name": "Gaming Monitor G2",
          "image": "https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
          "price": "$399",
          "description": "144Hz refresh rate monitor perfect for competitive gaming.",
          "details": "The Gaming Monitor G2 gives you the competitive edge with its 144Hz refresh rate and 1ms response time. AMD FreeSync technology eliminates screen tearing for smooth, immersive gameplay."
        },
        {
          "id": 12,
          "name": "Curved Monitor C3",
          "image": "https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
          "price": "$599",
          "description": "Immersive curved screen for work and entertainment.",
          "details": "The Curved Monitor C3 wraps around your field of vision for an immersive experience. Whether you're working on spreadsheets or watching movies, the gentle curve reduces eye strain and enhances immersion."
        }
      ]
    }
  ];

  useEffect(() => {
    // Find the product by ID
    const allProducts = productsData.flatMap(category => category.products);
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Redirect if product not found
      navigate('/');
    }
    
    setIsLoading(false);
    
    // Set minimum date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the order
    alert(`Order placed for ${quantity} ${product.name}!`);
    navigate('/');
  };

  const calculateTotal = () => {
    if (!product) return 0;
    const price = parseFloat(product.price.replace('$', ''));
    return price * quantity;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/" className="btn btn-primary">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Product Details */}
          <div className="bg-base-200 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full md:w-80 h-60 object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl text-primary font-bold mb-4">{product.price}</p>
                <p className="text-base-content/70 mb-4">{product.description}</p>
                <div className="badge badge-primary badge-lg">Top Sale</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Product Details</h2>
              <p className="text-base-content/70">{product.details}</p>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-base-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Quantity</span>
                </label>
                <div className="join">
                  <button 
                    type="button" 
                    className="join-item btn btn-primary"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="join-item input input-bordered text-center w-20" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    type="button" 
                    className="join-item btn btn-primary"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Delivery Date</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input input-bordered"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Delivery Option</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="standard"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="radio radio-primary"
                    />
                    <span>Standard Delivery (Free)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="express"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="radio radio-primary"
                    />
                    <span>Express Delivery (+$15)</span>
                  </label>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Special Requests</span>
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="textarea textarea-bordered h-24"
                  placeholder="Any special instructions or requests..."
                />
              </div>

              {/* Order Summary */}
              <div className="bg-base-300 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{product.name} × {quantity}</span>
                    <span>${(parseFloat(product.price.replace('$', '')) * quantity).toFixed(2)}</span>
                  </div>
                  {deliveryOption === 'express' && (
                    <div className="flex justify-between">
                      <span>Express Delivery</span>
                      <span>$15.00</span>
                    </div>
                  )}
                  <div className="divider my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(calculateTotal() + (deliveryOption === 'express' ? 15 : 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Confirm Order
              </button>
            </form>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData
              .flatMap(category => category.products)
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="card bg-base-200 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-lg">{relatedProduct.name}</h3>
                    <p className="text-primary font-semibold">{relatedProduct.price}</p>
                    <p className="text-sm text-base-content/70">{relatedProduct.description}</p>
                    <div className="card-actions justify-end">
                      <Link 
                        to={`/order/${relatedProduct.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPage;