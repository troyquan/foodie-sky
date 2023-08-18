import { cartItemModel } from ".";

export default interface shoppingCartModel {
  id?: number;
  userId?: string;
  cartItems?: cartItemModel[];
  cartTotal?: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;
  isCartOpen: boolean;
}
