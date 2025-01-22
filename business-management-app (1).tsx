import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package2, DollarSign, BarChart3, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data generation utilities
const generateRandomPrice = () => Math.floor(Math.random() * 900) + 100;
const generateRandomQuantity = () => Math.floor(Math.random() * 500) + 1;

const productCategories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Beauty', 'Food', 'Automotive', 'Office'];
const productNames = {
  Electronics: ['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Smart Watch', 'Camera', 'Speaker', 'TV', 'Gaming Console', 'Router'],
  Clothing: ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Sweater', 'Shoes', 'Hat', 'Socks', 'Scarf', 'Gloves'],
  Books: ['Novel', 'Textbook', 'Cookbook', 'Biography', 'Self-Help', 'History Book', 'Science Book', 'Comic Book', 'Art Book', 'Travel Guide'],
  'Home & Garden': ['Lamp', 'Plant Pot', 'Cushion', 'Rug', 'Mirror', 'Clock', 'Vase', 'Picture Frame', 'Blanket', 'Garden Tool'],
  Sports: ['Ball', 'Racket', 'Gym Bag', 'Yoga Mat', 'Weights', 'Sports Shoes', 'Jersey', 'Water Bottle', 'Fitness Tracker', 'Helmet'],
  Toys: ['Action Figure', 'Board Game', 'Puzzle', 'Stuffed Animal', 'Building Blocks', 'Remote Car', 'Doll', 'Art Set', 'Science Kit', 'Musical Toy'],
  Beauty: ['Shampoo', 'Perfume', 'Makeup Kit', 'Face Cream', 'Hair Dryer', 'Nail Polish', 'Brush Set', 'Soap', 'Face Mask', 'Lotion'],
  Food: ['Coffee', 'Tea', 'Snacks', 'Chocolate', 'Pasta', 'Spices', 'Cereal', 'Cookies', 'Juice', 'Nuts'],
  Automotive: ['Car Mat', 'Air Freshener', 'Phone Mount', 'Car Cleaner', 'Tool Kit', 'Seat Cover', 'Jump Starter', 'Oil', 'Wiper Blades', 'Air Filter'],
  Office: ['Pen Set', 'Notebook', 'Desk Organizer', 'Calculator', 'Stapler', 'Paper Clips', 'Printer Paper', 'Folder', 'Calendar', 'Scissors']
};

const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatuses = ['Pending', 'Completed', 'Failed', 'Refunded'];

const generateInventory = () => {
  const inventory = [];
  let id = 1;

  productCategories.forEach(category => {
    productNames[category].forEach(name => {
      inventory.push({
        id: id++,
        name: `${category} - ${name}`,
        quantity: generateRandomQuantity(),
        price: generateRandomPrice(),
        category
      });
    });
  });

  return inventory;
};

const generateCustomers = (count) => {
  const customers = [];
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
  
  for (let i = 1; i <= count; i++) {
    const firstName = `User${i}`;
    const lastName = `Customer${i}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[i % domains.length]}`;
    
    customers.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email,
      totalOrders: Math.floor(Math.random() * 20),
      totalSpent: Math.floor(Math.random() * 10000)
    });
  }
  
  return customers;
};

const generateOrders = (customerCount, inventory, count) => {
  const orders = [];
  const startDate = new Date('2024-01-01');
  
  for (let i = 1; i <= count; i++) {
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items = [];
    let total = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const item = inventory[Math.floor(Math.random() * inventory.length)];
      items.push(item.name);
      total += item.price;
    }
    
    const orderDate = new Date(startDate.getTime() + Math.random() * (new Date() - startDate));
    
    orders.push({
      id: i,
      customerId: Math.floor(Math.random() * customerCount) + 1,
      date: orderDate.toISOString().split('T')[0],
      items,
      total,
      status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)]
    });
  }
  
  return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const generatePayments = (orders) => {
  return orders.map((order, index) => ({
    id: index + 1,
    date: order.date,
    amount: order.total,
    customer: `Customer ${order.customerId}`,
    status: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)]
  }));
};

const generateSalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    sales: Math.floor(Math.random() * 50000) + 10000
  }));
};

const BusinessDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', price: '', category: '' });
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });
  
  useEffect(() => {
    // Generate initial data
    const initialInventory = generateInventory();
    const initialCustomers = generateCustomers(1000);
    const initialOrders = generateOrders(1000, initialInventory, 5000);
    const initialPayments = generatePayments(initialOrders);
    const initialSalesData = generateSalesData();

    setInventory(initialInventory);
    setCustomers(initialCustomers);
    setOrders(initialOrders);
    setPayments(initialPayments);
    setSalesData(initialSalesData);
  }, []);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity && newProduct.price) {
      setInventory([
        ...inventory,
        {
          id: inventory.length + 1,
          name: newProduct.name,
          quantity: parseInt(newProduct.quantity),
          price: parseFloat(newProduct.price),
          category: newProduct.category
        }
      ]);
      setNewProduct({ name: '', quantity: '', price: '', category: '' });
    }
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      setCustomers([
        ...customers,
        {
          id: customers.length + 1,
          name: newCustomer.name,
          email: newCustomer.email,
          totalOrders: 0,
          totalSpent: 0
        }
      ]);
      setNewCustomer({ name: '', email: '' });
    }
  };

  // Calculate totals
  const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Business Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory ({inventory.length})</TabsTrigger>
          <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
          <TabsTrigger value="payments">Payments ({payments.length})</TabsTrigger>
        </TabsList>

        {/* Rest of the component remains the same */}
        {/* ... */}
      </Tabs>
    </div>
  );
};

export default BusinessDashboard;
