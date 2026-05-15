---
title: Chemical Kinetics & Equilibrium
type: topic-card
aamc-category: 5E
section: chem-physics
tier: 1
review-count: 0
last-reviewed:
next-review:
ease: new
score: 0/5
completion: 0%
tags: [mcat, aamc-5e, chem-physics, tier-1]
sources: [mcat-content-outline-2020]
---

# Chemical Kinetics & Equilibrium
**AAMC Category:** 5E — Principles of chemical thermodynamics and kinetics | **Section:** Chem/Physics | **Tier:** 1 | [[mcat-chem-physics-hub]]

## Core Concept
Kinetics describes the rate of chemical reactions; equilibrium describes where reactions end up. These are connected but distinct: a catalyst speeds up the approach to equilibrium without changing the equilibrium position. Rate laws are determined experimentally, not from stoichiometry. Le Chatelier's principle predicts how equilibrium shifts in response to perturbations. The MCAT heavily tests rate order determination from data tables, the effect of temperature on rate and equilibrium, and half-life in first-order reactions (critical for pharmacokinetics and radioactive decay).

## High-Yield Facts
- **Rate law**: rate = k[A]^m[B]^n; orders m and n determined experimentally (NOT from balanced equation)
- **Zero-order**: rate = k (constant, independent of [A]); units of k = M/s; half-life decreases as concentration falls
- **First-order**: rate = k[A]; units of k = s⁻¹; half-life t½ = 0.693/k (constant, independent of [A])
- **Second-order**: rate = k[A]²; units of k = M⁻¹s⁻¹; half-life increases as concentration falls
- **Overall reaction order** = sum of all exponents in the rate law
- **Arrhenius equation**: k = Ae^(−Ea/RT); higher temperature → larger k → faster rate
- Doubling temperature does NOT double rate; must use Arrhenius for quantitative change
- **Activation energy (Ea)**: energy barrier; catalyst lowers Ea, increasing k for both forward and reverse reactions
- **Catalyst**: lowers Ea; increases rate; does NOT change Keq, ΔG°, ΔH, or ΔS; NOT consumed in reaction
- **Keq = [products]/[reactants]** at equilibrium (each raised to stoichiometric coefficient power)
- Keq > 1: products favored; Keq < 1: reactants favored; Keq = 1: neither strongly favored
- **Le Chatelier's principle**: system shifts to oppose any imposed change
  - Add reactant → shift right (toward products)
  - Add product → shift left (toward reactants)
  - Remove product → shift right
  - Increase temperature → shift toward endothermic direction
  - Increase pressure (gas reaction) → shift toward side with fewer moles of gas
  - Inert gas added → no shift (partial pressures unchanged if constant volume)
- **Q (reaction quotient)**: same expression as Keq but at non-equilibrium concentrations
  - Q < Keq: reaction proceeds forward (toward products)
  - Q > Keq: reaction proceeds backward (toward reactants)
  - Q = Keq: at equilibrium

## Mnemonic
**"Kate Always Reads Le Chatelier"** — Kinetics (Arrhenius), Rate law (experimental), Le Chatelier (equilibrium shifts). For rate orders: **"Zero = constant, First = exponential decay (half-life!), Second = slows fastest"**.

## ⚡ Expert Shortcut
*Source: Khan Academy MCAT*
Le Chatelier's in four rules:
- Add something → reaction shifts to CONSUME it
- Remove something → reaction shifts to PRODUCE it
- Increase temperature → shift toward ENDOTHERMIC direction (treats heat like a reactant/product)
- Catalyst = faster equilibrium, SAME position (no change in Keq)

For rate order from data: hold one reactant constant and double the other. If rate doubles → first order in that reactant. If rate quadruples → second order. If rate unchanged → zero order. Apply separately to each reactant.

## Common Trap
⚠️ Increasing temperature increases BOTH the forward AND reverse rate constants (Arrhenius applies to both). The equilibrium shifts toward the endothermic direction because the endothermic rate constant increases MORE relative to baseline. Students incorrectly think only the forward rate increases, or that temperature shifts equilibrium toward the exothermic direction (wrong — it's the opposite). Also: a catalyst does NOT change Keq, ΔG°, equilibrium concentrations, or reaction thermodynamics — it only changes how fast equilibrium is reached.

---

## ✅ Understanding Checkpoints

**Q1.** The following data are collected for the reaction A + B → C:

| Experiment | [A] (M) | [B] (M) | Rate (M/s) |
|------------|---------|---------|------------|
| 1 | 0.10 | 0.10 | 2.0 × 10⁻³ |
| 2 | 0.20 | 0.10 | 4.0 × 10⁻³ |
| 3 | 0.10 | 0.20 | 2.0 × 10⁻³ |

Determine the rate law and overall order.
<details><summary>Answer</summary>
**Rate = k[A]; first order in A, zero order in B; overall first order.** Comparing Exp 1 and 2: [A] doubles, [B] constant → rate doubles (2.0 → 4.0 × 10⁻³) → first order in A. Comparing Exp 1 and 3: [B] doubles, [A] constant → rate unchanged → zero order in B. Rate law: rate = k[A]¹[B]⁰ = k[A]. k = rate/[A] = 2.0 × 10⁻³ / 0.10 = 0.02 s⁻¹.
</details>

**Q2.** Predict the shift in equilibrium for N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = −92 kJ/mol) when: (a) temperature is increased, (b) pressure is increased, (c) N₂ is added.
<details><summary>Answer</summary>
**(a) Shift LEFT (toward reactants).** The forward reaction is exothermic (ΔH < 0). Increasing temperature adds heat; Le Chatelier shifts the reaction to consume heat → toward the endothermic (reverse) direction → less NH₃ produced. This is why the Haber process uses moderate temperatures (compromise between yield and rate). **(b) Shift RIGHT (toward products).** Left side has 1 + 3 = 4 moles of gas; right has 2 moles. Increasing pressure favors fewer moles of gas → shift right → more NH₃. **(c) Shift RIGHT.** Adding N₂ (reactant) → system shifts to consume it → toward products → more NH₃.
</details>

**Q3.** A drug is eliminated from the body by first-order kinetics with k = 0.0693 h⁻¹. What is the half-life, and what fraction of the original dose remains after 30 hours?
<details><summary>Answer</summary>
**t½ = 10 hours; after 30 hours, 1/8 (12.5%) remains.** t½ = 0.693/k = 0.693/0.0693 = 10 hours. After 30 hours = 3 half-lives: (1/2)³ = 1/8 = 12.5% of original dose remaining. First-order kinetics is the most clinically relevant — most drug elimination, radioactive decay, and many enzymatic reactions (when substrate << Km) follow first-order kinetics.
</details>

**Q4.** A catalyst is added to a reaction at equilibrium. What happens to the forward rate, reverse rate, and equilibrium concentrations?
<details><summary>Answer</summary>
**Both forward and reverse rates increase equally; equilibrium concentrations do NOT change.** A catalyst lowers Ea for both the forward and reverse reactions by the same amount, so both rate constants increase by the same factor. The ratio kf/kr = Keq (unchanged). Therefore, the system remains at equilibrium — the same concentrations are maintained — but the rates of both forward and reverse reactions are faster. Equilibrium is reached more quickly from non-equilibrium starting conditions. No change in Keq, ΔG°, ΔH, or ΔS.
</details>

**Q5.** For the reaction A ⇌ B, Keq = 100. If Q = 10 at the start of a reaction, in which direction does the reaction proceed, and approximately what percentage of A will be converted to B at equilibrium?
<details><summary>Answer</summary>
**Reaction proceeds forward (toward B); ~99% of A is converted to B at equilibrium.** Q (10) < Keq (100) → reaction proceeds toward products (forward). At equilibrium, [B]/[A] = 100. If we start with 1 mol A: at equilibrium, x/(1−x) = 100 → x ≈ 0.99. So ~99% A → B. The large Keq (>>1) means products are strongly favored. Note: Keq = 100 corresponds to ΔG° = −RTln(100) ≈ −11.4 kJ/mol at 298 K — moderately favorable but not enormous.
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
