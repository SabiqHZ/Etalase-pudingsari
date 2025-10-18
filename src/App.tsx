import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { ProductCard, Product } from "./components/ProductCard";
import { AdminDialog } from "./components/AdminDialog";
import { LogIn, LogOut } from "lucide-react";
import { OrderFlow } from "./components/OrderFlow";
import { Toast as ToastNotification } from "./components/Toast";

const initialProducts: Product[] = [];
export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  const handleLogin = (password: string) => {
    if (password === "Zarkasi") {
      setIsAdminLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminDialogOpen(false);
  };

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
    setCurrentPage(Math.ceil((products.length + 1) / productsPerPage));
    setIsAdminDialogOpen(false);
    setToast({
      message: "Produk berhasil ditambahkan!",
      type: "success",
    });
  };

  const handleDeleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
    const newTotalPages = Math.ceil(newProducts.length / productsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
    setToast({
      message: "Produk berhasil dihapus!",
      type: "success",
    });
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
    setIsAdminDialogOpen(false);
    setToast({
      message: "Produk berhasil diperbarui!",
      type: "success",
    });
  };

  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAdminDialogOpen(true);
  };
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl">Katalog Puding Sari</h1>
          <div className="flex gap-2">
            {isAdminLoggedIn && (
              <Button
                variant="outline"
                onClick={() => setIsAdminDialogOpen(true)}
              >
                Add Product
              </Button>
            )}
            <Button
              variant={isAdminLoggedIn ? "destructive" : "default"}
              onClick={() => {
                if (isAdminLoggedIn) {
                  handleLogout();
                } else {
                  setIsAdminDialogOpen(true);
                }
              }}
            >
              {isAdminLoggedIn ? (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin Login
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 mb-16">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Produk Kami</h2>
          <p className="text-muted-foreground">
            Temukan jajanan kami yang penuh kejutan rasa!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdminLoggedIn}
              onDelete={handleDeleteProduct}
              onEdit={handleStartEdit}
            />
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available</p>
          </div>
        )}
      </main>

      {/* Order Flow Section */}
      <div style={{ height: "50px", background: "transparent" }}></div>
      <OrderFlow />
      <div style={{ height: "50px", background: "transparent" }}></div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-32 pt-16 border-t-2 border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-4">Tentang Kami</h3>
              <p className="text-gray-300">
                Puding Sari menghadirkan jajanan pilihan yang memadukan cita
                rasa, kualitas, dan tampilan menarik. Kami berkomitmen
                memberikan pengalaman menikmati camilan yang istimewa.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Kontak dan Lokasi Kami</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/wa.png"
                    alt="WhatsApp"
                    className="w-4 h-4 object-contain flex-shrink-0"
                  />
                  <p>+62 813-2807-0682</p>
                </div>
                <div className="flex items-start gap-2">
                  <img
                    src="/images/loc.png"
                    alt="Location"
                    className="w-4 h-4 object-contain flex-shrink-0 mt-0.5"
                  />
                  <p>
                    Jl. Murangan VII No.8, Panggeran 8, Triharjo, Kec. Sleman,
                    Kabupaten Sleman, Daerah Istimewa Yogyakarta 55514
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Jam Operasional & Ketentuan Pemesanan</h3>
              <div className="space-y-2 text-gray-300">
                <p>Senin - Sabtu: 08.00 - 20.00 WIB</p>
                <p>Minggu: (Diproses hari berikutnya)</p>
                <p className="mt-4 text-sm text-gray-400">
                  Pemesanan dilakukan minimal 3 jam sebelum waktu pengambilan.
                  Semakin banyak jumlah pesanan, semakin lama waktu persiapan
                  yang dibutuhkan.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Puding Sari. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Admin Dialog */}
      <AdminDialog
        isOpen={isAdminDialogOpen}
        onClose={() => {
          setIsAdminDialogOpen(false);
          setEditingProduct(null);
        }}
        isLoggedIn={isAdminLoggedIn}
        onLogin={handleLogin}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        editingProduct={editingProduct}
      />
    </div>
  );
}
