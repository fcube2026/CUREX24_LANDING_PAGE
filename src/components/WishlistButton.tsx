import { useState } from "react";
import WishlistModal from "./WishlistModal";

const WishlistButton = () => {

  const [open, setOpen] = useState(false);

  return (

    <div>

      {/* Button */}

      <button
        className="btn-primary"
        onClick={() => {
          console.log("Join clicked");
          setOpen(true);
        }}
      >
        Join Wishlist
      </button>

      {/* Modal */}

      {open && (
        <WishlistModal close={() => setOpen(false)} />
      )}

    </div>

  );

};

export default WishlistButton;