import { kv } from "@vercel/kv";

export default async function Cart({ params }) {
  const cart = await kv.get(params.user);
  return (
    <div>
      {cart?.map((item) => (
        <div key={item.id}>
          {item.id} - {item.quantity}
        </div>
      ))}
    </div>
  );
}