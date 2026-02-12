export interface HotspotData {
  id: string;
  label: string;
  desc: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const sceneHotspots: HotspotData[] = [
  { id: "apparatus", label: "Apparatus", desc: "Noise, vehicle movement, and backing hazards. Always maintain awareness of apparatus positioning and movement on scene.", x: 2, y: 30, w: 20, h: 55 },
  { id: "smoke", label: "Smoke", desc: "Inhalation hazard. Always ensure proper use of SCBA before entering the hazard zone. Smoke contains toxic gases including carbon monoxide and hydrogen cyanide.", x: 25, y: 0, w: 50, h: 35 },
  { id: "structure", label: "Involved Structure", desc: "Burn and other injury risks. Ensure proper use of PPE at all times. Watch for signs of structural collapse, falling debris, and flashover conditions.", x: 25, y: 20, w: 50, h: 50 },
  { id: "hose", label: "Hose on Ground", desc: "Trip hazard. Charged hose lines on the ground create significant trip hazards. Be aware of hose placement and step over carefully.", x: 5, y: 80, w: 90, h: 18 },
];

export const ppeHotspots: HotspotData[] = [
  { id: "helmet", label: "Helmet", desc: "Helmet meets NFPA standard and chin strap is in place. Check for cracks, heat damage, and ensure face shield/goggles are functional.", x: 30, y: 0, w: 40, h: 14 },
  { id: "scba-mask", label: "SCBA Facepiece", desc: "Facepiece properly fitted with no lens damage. Seal has no dry rot, tears, or other damage. Perform positive/negative pressure checks.", x: 30, y: 13, w: 40, h: 12 },
  { id: "coat-seams", label: "Turnout Coat", desc: "Seams not split, stitching not frayed. No rips, tears, or damage to shell. Reflective trim must be intact and visible.", x: 15, y: 25, w: 70, h: 18 },
  { id: "vapor-barrier", label: "Vapor Barrier & Closures", desc: "Vapor barrier intact with no damage. Zippers, Velcro, and other closures operate properly. Check thermal liner is properly attached.", x: 20, y: 42, w: 60, h: 10 },
  { id: "gloves", label: "Gloves", desc: "Gloves are NFPA-compliant for structural firefighting, fit properly, and are undamaged.", x: 10, y: 48, w: 25, h: 10 },
  { id: "pants", label: "Turnout Pants", desc: "Seams not split, stitching not frayed. No rips, tears, damage to shell. Suspenders secure and knee pads in place.", x: 20, y: 55, w: 60, h: 22 },
  { id: "boots", label: "Boots", desc: "Boots are NFPA-compliant and free of damage. Tread is sufficient to prevent slipping.", x: 20, y: 82, w: 60, h: 18 },
];
