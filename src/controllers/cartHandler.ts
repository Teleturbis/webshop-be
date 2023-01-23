const CartSchema = require('../models/CartSchema');

export async function update(req: any) {
  const { id, title, price, image, quantity, user } = req;
  const cart = await CartSchema.findOne({ id: user.id });
  const item = { id, title, price, image, quantity };

  if (cart) {
    const items = cart.items;
    const itemIndex = items.findIndex((item: any) => item.id === id);

    if (itemIndex >= 0 && quantity == 0) {
      items.splice(itemIndex, 1);
    }

    if (itemIndex === -1 && quantity > 0) {
      items.push(item);
    } else {
      items[itemIndex].quantity++;
    }

    await CartSchema.updateOne({ id: user.id }, { items });
  } else {
    await CartSchema.create({ id: user.id, items: [item] });
  }

  return await CartSchema.findOne({ id: user.id });
}
