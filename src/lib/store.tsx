import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type Category = "Textbooks" | "Electronics" | "Furniture" | "Clothing" | "Services";

export type ListingStatus = "pending" | "approved" | "rejected";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  sellerName: string;
  sellerContact: string;
  status: ListingStatus;
  createdAt: string;
}

interface AppState {
  listings: Listing[];
  isAdmin: boolean;
  addListing: (listing: Omit<Listing, "id" | "status" | "createdAt">) => void;
  updateListingStatus: (id: string, status: ListingStatus) => void;
  deleteListing: (id: string) => void;
  toggleAdmin: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const INITIAL_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Intro to Psychology Textbook",
    description: "Great condition, 12th edition. No highlights.",
    price: 45,
    category: "Textbooks",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/textbooks-category-hero-06de9972-1780001664330.webp",
    sellerName: "Alice Johnson",
    sellerContact: "alice@university.edu",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Noise Cancelling Headphones",
    description: "Sony WH-1000XM4, used for 6 months. Perfect for library study sessions.",
    price: 180,
    category: "Electronics",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/electronics-category-hero-22720342-1780001664309.webp",
    sellerName: "Bob Smith",
    sellerContact: "bob@university.edu",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Calculus Tutoring",
    description: "Available on weekends. I can help with Calc 1 and 2.",
    price: 25,
    category: "Services",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/services-category-hero-898586ab-1780001664031.webp",
    sellerName: "Charlie Brown",
    sellerContact: "charlie@university.edu",
    status: "approved",
    createdAt: new Date().toISOString(),
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem("salkuhes_listings");
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("salkuhes_isAdmin") === "true";
  });

  useEffect(() => {
    localStorage.setItem("salkuhes_listings", JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem("salkuhes_isAdmin", String(isAdmin));
  }, [isAdmin]);

  const addListing = (newListing: Omit<Listing, "id" | "status" | "createdAt">) => {
    const listing: Listing = {
      ...newListing,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setListings((prev) => [listing, ...prev]);
    toast.success("Listing submitted! It will appear after admin approval.");
  };

  const updateListingStatus = (id: string, status: ListingStatus) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    toast.info(`Listing ${status === "approved" ? "approved" : "rejected"}.`);
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast.error("Listing deleted.");
  };

  const toggleAdmin = () => {
    setIsAdmin((prev) => !prev);
    toast(`Switched to ${!isAdmin ? "Admin" : "Student"} mode`);
  };

  return (
    <AppContext.Provider value={{ listings, isAdmin, addListing, updateListingStatus, deleteListing, toggleAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useStore must be used within AppProvider");
  return context;
};