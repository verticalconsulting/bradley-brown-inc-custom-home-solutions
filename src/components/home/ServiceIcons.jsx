import React from "react";

/* Custom architectural line-art icons for Bradley Brown Inc. services.
   Hand-crafted SVGs — not generic library icons. Consistent 1.6 stroke,
   rounded line caps, 24×24 viewBox, currentColor for theming. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// Custom Home — detailed house with roof pitch, door, and window
export function CustomHomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M3 11.5 L12 4 L21 11.5" />
      <path d="M5 10.5 V20 H19 V10.5" />
      <path d="M10 20 V14.5 H14 V20" />
      <path d="M16.5 12.5 V14.5" />
      <path d="M16 20 V16.5 H18.5 V20" />
      <path d="M12 4 V7.5" />
    </svg>
  );
}

// Kitchen — countertop with cabinetry, sink, and faucet
export function KitchenIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M3 8 H21 V10 H3 Z" />
      <path d="M3 10 V20 H21 V10" />
      <path d="M8 10 V20" />
      <path d="M15 10 V20" />
      <path d="M11 13 V16 M10 13 H12" />
      <path d="M11 12.5 C11 11 12 10 12.5 9.5" />
      <path d="M11 18 V19" />
    </svg>
  );
}

// Bathroom — bathtub with faucet and shower
export function BathroomIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M3 13 H21 V14.5 C21 15.5 20 16.5 19 16.5 H5 C4 16.5 3 15.5 3 14.5 Z" />
      <path d="M3 16.5 L4.5 19.5 H19.5 L21 16.5" />
      <path d="M6 13 V9 C6 8 6.5 7 7.5 7 H8.5 C9 7 9.5 7.5 9.5 8 V8.5" />
      <path d="M5 10 H10.5" />
      <path d="M9 11.5 V12.5" />
      <path d="M7 11.5 V12.5" />
    </svg>
  );
}

// Room Addition — house with a dashed extension wing
export function RoomAdditionIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M3 11 L10 5 L17 11" />
      <path d="M5 9.5 V18 H12 V11" />
      <path d="M7.5 18 V14 H9.5 V18" />
      <path d="M12 18 H20 V12" strokeDasharray="1.5 1.5" />
      <path d="M14 18 V14.5 H17 V18" strokeDasharray="1.5 1.5" />
      <path d="M17 12 L20 12 L20 10 L15.5 6.5" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

// Outdoor Living — patio with pergola and fire pit
export function OutdoorLivingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M3 9 L12 5 L21 9" />
      <path d="M4 9 V20 M8 8 V20 M16 8 V20 M20 9 V20" />
      <path d="M4 12 H20" />
      <path d="M12 13.5 C10 13.5 9.5 16 9.5 17.5 C9.5 18.5 10.5 19 12 19 C13.5 19 14.5 18.5 14.5 17.5 C14.5 16 14 13.5 12 13.5 Z" />
      <path d="M12 13.5 V12" />
    </svg>
  );
}

// Barndominium — barn-style structure with gambrel roof
export function BarndominiumIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M3 12 L6 6 L12 4 L18 6 L21 12" />
      <path d="M4 12 V20 H20 V12" />
      <path d="M3 12 L6 8 M21 12 L18 8" />
      <path d="M10 20 V14 H14 V20" />
      <path d="M10 17 H14" />
      <path d="M6.5 20 V16 H8.5 V20" />
      <path d="M15.5 20 V16 H17.5 V20" />
    </svg>
  );
}

// Home Renovation — house with a paint roller and trowel
export function HomeRenovationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M3 11.5 L11 4.5 L19 11.5" />
      <path d="M5 10 V19 H13" />
      <path d="M7.5 19 V14.5 H10 V19" />
      <path d="M15 14 L19 10 L20.5 11.5 L16.5 15.5 L15 16 Z" />
      <path d="M15 16 L14 18 L12 16 L13 15" />
      <path d="M15.5 14 L17.5 12" />
    </svg>
  );
}

export const customServiceIcons = {
  "custom-home-building": CustomHomeIcon,
  "kitchen-remodeling": KitchenIcon,
  "bathroom-remodeling": BathroomIcon,
  "room-additions": RoomAdditionIcon,
  "outdoor-living": OutdoorLivingIcon,
  barndominiums: BarndominiumIcon,
  renovations: HomeRenovationIcon,
};