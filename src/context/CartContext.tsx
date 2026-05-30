"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartLine, Size } from "@/lib/types";

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: "add"; line: CartLine }
  | { type: "remove"; productId: string; color: string; size: Size }
  | { type: "qty"; productId: string; color: string; size: Size; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; state: CartState };

function key(l: { productId: string; color: string; size: Size }) {
  return `${l.productId}__${l.color}__${l.size}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const existing = state.lines.find(
        (l) => key(l) === key(action.line)
      );
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            key(l) === key(action.line)
              ? { ...l, qty: l.qty + action.line.qty }
              : l
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "remove":
      return {
        lines: state.lines.filter(
          (l) => key(l) !== key(action)
        ),
      };
    case "qty":
      return {
        lines: state.lines
          .map((l) =>
            key(l) === key(action) ? { ...l, qty: Math.max(1, action.qty) } : l
          ),
      };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  add: (line: CartLine) => void;
  remove: (productId: string, color: string, size: Size) => void;
  setQty: (productId: string, color: string, size: Size, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const LS_KEY = "indigo_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.lines)) {
          dispatch({ type: "hydrate", state: parsed });
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const itemCount = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.qty, 0),
    [state.lines]
  );
  const subtotal = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
    [state.lines]
  );

  const value: CartContextValue = {
    lines: state.lines,
    itemCount,
    subtotal,
    add: (line) => {
      dispatch({ type: "add", line });
      setIsOpen(true);
    },
    remove: (productId, color, size) =>
      dispatch({ type: "remove", productId, color, size }),
    setQty: (productId, color, size, qty) =>
      dispatch({ type: "qty", productId, color, size, qty }),
    clear: () => dispatch({ type: "clear" }),
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
