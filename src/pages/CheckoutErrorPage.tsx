const CheckoutErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Payment Error
        </h2>
        <p className="text-gray-700">
          Oops, there was an error with your payment. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default CheckoutErrorPage;
