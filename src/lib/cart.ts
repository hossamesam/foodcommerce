import { TCart } from "@/redux/features/cart/cartSlice";

export default function getCartQuantity(cart: TCart[]) {

    return cart.reduce((quantity, item) => {
        return item.quantity! + quantity
    }, 0)
}


export function getItemQuantity(id: string, cart: TCart[]) {
    return cart.find((item) => item.id === id)?.quantity || 0
}




export const getSubTotal = (cart: TCart[]) => {
    return cart.reduce((total, cartItem) => {
        // item.basePrice + item.size.price + extra prices
        const extrasTotal = cartItem.extras?.reduce(
            (sum, extra) => sum + (extra.Price || 0),
            0
        );

        const itemTotal =
            cartItem.basePrice + (extrasTotal || 0) + (cartItem.sizes?.Price || 0);

        return total + itemTotal * cartItem.quantity!;
    }, 0);
};
export const deliveryFee = 5;

export const getTotalAmount = (cart: TCart[]) => {
    return getSubTotal(cart) + deliveryFee;
};