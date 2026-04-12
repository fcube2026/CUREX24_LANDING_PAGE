import { useState } from "react";
import WishlistModal from "./WishlistModal";

const WishlistButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        Join Wishlist
      </button>

      {open && <WishlistModal close={() => setOpen(false)} />}
    </div>
  );
};

export default WishlistButton;