import {
  ShoppingCart,
  MessageCircle,
  ClipboardCheck,
  Calculator,
  CreditCard,
  Truck,
} from "lucide-react";

export function OrderFlow() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Memilih Produk",
      description: "Pilih produk yang Anda inginkan dari katalog kami",
    },
    {
      icon: MessageCircle,
      title: "Pesan via WhatsApp",
      description: "Hubungi kami melalui WhatsApp untuk melakukan pemesanan",
    },
    {
      icon: ClipboardCheck,
      title: "Konfirmasi Detail",
      description: "Konfirmasi detail pesanan, alamat, dan waktu pengambilan",
    },
    {
      icon: Calculator,
      title: "Hitung Total & Ongkir",
      description: "Kami akan menghitung total harga dan biaya pengiriman",
    },
    {
      icon: CreditCard,
      title: "Pembayaran",
      description: "Lakukan pembayaran sesuai metode yang disepakati",
    },
    {
      icon: Truck,
      title: "Proses Pengiriman",
      description: "Pesanan Anda akan diproses dan dikirim/siap diambil",
    },
  ];

  return (
    <section className="py-24 bg-red-500 mt-24 border-t-8 border-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">Alur Pemesanan</h2>
          <p className="text-muted-foreground">
            Ikuti langkah mudah berikut untuk memesan produk kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div
                  className="absolute -top-4 -left-4 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm"
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    minHeight: "32px",
                  }}
                >
                  {index + 1}
                </div>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="bg-gray-100 rounded-full mb-4 flex items-center justify-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      minWidth: "64px",
                      minHeight: "64px",
                    }}
                  >
                    <Icon className="h-8 w-8 text-gray-900" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
