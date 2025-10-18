import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Product } from "./ProductCard";

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: (password: string) => void;
  onAddProduct: (product: Omit<Product, "id">) => void;
  onEditProduct?: (product: Product) => void;
  editingProduct?: Product | null;
}

export function AdminDialog({
  isOpen,
  onClose,
  isLoggedIn,
  onLogin,
  onAddProduct,
  onEditProduct,
  editingProduct,
}: AdminDialogProps) {
  const [password, setPassword] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    details: "",
    category: "",
  });
  useEffect(() => {
    if (editingProduct) {
      setNewProduct({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        image: editingProduct.image,
        details: editingProduct.details,
        category: editingProduct.category,
      });
    } else {
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        details: "",
        category: "",
      });
    }
  }, [editingProduct, isOpen]);
  const handleLogin = () => {
    onLogin(password);
    setPassword("");
  };

  const handleSubmitProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      if (editingProduct && onEditProduct) {
        // Mode Edit
        onEditProduct({
          ...newProduct,
          id: editingProduct.id,
          price: parseFloat(newProduct.price),
        });
      } else {
        // Mode Add
        onAddProduct({
          ...newProduct,
          price: parseFloat(newProduct.price),
        });
      }
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        details: "",
        category: "",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {!isLoggedIn ? (
          <>
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
              <DialogDescription>
                Masukkan kata sandi untuk mengakses fitur admin.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleLogin}>Login</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Produk" : "Tambahkan Produk Baru"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Ubah detail produk yang ingin diperbarui."
                  : "Masukkan detail produk untuk menambahkannya ke katalog."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama produk"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  placeholder="Masukkan kategori produk"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Input
                  id="description"
                  placeholder="Masukkan deskripsi singkat"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  placeholder="Masukkan detail produk"
                  value={newProduct.details}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      details: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Harga">Harga</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Masukkan Harga"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Gambar Produk</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewProduct({
                            ...newProduct,
                            image: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("image")?.click()}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Ambil Gambar
                  </button>
                  {newProduct.image && (
                    <span className="text-sm text-gray-500">
                      ✓ Gambar dipilih
                    </span>
                  )}
                </div>
                {newProduct.image && (
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover rounded border"
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button onClick={handleSubmitProduct}>
                {editingProduct ? "Perbarui Produk" : "Tambahkan Produk"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
