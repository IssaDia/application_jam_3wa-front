import { ApiClient } from "../dataProvider";
import { Product } from "../../useCases/entities";
import { withApiMiddleware } from "../middleware";
import { apiRequest } from "../apiService";

class PaymentApiClient implements ApiClient {
  async handlePayment(cart: Product[]): Promise<string> {
    try {
      const paymentEndpoint = "/checkout";

      const paymentRequest = withApiMiddleware(async (token: string) => {
        return await apiRequest(paymentEndpoint, "POST", { cart: cart }, token);
      });

      return await paymentRequest();
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
    }
  }
}

export default PaymentApiClient;
