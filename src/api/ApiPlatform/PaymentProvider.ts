import { ApiClient } from "../dataProvider";
import { PaymentMethod, PaymentResponse } from "../../useCases/entities"; // Adjust the import based on your entity definition
import { withApiMiddleware } from "../middleware";
import { apiRequest } from "../apiService";

class PaymentApiClient implements ApiClient {
  async handlePayment(paymentMethod: PaymentMethod): Promise<PaymentResponse> {
    try {
      const paymentEndpoint = "/checkout";

      console.log("request", paymentMethod);

      const paymentRequest = withApiMiddleware(async (token: string) => {
        const response = await apiRequest(
          paymentEndpoint,
          "POST",
          paymentMethod,
          token
        );
        return response as PaymentResponse;
      });

      return await paymentRequest();
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
    }
  }
}

export default PaymentApiClient;
