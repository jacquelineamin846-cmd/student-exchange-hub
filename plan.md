# Implementation Plan: salKUHES Marketplace

A marketplace platform for students to buy and sell goods and services, featuring an administrative moderation layer to prevent fraud.

## Scope Summary
- **User Features**: Browse listings, search/filter, post items for sale (goods/services), user profile/dashboard.
- **Admin Features**: Dashboard to monitor and approve/reject/delete listings to prevent fraud.
- **Data Persistence**: Client-side only (localStorage) for this session.
- **Tech Stack**: React, Tailwind CSS, Shadcn UI, Lucide React (icons), React Router (if needed for navigation).

## Affected Areas
- **Frontend**: All UI components and application logic.
- **Data Layer**: Mock data and `localStorage` synchronization for persistence.

## Assumptions & Open Questions
- **Assumption**: Since no backend is available, "Authentication" will be simulated (e.g., a simple user/admin toggle or a basic login screen that stores a flag in localStorage).
- **Assumption**: Fraud prevention relies on the Admin manually reviewing listings.
- **Question**: Should students be able to message each other directly? *Decision: For MVP, we will provide "Contact Seller" details (email/phone) rather than a full chat system.*

## Phases

### Phase 1: Foundation & Layout (frontend_engineer)
- Set up project structure.
- Implement main layout with navigation (Home, Sell, Admin, Profile).
- Initialize mock data for categories and initial listings.
- Deliverables: Navigation, Basic Routing, Global Layout.

### Phase 2: User Marketplace (frontend_engineer)
- **Browse/Search**: Implement listing grid with filters (category, price range).
- **Listing Details**: Detailed view of a product/service.
- **Sell Form**: Form to create new listings (title, description, price, category, image URL).
- Deliverables: Functional marketplace for students.

### Phase 3: Admin & Moderation (frontend_engineer)
- **Admin Dashboard**: List all active and pending listings.
- **Moderation Actions**: Buttons to "Approve", "Flag/Reject", or "Delete" listings.
- **Fraud Prevention Logic**: Listings created by users start in a "Pending" state and only appear in the marketplace after Admin approval.
- Deliverables: Admin control panel.

### Phase 4: Data Persistence & Final Polish (quick_fix_engineer)
- Implement `localStorage` hooks to save listings and moderation status.
- Add "Contact Seller" functionality (simple modal with contact info).
- Refine UI/UX (empty states, loading indicators, success messages).
- Deliverables: Persistent data across refreshes, polished UI.

## Specialist Assignments
1. **frontend_engineer**: Owns Phase 1, 2, and 3. Most of the heavy lifting for UI and state logic.
2. **quick_fix_engineer**: Owns Phase 4. Handles persistence and final UI refinements.
