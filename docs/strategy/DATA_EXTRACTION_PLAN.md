# Data Extraction Plan - Create Dedicated Data Files

This document lists all data that is currently mixed with business logic and should be extracted into dedicated data files across all three repositories.

---

## 📁 **FLUSHJOHN-API**

### 1. **State Sales Tax Rates** ⚠️ **HIGH PRIORITY**

**Location:** `features/salesAssist/services/salesAssistService.js` (lines 21-72)
**Issue:** Large tax rate object (52 states) mixed with business logic
**Data:**

```javascript
const STATE_TAX_RATES = {
  TX: 8.25, CA: 7.25, FL: 6.0, NY: 8.0, PA: 6.0, IL: 6.25, ...
  // 52 states total
}
```

**Proposed File:** `constants/tax/stateTaxRates.js`
**Usage:** Used in `getStateTaxRate()` function

---

## 📁 **FLUSHJOHN-CRM**

### 2. **State Sales Tax Rates** ⚠️ **HIGH PRIORITY** (DUPLICATE)

**Location:** `src/components/Products/ProductList/index.js` (lines 41-92)
**Issue:** Exact same tax rates as API, duplicated code
**Data:** Same as #1 above
**Proposed File:** `src/constants/tax/stateTaxRates.js`
**Usage:** Used in `getStateTaxRate()` and product calculation logic

---

## 📁 **FLUSHJOHN-WEB**

### 3. **City Data (25 cities)** ⚠️ **CRITICAL - MULTIPLE DUPLICATIONS**

**Locations:**

- `src/app/porta-potty-rental/page.tsx` (lines 41-138) - `cities` array
- `src/app/porta-potty-rental/[city]/page.tsx` (lines 6-103) - `cities` array
- `src/app/sitemap.ts` (lines 4-162) - `targetCities` array
- `src/app/api/business-info/route.ts` (lines 41-220) - `serviceAreas.cities` array
- `src/features/service-areas/components/ServiceAreasPage/index.tsx` (lines 6-175) - `serviceAreasByState` object

**Issue:** City data duplicated across 5+ files with slight variations
**Data Structure:**

```typescript
{
  name: string;           // "houston", "dallas", etc.
  displayName: string;    // "Houston", "Dallas"
  state: string;          // "TX", "FL", etc.
  population: string;     // "2.3M", "1.3M"
  slug?: string;          // Sometimes present
  description?: string;   // Sometimes present
}
```

**Proposed File:** `src/features/locations/constants/citiesData.ts`
**Note:** Partially exists in `src/features/locations/constants/cities.ts` but not comprehensive

---

### 4. **State Data (6 states)** ⚠️ **HIGH PRIORITY**

**Location:** `src/app/service-areas/[state]/page.tsx` (lines 10-81)
**Issue:** State definitions with cities, descriptions, abbreviations mixed with page logic
**Data Structure:**

```typescript
const states = {
  texas: {
    name: "Texas",
    abbreviation: "TX",
    displayName: "Texas",
    cities: [...],
    description: "..."
  },
  // ... 5 more states
}
```

**Proposed File:** `src/features/locations/constants/statesData.ts`
**Note:** Currently duplicated in `ServiceAreasPage/index.tsx` as `serviceAreasByState`

---

### 5. **City Coordinates (25 cities)** ⚠️ **HIGH PRIORITY - MULTIPLE DUPLICATIONS**

**Locations:**

- `src/app/porta-potty-rental/[city]/page.tsx` (lines 320-350) - `getCityCoordinates()` function
- `src/app/porta-potty-rental/[city]/[service]/page.tsx` (lines 8-37) - `getCityCoordinates()` function
- `src/app/blog/[slug]/page.tsx` (lines 10-43) - `getCityCoordinates()` function
- `src/app/api/business-info/route.ts` (lines 42-220) - Embedded in city objects

**Issue:** Same coordinate mapping duplicated 4 times
**Data Structure:**

```typescript
{
  [citySlug]: { lat: string; lng: string }
  // Example: "houston": { lat: "29.7604", lng: "-95.3698" }
}
```

**Proposed File:** `src/features/locations/constants/cityCoordinates.ts`

---

### 6. **State Coordinates (6 states)** ⚠️ **MEDIUM PRIORITY**

**Location:** `src/app/service-areas/[state]/page.tsx` (lines 101-111)
**Issue:** State center coordinates hardcoded in function
**Data Structure:**

```typescript
{
  [stateAbbr]: { lat: string; lng: string }
  // Example: "TX": { lat: "31.9686", lng: "-99.9018" }
}
```

**Proposed File:** `src/features/locations/constants/stateCoordinates.ts`

---

### 7. **Service Areas by State** ⚠️ **MEDIUM PRIORITY**

**Location:** `src/features/service-areas/components/ServiceAreasPage/index.tsx` (lines 6-175)
**Issue:** City data with descriptions mixed with component logic
**Data Structure:**

```typescript
const serviceAreasByState = {
  Delaware: [{ name, slug, state, description }],
  Texas: [...],
  // ... etc
}
```

**Proposed File:** `src/features/locations/constants/serviceAreas.ts`
**Note:** Can merge with citiesData or statesData

---

## 📊 **SUMMARY BY PRIORITY**

### **CRITICAL (Multiple Duplications):**

1. ✅ **City Data** - Duplicated in 5+ files (flushjohn-web)
2. ✅ **State Sales Tax Rates** - Duplicated in API and CRM

### **HIGH PRIORITY (Business Logic Separation):**

3. ✅ **City Coordinates** - Duplicated 4 times (flushjohn-web)
4. ✅ **State Data** - Mixed with page logic (flushjohn-web)
5. ✅ **State Coordinates** - Hardcoded in function (flushjohn-web)

### **MEDIUM PRIORITY:**

6. ✅ **Service Areas by State** - Mixed with component (flushjohn-web)

---

## 📝 **PROPOSED FILE STRUCTURE**

### **flushjohn-api:**

```
constants/
  └── tax/
      └── stateTaxRates.js
```

### **flushjohn-crm:**

```
src/constants/
  └── tax/
      └── stateTaxRates.js
```

### **flushjohn-web:**

```
src/features/locations/constants/
  ├── citiesData.ts          # Complete city data (name, displayName, state, population, slug)
  ├── cityCoordinates.ts     # City lat/lng coordinates
  ├── statesData.ts          # State data (name, abbreviation, cities, description)
  ├── stateCoordinates.ts    # State center lat/lng coordinates
  └── serviceAreas.ts        # Service areas by state (if not merged)
```

---

## ✅ **BENEFITS OF EXTRACTION**

1. **Single Source of Truth** - Update data in one place
2. **Easier Maintenance** - No more hunting through multiple files
3. **Better Testing** - Data can be tested independently
4. **Code Reusability** - Import from shared constants
5. **Type Safety** - Better TypeScript support
6. **Reduced Duplication** - Eliminate ~500+ lines of duplicate code
7. **Easier Updates** - Adding new cities/states becomes simpler

---

**Total Files to Create:** 6
**Total Files to Refactor:** 9+
**Estimated Duplication Removed:** ~600+ lines
