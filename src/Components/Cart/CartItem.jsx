"use client";

import { Trash2, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDisplayAttributes } from "@/Utils/getDisplayAttributes";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const displayAttributes = getDisplayAttributes(
    item.category,
    item.attributes
  );

  const itemTotal = item.price * item.quantity;

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -120 }}
        transition={{ duration: 0.25 }}

        /* 🔥 swipe to delete */
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -120) onRemove();
        }}

        className="
          relative
          flex gap-5
          p-5
          rounded-3xl
          border border-border
          bg-gradient-to-br
          from-white/70
          to-white/40
          backdrop-blur-xl
          shadow-md
          hover:shadow-xl
          hover:-translate-y-1
          transition
        "
      >
        {/* DELETE BUTTON */}
        <button
          onClick={onRemove}
          className="
            absolute top-3 right-3
            w-8 h-8
            flex items-center justify-center
            rounded-full
            text-gray-400
            hover:bg-red-50 hover:text-red-600
            transition
          "
        >
          <Trash2 size={16} />
        </button>

        {/* IMAGE */}
        <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-secondary/30">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 justify-between">

          {/* TOP */}
          <div>
            <h3 className="font-medium text-base tracking-tight">
              {item.name}
            </h3>

            {displayAttributes.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {displayAttributes.join(" • ")}
              </p>
            )}
          </div>

          {/* BOTTOM */}
          <div className="flex items-center justify-between mt-3">

            {/* 🔥 QTY with smooth animation */}
            <div className="flex items-center gap-2 border rounded-full px-3 py-1">

              <button onClick={onDecrease}>
                <Minus size={14} />
              </button>

              <motion.span
                key={item.quantity}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-medium w-6 text-center"
              >
                {item.quantity}
              </motion.span>

              <button onClick={onIncrease}>
                <Plus size={14} />
              </button>
            </div>

            {/* PRICE */}
            <motion.div
              key={itemTotal}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-base font-semibold"
            >
              ₹{itemTotal.toLocaleString()}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
