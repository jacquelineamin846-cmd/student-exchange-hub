import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AppProvider, useStore } from "@/lib/store";
import { 
  ShoppingBag, 
  PlusCircle, 
  ShieldCheck, 
  Search, 
  Menu, 
  X, 
  Home as HomeIcon,
  Filter,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, toggleAdmin } = useStore();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-4 h-4" /> },
    { name: "Browse", path: "/marketplace", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Sell", path: "/sell", icon: <PlusCircle className="w-4 h-4" /> },
  ];

  if (isAdmin) {
    navItems.push({ name: "Admin", path: "/admin", icon: <ShieldCheck className="w-4 h-4" /> });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-primary">salKUHES</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button variant="outline" size="sm" onClick={toggleAdmin}>
              {isAdmin ? "Admin View" : "Student View"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background"
          >
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 text-lg font-medium ${
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Button variant="outline" onClick={() => { toggleAdmin(); setIsOpen(false); }}>
                {isAdmin ? "Switch to Student" : "Switch to Admin"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ListingCard = ({ listing }: { listing: any }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg border-muted">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={listing.imageUrl} 
            alt={listing.title} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur text-foreground">
            {listing.category}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold line-clamp-1">{listing.title}</CardTitle>
            <span className="text-primary font-bold">${listing.price}</span>
          </div>
          <CardDescription className="line-clamp-2 mt-1">{listing.description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0 mt-auto flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{listing.sellerName}</span>
          </div>
          <Button className="w-full mt-2" size="sm" asChild>
            <a href={`mailto:${listing.sellerContact}`}>Contact Seller</a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// --- Pages ---

const Home = () => {
  const categories = [
    { name: "Textbooks", img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/textbooks-category-hero-06de9972-1780001664330.webp" },
    { name: "Electronics", img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/electronics-category-hero-22720342-1780001664309.webp" },
    { name: "Services", img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/services-category-hero-898586ab-1780001664031.webp" },
    { name: "Furniture", img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/furniture-category-hero-ea4e288a-1780001666762.webp" },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center text-center px-4 overflow-hidden rounded-3xl mx-4 mt-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee95feb5-dbb6-43e1-8ede-1ba4b9f9b1e9/textbooks-category-hero-06de9972-1780001664330.webp" 
            className="w-full h-full object-cover opacity-30 blur-sm"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter"
          >
            Empowering Your <span className="text-primary italic">Campus Life</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            The trusted student marketplace for KUHES. Buy and sell goods, services, and share resources within your community.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link to="/marketplace">Start Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link to="/sell">Sell Something</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link to={`/marketplace?category=${cat.name}`} key={cat.name}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img src={cat.img} alt={cat.name} className="object-cover w-full h-full brightness-75 group-hover:brightness-50 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{cat.name}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Fraud Protection</h3>
              <p className="text-muted-foreground">Every listing is manually reviewed by our admin team to ensure a safe marketplace.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Student Focused</h3>
              <p className="text-muted-foreground">Designed exclusively for KUHES students with affordable prices and local pickup.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Easy Listing</h3>
              <p className="text-muted-foreground">Snap a photo, set a price, and reach hundreds of students in minutes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Marketplace = () => {
  const { listings } = useStore();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "all";
  const [category, setCategory] = useState(initialCategory);

  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || 
                           l.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || l.category === category;
      const isApproved = l.status === "approved";
      return matchesSearch && matchesCategory && isApproved;
    });
  }, [listings, search, category]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Browse goods and services from fellow students.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search items..." 
              className="pl-10" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Textbooks">Textbooks</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

const SellForm = () => {
  const { addListing } = useStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Textbooks",
    imageUrl: "",
    sellerName: "",
    sellerContact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.sellerContact) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addListing({
      ...formData,
      price: parseFloat(formData.price),
      category: formData.category as any,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1544640805-b74585175d3e?q=80&w=1000&auto=format&fit=crop",
    });
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "Textbooks",
      imageUrl: "",
      sellerName: "",
      sellerContact: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Sell on salKUHES</h1>
          <p className="text-muted-foreground">Create a listing for your product or service. Admin will review before it goes live.</p>
        </div>

        <Card className="shadow-xl border-muted">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
              <CardDescription>Tell the community about what you're offering.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Item Title *</label>
                  <Input 
                    placeholder="e.g. Organic Chemistry Study Guide" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price ($) *</label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Textbooks">Textbooks</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe your item's condition, features, or details..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL (Optional)</label>
                <Input 
                  placeholder="https://example.com/image.jpg" 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>

              <hr className="my-6" />

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Seller Information</h3>
                <p className="text-xs text-muted-foreground">This info will be visible to buyers so they can contact you.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input 
                    placeholder="Full Name" 
                    value={formData.sellerName}
                    onChange={e => setFormData({...formData, sellerName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email/Phone *</label>
                  <Input 
                    placeholder="How can buyers reach you?" 
                    value={formData.sellerContact}
                    onChange={e => setFormData({...formData, sellerContact: e.target.value})}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full h-12 text-lg">Submit for Approval</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { listings, updateListingStatus, deleteListing, isAdmin } = useStore();

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShieldCheck className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">Only administrators can access this moderation panel.</p>
      </div>
    );
  }

  const pending = listings.filter(l => l.status === "pending");
  const approved = listings.filter(l => l.status === "approved");
  const rejected = listings.filter(l => l.status === "rejected");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold">Admin Moderation</h1>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="pending" className="flex gap-2">
            Pending <Badge variant="secondary" className="px-1">{pending.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pending.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed">
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">All caught up! No pending listings to review.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {pending.map(listing => (
                <Card key={listing.id} className="flex flex-col md:flex-row overflow-hidden border-yellow-500/20 bg-yellow-500/5">
                  <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                    <img src={listing.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge variant="outline" className="mb-2">{listing.category}</Badge>
                        <h3 className="text-xl font-bold">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">By {listing.sellerName} ({listing.sellerContact})</p>
                      </div>
                      <span className="text-xl font-bold text-primary">${listing.price}</span>
                    </div>
                    <p className="text-sm mb-4 line-clamp-2">{listing.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => updateListingStatus(listing.id, "approved")} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateListingStatus(listing.id, "rejected")} className="text-red-600 border-red-200 hover:bg-red-50">
                        <XCircle className="w-4 h-4 mr-2" /> Reject
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteListing(listing.id)} className="text-muted-foreground">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid gap-4">
             {approved.map(listing => (
               <div key={listing.id} className="flex items-center justify-between p-4 border rounded-xl bg-card">
                 <div className="flex items-center gap-4">
                   <img src={listing.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt="" />
                   <div>
                     <h4 className="font-bold">{listing.title}</h4>
                     <p className="text-xs text-muted-foreground">{listing.sellerName}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Approved</Badge>
                    <Button size="icon" variant="ghost" onClick={() => deleteListing(listing.id)} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                 </div>
               </div>
             ))}
             {approved.length === 0 && <p className="text-center text-muted-foreground py-12">No approved listings yet.</p>}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="grid gap-4">
             {rejected.map(listing => (
               <div key={listing.id} className="flex items-center justify-between p-4 border rounded-xl bg-card">
                 <div className="flex items-center gap-4">
                   <img src={listing.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt="" />
                   <div>
                     <h4 className="font-bold">{listing.title}</h4>
                     <p className="text-xs text-muted-foreground">{listing.sellerName}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Badge variant="destructive">Rejected</Badge>
                    <Button variant="ghost" size="sm" onClick={() => updateListingStatus(listing.id, "approved")}>Restore</Button>
                 </div>
               </div>
             ))}
             {rejected.length === 0 && <p className="text-center text-muted-foreground py-12">No rejected listings.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- Main App ---

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/sell" element={<SellForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <footer className="border-t py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold">salKUHES</span>
                </div>
                <p className="text-muted-foreground max-w-sm">
                  The official marketplace for KUHES students. A safe environment to trade textbooks, electronics, and academic services.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/marketplace">Browse Marketplace</Link></li>
                  <li><Link to="/sell">Sell Items</Link></li>
                  <li><Link to="/">Safety Guidelines</Link></li>
                  <li><Link to="/">Community Rules</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>support@salkuhes.edu</li>
                  <li>Admin Office: Block B, Room 204</li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} salKUHES Marketplace. All rights reserved.</p>
              <div className="flex gap-6">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
        <Toaster position="top-center" />
      </div>
    </AppProvider>
  );
}

export default App;