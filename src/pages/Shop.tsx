import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Product } from '../data/storeAndBlogData';
import { Button } from '../components/Button';
import { fetchWixStoreProducts, fetchPageContent, useWixLiveRefresh, GenericPageContent } from '../services/wixClient';

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<GenericPageContent>({
    eyebrow: 'Print & Digital Publications',
    pageTitle: 'Cultured Pearl Store',
    description: "Celebrating women services, talking about things that matter to women, providing information regarding every facet of life, and educating on topics that affect women's wellbeing.",
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadShop = useCallback(() => {
    fetchPageContent('ShopPage', pageData).then(setPageData);
    fetchWixStoreProducts().then((items) => {
      setProducts(items);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadShop();
  }, [loadShop]);

  useWixLiveRefresh(loadShop);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOrderConfirmed(true);
    }, 600);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setOrderConfirmed(false);
    setCustomerName('');
    setCustomerEmail('');
  };

  return (
    <div>
      <PageHeader
        eyebrow={pageData.eyebrow || 'Print & Digital Publications'}
        title={pageData.pageTitle || 'Cultured Pearl Store'}
        subtitle={pageData.description}
      />

      <Section tone="sand">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Eyebrow text="Official Publications · Wix Stores" />
          <h2 className="font-serif text-3xl md:text-4xl text-espresso font-bold mt-4">
            Cultured Pearl, The Magazine
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-6" />
          <p className="font-sans text-base text-espresso/80 leading-relaxed">
            All proceeds from magazine purchases and commemorative digital editions directly fund the Purposeful Life Scholarship and homeless outreach initiatives.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className="font-serif text-xl italic text-espresso/60">Loading products from Wix Stores Catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-pearl rounded-2xl overflow-hidden border border-sand/80 shadow-soft hover:shadow-hover transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden bg-sand/20 flex items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain rounded-md shadow-md hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-widest text-gold font-bold">
                        {product.category}
                      </span>
                      <span className="font-serif text-xl font-bold text-espresso">
                        {product.price}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-espresso mb-3 leading-snug">
                      {product.title}
                    </h3>

                    <p className="font-sans text-xs text-espresso/70 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      setSelectedProduct(product);
                      setOrderConfirmed(false);
                    }}
                  >
                    {product.digital ? 'Download Edition' : 'Order Print Copy'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Checkout Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-pearl rounded-3xl max-w-lg w-full p-8 border border-sand shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-espresso/60 hover:text-espresso text-xl font-bold"
            >
              ✕
            </button>

            {orderConfirmed ? (
              <div className="text-center py-8">
                <span className="text-5xl text-gold block mb-3">✓</span>
                <h3 className="font-serif text-2xl font-bold text-espresso">Order Reserved!</h3>
                <p className="text-sm text-espresso/80 mt-2">
                  Thank you, <strong>{customerName}</strong>! Your order for <em>{selectedProduct.title}</em> has been recorded.
                </p>
                <p className="text-xs text-espresso/60 mt-2">
                  Confirmation and fulfillment instructions have been sent to <strong>{customerEmail}</strong>.
                </p>
                <Button variant="primary" className="mt-6" onClick={closeModal}>
                  Close
                </Button>
              </div>
            ) : (
              <div>
                <Eyebrow text="Wix Store Checkout" />
                <h3 className="font-serif text-2xl font-bold text-espresso mt-1">
                  {selectedProduct.title}
                </h3>
                <div className="flex items-center justify-between my-4 py-3 border-y border-sand text-sm font-sans">
                  <span>Price ({selectedProduct.digital ? 'Digital PDF' : 'Print Edition'})</span>
                  <span className="font-serif text-xl font-bold text-espresso">{selectedProduct.price}</span>
                </div>

                <form onSubmit={handleOrder} className="space-y-4 font-sans text-sm">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  {!selectedProduct.digital && (
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                        Shipping Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Street, City, State, ZIP"
                        className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full mt-2" disabled={submitting}>
                    {submitting ? 'Confirming Order...' : `Proceed to Order (${selectedProduct.price})`}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
