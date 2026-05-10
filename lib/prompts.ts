export const AAMC_CATEGORIES: Record<string, { name: string; section: string }> = {
  "1A": { name: "Structure and function of proteins and amino acids", section: "bio-biochem" },
  "1B": { name: "Transmission of genetic information from gene to protein", section: "bio-biochem" },
  "1C": { name: "Transmission of heritable information and genetic diversity", section: "bio-biochem" },
  "1D": { name: "Principles of bioenergetics and fuel molecule metabolism", section: "bio-biochem" },
  "2A": { name: "Assemblies of molecules, cells, and multicellular organisms", section: "bio-biochem" },
  "2B": { name: "Structure, growth, physiology, and genetics of prokaryotes and viruses", section: "bio-biochem" },
  "2C": { name: "Processes of cell division, differentiation, and specialization", section: "bio-biochem" },
  "3A": { name: "Structure and functions of the nervous and endocrine systems", section: "bio-biochem" },
  "3B": { name: "Structure and integrative functions of the main organ systems", section: "bio-biochem" },
  "4A": { name: "Translational motion, forces, work, energy, and equilibrium", section: "chem-physics" },
  "4B": { name: "Importance of fluids for circulation and gas exchange", section: "chem-physics" },
  "4C": { name: "Electrochemistry and electrical circuits", section: "chem-physics" },
  "4D": { name: "How light and sound interact with matter", section: "chem-physics" },
  "4E": { name: "Atoms, nuclear decay, electronic structure, and atomic chemical behavior", section: "chem-physics" },
  "5A": { name: "Unique nature of water and its solutions", section: "chem-physics" },
  "5B": { name: "Nature of molecules and intermolecular interactions", section: "chem-physics" },
  "5C": { name: "Separation and purification methods", section: "chem-physics" },
  "5D": { name: "Structure, function, and reactivity of biologically relevant molecules", section: "chem-physics" },
  "5E": { name: "Principles of chemical thermodynamics and kinetics", section: "chem-physics" },
  "6A": { name: "Sensing the environment", section: "psych-soc" },
  "6B": { name: "Making sense of the environment", section: "psych-soc" },
  "6C": { name: "Responding to the world", section: "psych-soc" },
  "7A": { name: "Individual influences on behavior", section: "psych-soc" },
  "7B": { name: "Social processes that influence human behavior", section: "psych-soc" },
  "7C": { name: "Attitude and behavior change", section: "psych-soc" },
  "8A": { name: "Self-identity", section: "psych-soc" },
  "8B": { name: "Social thinking", section: "psych-soc" },
  "8C": { name: "Social interactions", section: "psych-soc" },
  "9A": { name: "Understanding social structure", section: "psych-soc" },
  "9B": { name: "Demographic characteristics and processes", section: "psych-soc" },
  "10A": { name: "Social inequality", section: "psych-soc" },
}

export const DISCRETE_SYSTEM_PROMPT = `You are an MCAT question writer with expertise matching AAMC standards.
Generate exactly 5 discrete (standalone) MCAT-style questions on the given topic and AAMC category.

Requirements:
- Each question must be a complete standalone question (no passage required)
- Difficulty: match real AAMC exam difficulty (not too easy, not esoteric)
- 4 answer choices per question (A, B, C, D)
- One unambiguously correct answer per question
- Include one distractor that tests a common misconception
- After each question, provide the correct answer and a 2-3 sentence explanation:
  what the correct answer is, why each wrong answer fails
- Tag each question with the MCAT Reasoning Skill it tests (Skill 1, 2, 3, or 4)

Format each question exactly as:
**Q[N].** [question stem]
- A) [choice]
- B) [choice]
- C) [choice]
- D) [choice]

<details><summary>Answer</summary>
**Correct: [letter]** — [explanation covering why correct and why wrong answers fail]
**Skill:** [1-4] — [skill name]
</details>`

export const PASSAGE_SYSTEM_PROMPT = `You are an MCAT question writer with expertise matching AAMC standards.
Generate one MCAT-style passage with 5-6 associated questions on the given topic and AAMC category.

Requirements:
- Passage: 500-600 words, research/experimental scenario or scientific argument style
- Include a figure description or data table in the passage if appropriate (describe in text)
- Questions must require the passage to answer (not standalone)
- 4 answer choices per question (A, B, C, D)
- Mix of reasoning skills across questions (Skill 1-4)
- After each question, provide the correct answer and a 2-3 sentence explanation

Format:
# Passage: [descriptive title]

[passage text, 500-600 words]

---

**Q[N].** [question tied to passage]
- A) [choice]
- B) [choice]
- C) [choice]
- D) [choice]

<details><summary>Answer</summary>
**Correct: [letter]** — [explanation]
**Skill:** [1-4] — [skill name]
</details>`

export function buildUserPrompt(topic: string, category: string, qType: string): string {
  const cat = AAMC_CATEGORIES[category] ?? { name: 'General MCAT', section: 'general' }
  const formatDesc = qType === 'discrete' ? '5 discrete questions' : '1 passage with 5-6 questions'
  return `Topic: ${topic}\nAAMC Category: ${category} — ${cat.name}\nSection: ${cat.section}\n\nGenerate ${formatDesc} on this topic at authentic AAMC exam difficulty.`
}

export function buildOutputFile(topic: string, category: string, qType: string, content: string): string {
  const today = new Date().toLocaleDateString('en-CA')
  const cat = AAMC_CATEGORIES[category] ?? { name: 'General', section: 'general' }
  const scoreSlots = qType === 'discrete' ? '/5' : '/6'
  return `---
title: "Practice — ${topic} (${qType.charAt(0).toUpperCase() + qType.slice(1)})"
type: practice-generated
aamc-category: ${category}
section: ${cat.section}
generated: ${today}
score: "${scoreSlots}"
reviewed: false
tags: [mcat, practice, ${qType}, aamc-${category.toLowerCase()}]
---

# Practice: ${topic} — ${qType.charAt(0).toUpperCase() + qType.slice(1)}
**AAMC Category:** ${category} — ${cat.name}
**Generated:** ${today} | **Score:** ____${scoreSlots}

---

${content}`
}

export function buildSavePath(topic: string, qType: string): string {
  const today = new Date().toLocaleDateString('en-CA')
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `practice/generated/${today}-${slug}-${qType}.md`
}
