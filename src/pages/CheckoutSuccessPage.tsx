const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Payment Successful
        </h2>
        <p className="text-gray-700">
          Thank you for your payment. Your order has been successfully
          processed.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
