import {
  pgTable,
  uuid,
  text,
  integer,
  serial,
  timestamp,
  primaryKey,
  real,
  varchar,
  jsonb,
  boolean
} from "drizzle-orm/pg-core";

// ==================== User Table ====================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  address: text('address'),
  gender: varchar('gender', { length: 10 }),
  profilePicture: text('profile_picture'),
  role: varchar('role', { length: 20 }).default('user'), // user, admin
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ==================== Product Table ====================

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  brand: varchar('brand', { length: 100 }),
  description: text('description'),
  price: real('price').notNull(),
  stock: integer('stock').default(0),
  thumbnail: text('thumbnail'),
  category:text('category').notNull(),  // Array of tags
  images: jsonb('images').default([]).notNull(), // Array of image URLs
  ratingAverage: real('rating_average').default(0), // Avg. rating
  ratingCount: integer('rating_count').default(0), // Total number of ratings
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),

  userId:uuid('user_id').notNull().references(()=>users.id,{onDelete:'cascade'})
});

// ==================== Review Table ====================

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  content: text('content'),
  images: jsonb('images').default([]).notNull(),
  rating: integer('rating').notNull(), // 1 to 5 stars
  createdAt: timestamp('created_at').defaultNow(),
});

// ==================== Cart Table ====================

export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').default(1),
  addedAt: timestamp('added_at').defaultNow(),
});

// ==================== Wishlist Table ====================

export const wishlists = pgTable('wishlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  addedAt: timestamp('added_at').defaultNow(),
});

// ==================== Order Table ====================

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  status: varchar('status', { length: 20 }).default('pending'), // pending, shipped, delivered, cancelled
  totalAmount: real('total_amount').notNull(),
  shippingAddress: text('shipping_address').notNull(),
  paymentStatus: varchar('payment_status', { length: 20 }).default('unpaid'), // paid, unpaid
  createdAt: timestamp('created_at').defaultNow(),
});

// ==================== Order Items ====================

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').default(1),
  price: real('price').notNull(),
});
