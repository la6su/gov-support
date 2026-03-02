# GovSupport Portal

## 1. Project Goal

Build a production-ready frontend application using React + TypeScript with scalable architecture.

The goal is to simulate a real-world enterprise project with:
- Clean architecture (FSD)
- Scalable API layer
- State management (MobX)
- Testing strategy
- Performance optimization
- Production mindset

This project is designed for senior-level frontend interview preparation.

---

## 2. MVP Scope

### Features:
- User authentication (mocked)
- Benefits list
- Benefit details page
- Apply for benefit
- Applications history
- User profile

---

## 3. Tech Stack

- React (latest stable)
- TypeScript (strict mode)
- Vite
- React Router
- MobX
- Axios
- ESLint (flat config)
- Prettier
- Vitest
- React Testing Library
- MSW (mock API)

No SSR.
No microfrontends.
No overengineering in initial phase.

---

## 4. Architecture

We use Feature-Sliced Design (FSD):

src/
- app/
- pages/
- processes/
- features/
- entities/
- shared/

### Layer Rules:
- Import only downwards
- No cross-layer violations
- Public API per slice
- Business logic separated from UI

---

## 5. Architectural Principles

### SOLID
- Stores manage state only
- API layer isolated from UI
- Clear responsibility boundaries

### DRY
- Avoid duplication of business logic

### KISS
- No premature optimization
- No unnecessary abstractions

### Composition > Inheritance
- Providers composition
- Feature-driven UI composition

---

## 6. State Management Strategy

- MobX domain-driven stores
- Separate UI state and domain state
- No global god-store

---

## 7. API Strategy

- Centralized API client
- Error normalization
- Typed responses
- Retry & cancellation support (future phase)

---

## 8. Testing Strategy

- Unit tests for stores
- Component tests with RTL
- Mock API via MSW
- Minimal snapshot usage

---

## 9. Performance Strategy

- Route-based code splitting
- Lazy loading
- Bundle analysis
- Avoid unnecessary re-renders

---

## 10. Development Process

Work iteratively:
1. Architecture first
2. Implement in small steps
3. Review decisions
4. Refactor if needed
5. Maintain production quality
