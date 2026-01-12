# Unified Home Loading Plan

## Objective

Eliminate double loading indicators on the home page. Show a single `LoadingQuote` while waiting for both the logo and social links to be ready, then reveal the entire home page at once.

## Problem Analysis

- **Current behavior**: Route-level `Suspense` shows `LoadingQuote` → HomePage loads → `SocialLinks` lazy-loads with its own `Suspense` spinner → users see two separate loading states.
- **Root cause**: Staggered async operations (lazy page chunk + lazy button chunk + asset loads) with separate Suspense boundaries.
- **Impact**: UX feels like "loading again" when buttons appear; inconsistent reveal.

## Solution Approach

- Add a single coordination gate `homeReady` in `Main.tsx`.
- Wait for both `logoReady` (from `HomeHero`) and `socialReady` (from `SocialLinks`) before revealing content.
- Show one `LoadingQuote` until `homeReady` is `true`.
- Remove internal `Suspense` fallback in `SocialLinks` to prevent secondary spinner.
- Keep `SocialLinks` lazy-loaded (minimal bundle impact).

## Implementation Steps

### 1. Add `homeReady` Coordination in `src/features/home/components/HomePage/Main.tsx`

**Changes**:

```tsx
// Add state for coordination
const [logoReady, setLogoReady] = useState(false);
const [socialReady, setSocialReady] = useState(false);
const [homeReady, setHomeReady] = useState(false);

// Effect to combine both readiness signals
useEffect(() => {
  if (logoReady && socialReady) {
    setHomeReady(true);
  }
}, [logoReady, socialReady]);

// Pass callbacks to child components
<HomeHero onLogoReady={() => setLogoReady(true)} ... />
<SocialLinks onReady={() => setSocialReady(true)} variant={socialVariant} />
```

**Rationale**:

- `logoReady` signals logo asset loaded.
- `socialReady` signals SocialLinks component mounted (chunk loaded).
- `homeReady` ensures both are ready before rendering content.
- Prevents layout shift from sequential reveals.

### 2. Add `onLogoReady` Callback to `src/features/home/components/HomePage/HomeHero.tsx`

**Changes**:

```tsx
// Add prop
interface HomeHeroProps {
  // ... existing props
  onLogoReady?: () => void;
}

// Call callback on logo load
<img
  ...
  onLoad={() => {
    setLogoLoaded(true);
    onLogoReady?.();
  }}
/>
```

**Rationale**:

- Extends existing `logoLoaded` signal to parent.
- Minimal change to existing behavior.

### 3. Add `onReady` Callback to `src/features/home/components/SocialLinks/SocialLinks.tsx`

**Changes**:

```tsx
// Add prop
interface SocialLinksProps {
  variant?: 'light' | 'dark';
  onReady?: () => void;
}

// Call callback on mount
useEffect(() => {
  onReady?.();
}, [onReady]);

// Remove or simplify Suspense fallback
<Suspense fallback={null}>
  <SocialLinks ... />
</Suspense>
```

**Rationale**:

- Signals parent that chunk is loaded and component is ready.
- `fallback={null}` prevents secondary spinner (or use minimal placeholder).
- Keeps lazy loading for bundle optimization.

### 4. Add Single Loading Fallback in `src/features/home/components/HomePage/Main.tsx`

**Changes**:

```tsx
// Early return with single loader
if (!homeReady) {
  return (
    <LoadingQuote
      className="min-h-screen bg-[#c9ebf5]"
      quoteClassName="text-gray-700"
      authorClassName="text-gray-500"
      spinnerClassName="border-b-2 border-gray-600"
    />
  );
}

// Only render full content when ready
return (
  <div className="relative h-screen overflow-hidden bg-[#c9ebf5]">{/* ... full content ... */}</div>
);
```

**Rationale**:

- Single loading state for entire home page.
- Consistent styling with page background.
- Eliminates visible "loading again" experience.

### 5. Verification

**Manual Testing**:

1. Run development server: `pnpm run dev`
2. Navigate to `/`
3. Observe:
   - **Expected**: `LoadingQuote` appears once → full home page (hero + buttons) appears simultaneously.
   - **Unacceptable**: Any secondary spinner or sequential reveals.

**Optional Automation** (if test infrastructure exists):

- Add integration test checking for single loader presence.
- Screenshot comparison for consistent reveal.

## Files Modified

- `src/features/home/components/HomePage/Main.tsx` - Add coordination logic and early return
- `src/features/home/components/HomePage/HomeHero.tsx` - Add `onLogoReady` callback
- `src/features/home/components/SocialLinks/SocialLinks.tsx` - Add `onReady` callback, remove fallback

## Files Unchanged (no changes needed)

- `src/App.tsx` - Existing route-level Suspense is fine (handles initial page load)
- `src/shared/components/ui/LoadingQuote.tsx` - Reused as-is

## Success Criteria

- **Functional**:
  - Exactly one `LoadingQuote` shown on initial load.
  - Home page (logo + search bar + buttons) appears together.
  - No visible secondary spinners during button rendering.
- **Observable**:
  - No "loading again" flicker when buttons appear.
  - Smooth, single reveal transition.
- **Pass/Fail**:
  - Clear single loader → full page transition.
  - No console errors.

## Rollback Plan

If issues arise:

1. Revert changes to all three modified files.
2. Restore original Suspense structure.
3. Keep existing behavior (double loaders) as safe fallback.

## Notes

- **Bundle Impact**: Negligible (lazy loading preserved).
- **Performance**: Slightly better (eliminates re-render during secondary load).
- **Accessibility**: Improved (clearer loading state, fewer layout shifts).
- **Future Enhancements**:
  - Consider replacing lazy loading of SocialLinks if bundle impact is acceptable.
  - Add transition animation for smoother reveal.
  - Monitor analytics for user engagement impact.
