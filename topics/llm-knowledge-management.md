---
title: LLM Knowledge Management
type: topic
created: 2026-05-09
updated: 2026-05-09
tags: [llm, knowledge-management, rag, wiki, personal-knowledge-base]
sources: [llm-wiki-karpathy]
---

# LLM Knowledge Management

Approaches for using LLMs to build and maintain personal or organizational knowledge bases.

## The Compounding Wiki Approach

[[andrej-karpathy]]'s [[llm-wiki-pattern]] argues that persistent, LLM-maintained wikis outperform repeated RAG queries for personal knowledge bases. The argument: synthesis is expensive and lossy when rederived on every query. If an LLM performs synthesis once (during ingest) and maintains it incrementally, the knowledge base compounds — each new source can reference and update prior understanding rather than starting fresh.

This wiki itself is an implementation of the pattern.

## Contrast: Retrieval-Augmented Generation (RAG)

RAG retrieves relevant chunks from raw documents and synthesizes answers at query time. Advantages: always up-to-date with the raw source, no maintenance burden. Disadvantages: synthesis is not persistent, cross-document connections are rederived each time, and quality degrades as the corpus grows without curation.

## Key Tensions

- **Human vs. LLM curation**: Community consensus from the Karpathy Gist discussion is that human curation is superior for editorial oversight, but humans abandon maintenance at scale. LLMs handle the maintenance burden; humans set the schema and review lint reports.
- **"Wiki" as a term**: Debate over whether LLM-generated markdown qualifies as a wiki (traditionally implying human collaborative editing). Defenders argue the term applies to any linked, navigable knowledge structure.
- **Provenance and trust**: LLM-synthesized claims can drift from sources. Span-level citations and lint operations are partial mitigations.
