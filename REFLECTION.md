```md
# Reflection on AI-Assisted Development

Using AI agents for this assignment changed both **how** I built the solution and **where** I spent my time.

## What I Learned

1. **Architecture-first prompts matter**  
   When I asked for “a backend with routes,” the agent tended to mix Express, domain, and DB logic. When I explicitly said “hexagonal architecture with `core/domain`, `core/application`, `ports`, and adapters,” the responses were much closer to what I needed. The quality of the architectural prompt had a huge impact.

2. **Agents are great at boilerplate, weaker at nuanced rules**  
   The tools did very well drafting:
   - TypeScript interfaces and DTOs
   - React components with Tailwind classnames
   - Basic repository and Express router structure  
   But they struggled with:
   - Precise FuelEU rules for pooling (no ship exits worse)
   - Correct percent difference and CB formulas on the first try

3. **Hexagonal boundaries need human enforcement**  
   Agents frequently tried to import Express or `pg` into the core layer. I had to refactor those suggestions and move side-effectful code back into adapters. This reinforced the idea that humans should guard the architecture and let agents fill in the details.

## Efficiency vs Manual Coding

- **Speed-ups**
  - Creating repetitive structures (ports, adapters, simple tests).
  - Generating first drafts of React tables and forms.
  - Suggesting Tailwind utility combinations to get a clean UI quickly.

- **Manual work still required**
  - Verifying formulas and CB logic.
  - Designing the layering of use cases and ports.
  - Making sure TypeScript strict mode passed across all modules.
  - Writing or adjusting tests to actually match the desired invariants.

Overall, I’d estimate **30–40% time saved** on boilerplate, while the core domain thinking and verification remained manual.

## Improvements for Next Time

- Use a dedicated **tasks file** (e.g., `tasks.md`) to feed the agent smaller, focused tasks instead of big monolithic prompts.
- Add **more automated tests** from the beginning and use the agent to generate test cases, not just implementations.
- Try a workflow where the agent first generates only **ports and domain models**, then in a second pass focuses on adapters, to keep cross-layer contamination low.

AI was most effective when I treated it as:
- A fast, opinionated junior dev for scaffolding and repetitive work.
- A code generator that I must review, not an authority on the domain rules.
