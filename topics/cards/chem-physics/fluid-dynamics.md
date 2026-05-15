---
title: Fluid Dynamics & Circulatory Physics
type: topic-card
aamc-category: 4B
section: chem-physics
tier: 1
review-count: 0
last-reviewed:
next-review:
ease: new
score: 0/5
completion: 0%
tags: [mcat, aamc-4b, chem-physics, tier-1]
sources: [mcat-content-outline-2020]
---

# Fluid Dynamics & Circulatory Physics
**AAMC Category:** 4B — Importance of fluids for circulation and gas exchange | **Section:** Chem/Physics | **Tier:** 1 | [[mcat-chem-physics-hub]]

## Core Concept
Fluid dynamics governs how liquids and gases move through vessels — a critical foundation for understanding cardiovascular physiology. Bernoulli's principle shows that pressure and velocity trade off in flowing fluids. Poiseuille's Law reveals that vessel radius is the dominant determinant of resistance (r⁴ dependence). The continuity equation explains why blood slows dramatically in capillaries despite high aortic velocity. These principles directly explain vasoconstriction, aneurysms, and turbulent flow in diseased vessels.

## High-Yield Facts
- **Bernoulli equation**: P + ½ρv² + ρgh = constant (along a streamline, ideal fluid)
- Higher velocity → lower pressure (Bernoulli); lower velocity → higher pressure
- **Continuity equation**: A₁v₁ = A₂v₂ (conservation of flow rate; narrower tube = faster flow)
- **Poiseuille's Law**: Q = πr⁴ΔP / 8ηL (flow rate proportional to r⁴)
  - Doubling radius → 16× increase in flow (2⁴ = 16)
  - Halving radius → 1/16 the flow
- **Resistance**: R = 8ηL / πr⁴; resistance ∝ L/r⁴
- **Vascular resistance hierarchy**: arterioles have the highest resistance (small radius = dominant control of flow)
- **Total cross-sectional area**: capillaries >> aorta; therefore capillary velocity << aortic velocity
- **Hydrostatic pressure**: P = ρgh (pressure increases with depth; h = depth below surface)
- **Absolute pressure**: P_abs = P_atm + ρgh
- **Gauge pressure**: P_gauge = ρgh (pressure above atmospheric)
- **Laminar vs. turbulent flow**: laminar = smooth, parallel layers; turbulent when Reynolds number Re > 2000
- Re = ρvd/η (density × velocity × diameter / viscosity)
- **Turbulent flow** produces sounds (heart murmurs, bruits in stenosed arteries)
- **Aneurysm**: widened vessel → flow slows (continuity) → pressure rises (Bernoulli) → risk of rupture

## Mnemonic
**"When the tube is narrow, flow is fast and pressure is low"** — Bernoulli and continuity together: narrowing accelerates flow and drops pressure. Wide tube: slow flow, high pressure.

## ⚡ Expert Shortcut
*Source: Blueprint MCAT*
Three rules to solve any circulatory physics problem:
1. **Narrowing → faster flow** (continuity: A decreases, v increases)
2. **Faster flow → lower pressure** (Bernoulli: kinetic energy up, pressure energy down)
3. **Radius is king** (Poiseuille: r⁴ means a small change in radius has an enormous effect on resistance and flow)

Arterioles have highest resistance because of small radius — r⁴ makes radius the dominant factor. Capillaries are slow because total cross-sectional area is enormous, not because of resistance. Increasing heart rate does NOT decrease vessel resistance — resistance is a property of the vessel geometry.

## Common Trap
⚠️ Increasing heart rate does NOT directly decrease vessel resistance. Resistance is a property of the vessel (radius, length, viscosity) — not of flow rate or heart rate. Vasodilation (increase in r) dramatically reduces resistance. Students confuse "blood flows faster" with "resistance decreased" — they are not the same. Also: turbulent flow is more likely at HIGH velocity and LOW viscosity (thin blood), not in slow-flowing capillaries.

---

## ✅ Understanding Checkpoints

**Q1.** A pipe narrows from cross-sectional area 10 cm² to 2 cm². If fluid enters at 1 m/s, what is the velocity in the narrow section? What happens to pressure?
<details><summary>Answer</summary>
**Velocity = 5 m/s; pressure decreases.** By continuity: A₁v₁ = A₂v₂ → (10)(1) = (2)(v₂) → v₂ = 5 m/s. By Bernoulli: increased velocity means decreased pressure (kinetic energy increases, pressure energy decreases). This is the Venturi effect — used in atomizers, carburetors, and clinically in understanding stenotic arteries where high velocity/low pressure can cause vessel collapse.
</details>

**Q2.** An arteriole's radius is reduced by half due to vasoconstriction. By what factor does blood flow through it change?
<details><summary>Answer</summary>
**Flow decreases by a factor of 16.** Poiseuille's Law: Q ∝ r⁴. If r → r/2, then Q ∝ (r/2)⁴ = r⁴/16. Flow drops to 1/16 of its original value. Equivalently, resistance increases 16-fold (R ∝ 1/r⁴). This is why small changes in arteriolar radius produce dramatic effects on blood pressure and organ perfusion — vasodilation/constriction is the primary mechanism of blood flow regulation.
</details>

**Q3.** The aorta has a cross-sectional area of ~5 cm² and blood velocity of ~20 cm/s. The total cross-sectional area of all capillaries combined is ~5000 cm². Estimate capillary blood velocity.
<details><summary>Answer</summary>
**Capillary velocity ≈ 0.02 cm/s (1000× slower than aorta).** By continuity (applied to the entire vascular system): total flow = A_aorta × v_aorta = A_capillaries × v_capillaries. So v_capillaries = (5 × 20) / 5000 = 100/5000 = 0.02 cm/s. This slow velocity is essential — it maximizes time for gas and nutrient exchange across capillary walls. The slowness comes from the enormous total cross-sectional area, not from high resistance.
</details>

**Q4.** A diver descends to 10 meters below the ocean surface (ρ_seawater ≈ 1025 kg/m³, g = 10 m/s²). What is the gauge pressure at that depth?
<details><summary>Answer</summary>
**Gauge pressure = 102,500 Pa ≈ 1 atm.** P_gauge = ρgh = (1025)(10)(10) = 102,500 Pa ≈ 1 atm. This means total (absolute) pressure at 10 m depth is ~2 atm (1 atm atmospheric + 1 atm from water). Every 10 m of seawater adds approximately 1 atm of pressure. This is clinically relevant for decompression sickness — dissolved nitrogen increases with depth and pressure.
</details>

**Q5.** Under what conditions is turbulent flow most likely to develop in blood vessels, and what clinical finding does it produce?
<details><summary>Answer</summary>
**Turbulent flow is most likely at high velocity, large vessel diameter, low viscosity, or high density** — when Reynolds number Re = ρvd/η exceeds ~2000. Clinically: stenotic (narrowed) heart valves create high-velocity jets → turbulent flow → audible heart murmurs. Anemia (low viscosity due to fewer RBCs) can cause flow murmurs. Atherosclerotic plaques create turbulence at bifurcations. Turbulent flow is less efficient (requires more pressure to maintain the same flow) and can damage vessel walls.
</details>

**My Score:** ___/5

---

## 🔁 Reinforcement Schedule
| Review # | Hard | Good | Easy |
|----------|------|------|------|
| 1st | Day +1 | Day +3 | Day +7 |
| 2nd | Day +3 | Day +7 | Day +14 |
| 3rd | Day +7 | Day +14 | Day +28 |
| 4th+ | Day +7 | Day +21 | Test day |

**Last reviewed:** ___  **Next review:** ___  **Review count:** ___
