# flushjohn-web: Serialization/Deserialization Issues

## Issues Found

### 1. **Inconsistent Naming** (`src/utils/serializers.ts`)
- ❌ `serializePhoneNumber` → Should be `formatPhoneNumber`
- ❌ `serializeContactData` → Should be `formatContactData`
- ✅ `normalize*` functions are fine (but inconsistent with "format" terminology)
- ⚠️ `deserializeDate` - **SPECIAL CASE**: Used by DateInput component (react-datepicker needs Date objects)

### 2. **Unnecessary Deserialization** (`src/utils/dataTransformers.ts`)
- ❌ `deserializeDataFromApi` - Converts ISO date strings to Date objects
  - **Question**: Is this needed? DateInput already uses `deserializeDate` directly
  - **Recommendation**: Remove if DateInput handles it, or keep only for date fields

### 3. **Function Naming** (`src/utils/dataTransformers.ts`)
- ❌ `serializeDataForApi` → Should be `formatDataForApi`

### 4. **No ObjectId Serializer**
- ✅ Good! No ObjectId serializer found (ObjectIds already strings)

## Files to Update

1. **`src/utils/serializers.ts`**
   - Rename `serializePhoneNumber` → `formatPhoneNumber`
   - Rename `serializeContactData` → `formatContactData`
   - Keep `deserializeDate` (needed for DateInput component)
   - Consider renaming `normalize*` → `format*` for consistency

2. **`src/utils/dataTransformers.ts`**
   - Rename `serializeDataForApi` → `formatDataForApi`
   - Evaluate `deserializeDataFromApi` - remove if unnecessary
   - Update import: `serializeContactData` → `formatContactData`

3. **`src/utils/apiClient.ts`**
   - Update imports: `serializeDataForApi` → `formatDataForApi`
   - Update function calls

4. **`src/components/FormControls/DateInput/index.tsx`**
   - Keep `deserializeDate` usage (react-datepicker needs Date objects)

## Special Considerations

### `deserializeDate` - Keep or Remove?

**Current Usage:**
- DateInput component uses `deserializeDate` to convert ISO strings to Date objects
- react-datepicker requires Date objects, not ISO strings

**Options:**
1. **Keep `deserializeDate`** - Only for DateInput component (component-level conversion)
2. **Remove `deserializeDataFromApi`** - Let DateInput handle date conversion directly

**Recommendation:** Keep `deserializeDate` but rename to `parseDateForInput` or `formatDateForInput` for clarity. Remove `deserializeDataFromApi` if it's only used for dates.

## Summary

- **Rename**: 3 functions (serialize → format)
- **Remove**: Possibly `deserializeDataFromApi` (if only used for dates)
- **Keep**: `deserializeDate` (needed for DateInput, but consider renaming)
- **No ObjectId issues**: ✅ Already clean
