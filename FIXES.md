# Fixes for Icon Import Issues

## Problem
The landing page was showing a blank page with the following error in the console:
```
Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/lucide-react.js?v=c82b73ca' does not provide an export named 'Handshake'
```

## Solution
We identified that some of the icons being imported from lucide-react were either not available or had different names. We made the following changes:

1. Removed the `Handshake` icon import as it's not available in the current version of lucide-react
2. Changed `BrainCircuit` to `Brain` 
3. Changed `Globe2` to `Globe`

## Files Modified
- `biz_bot.jsx`: Updated icon imports and references
- `src/main.jsx`: Restored to use the original BizBotLanding component

## Verification
After making these changes, the landing page should load correctly without icon import errors.

## Additional Notes
If you still encounter issues, you may need to:
1. Clear the Vite cache: `rm -rf node_modules/.vite` (or delete the folder manually)
2. Reinstall dependencies: `npm install`
3. Restart the development server: `npm run dev`