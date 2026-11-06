/** Fixed prices. The client cannot choose an amount. */
export const reservedPrices = {
  USD: { minor: 29_900, label: "$299", detail: "Cards worldwide" },
  INR: { minor: 2_685_000, label: "₹26,850", detail: "UPI, netbanking, wallets, Indian cards" },
} as const;

export type ReservedCurrency = keyof typeof reservedPrices;

export function isReservedCurrency(value: string): value is ReservedCurrency {
  return value === "USD" || value === "INR";
}
