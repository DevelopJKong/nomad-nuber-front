import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AllCategoriesOutput = {
  __typename?: 'AllCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Category = {
  __typename?: 'Category';
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  restaurantCount: Scalars['Int']['output'];
  restaurants: Array<Restaurant>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
};

export type CategoryOutput = {
  __typename?: 'CategoryOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  restaurants?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateDishInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  options?: InputMaybe<Array<DishOptionInputType>>;
  photo: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  restaurantId: Scalars['Int']['input'];
};

export type CreateDishOutput = {
  __typename?: 'CreateDishOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
  restaurantId: Scalars['Int']['input'];
};

export type CreateOrderItemInput = {
  dishId: Scalars['Int']['input'];
  options?: InputMaybe<Array<OrderItemOptionInpuType>>;
};

export type CreateOrderOutput = {
  __typename?: 'CreateOrderOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  orderId?: Maybe<Scalars['Int']['output']>;
};

export type CreatePaymentInput = {
  restaurantId: Scalars['Int']['input'];
  transactionId: Scalars['String']['input'];
};

export type CreatePaymentOutput = {
  __typename?: 'CreatePaymentOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateRestaurantInput = {
  address: Scalars['String']['input'];
  categoryName: Scalars['String']['input'];
  coverImg: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateRestaurantOutput = {
  __typename?: 'CreateRestaurantOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  restaurantId: Scalars['Int']['output'];
};

export type DeleteDishInput = {
  dishId: Scalars['Int']['input'];
};

export type DeleteRestaurantInput = {
  restaurantId: Scalars['Float']['input'];
};

export type DeleteRestaurantOutput = {
  __typename?: 'DeleteRestaurantOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Dish = {
  __typename?: 'Dish';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Array<DishOption>>;
  photo: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  restaurant: Restaurant;
  updatedAt: Scalars['DateTime']['output'];
};

export type DishChoice = {
  __typename?: 'DishChoice';
  extra?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
};

export type DishChoiceInputType = {
  extra?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type DishOption = {
  __typename?: 'DishOption';
  choices?: Maybe<Array<DishChoice>>;
  extra?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
};

export type DishOptionInputType = {
  choices?: InputMaybe<Array<DishChoiceInputType>>;
  extra?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type EditDishInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dishId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type EditDishOutput = {
  __typename?: 'EditDishOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditOrderInput = {
  id: Scalars['Float']['input'];
  status: OrderStatus;
};

export type EditOrderOutput = {
  __typename?: 'EditOrderOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type EditProfileOutput = {
  __typename?: 'EditProfileOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditRestaurantInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  categoryName?: InputMaybe<Scalars['String']['input']>;
  coverImg?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  restaurantId: Scalars['Float']['input'];
};

export type EditRestaurantOutput = {
  __typename?: 'EditRestaurantOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetOrderInput = {
  id: Scalars['Float']['input'];
};

export type GetOrderOutput = {
  __typename?: 'GetOrderOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  order?: Maybe<Order>;
};

export type GetOrdersInput = {
  status?: InputMaybe<OrderStatus>;
};

export type GetOrdersOutput = {
  __typename?: 'GetOrdersOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  orders?: Maybe<Array<Order>>;
};

export type GetPaymentsOutput = {
  __typename?: 'GetPaymentsOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  payments?: Maybe<Array<Payment>>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createDish: CreateDishOutput;
  createOrder: CreateOrderOutput;
  createPayment: CreatePaymentOutput;
  createRestaurant: CreateRestaurantOutput;
  deleteDish: EditDishOutput;
  deleteRestaurant: DeleteRestaurantOutput;
  editDish: EditDishOutput;
  editOrder: EditOrderOutput;
  editProfile: EditProfileOutput;
  editRestaurant: EditRestaurantOutput;
  login: LoginOutput;
  takeOrder: TakeOrderOutput;
  verifyEmail: VerifyEmailOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationDeleteDishArgs = {
  input: DeleteDishInput;
};


export type MutationDeleteRestaurantArgs = {
  input: DeleteRestaurantInput;
};


export type MutationEditDishArgs = {
  input: EditDishInput;
};


export type MutationEditOrderArgs = {
  input: EditOrderInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationEditRestaurantArgs = {
  input: EditRestaurantInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationTakeOrderArgs = {
  input: TakeOrderInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type MyRestaurantInput = {
  id: Scalars['Float']['input'];
};

export type MyRestaurantOutput = {
  __typename?: 'MyRestaurantOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  restaurant?: Maybe<Restaurant>;
};

export type MyRestaurantsOutput = {
  __typename?: 'MyRestaurantsOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  restaurants: Array<Restaurant>;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<User>;
  driver?: Maybe<User>;
  id: Scalars['Float']['output'];
  items: Array<OrderItem>;
  restaurant?: Maybe<Restaurant>;
  status: OrderStatus;
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime']['output'];
  dish: Dish;
  id: Scalars['Float']['output'];
  options?: Maybe<Array<OrderItemOption>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  choice?: Maybe<Scalars['String']['output']>;
  extra?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
};

export type OrderItemOptionInpuType = {
  choice?: InputMaybe<Scalars['String']['input']>;
  extra?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Pending = 'Pending',
  PickedUp = 'PickedUp'
}

export type OrderUpdatesInput = {
  id: Scalars['Float']['input'];
};

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  restaurant: Restaurant;
  restaurantId: Scalars['Int']['output'];
  transactionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  allCategories: AllCategoriesOutput;
  category: CategoryOutput;
  getOrder: GetOrderOutput;
  getOrders: GetOrdersOutput;
  getPayments: GetPaymentsOutput;
  hi: Scalars['Boolean']['output'];
  me: User;
  myRestaurant: MyRestaurantOutput;
  myRestaurants: MyRestaurantsOutput;
  restaurant: RestaurantOutput;
  restaurants: RestaurantsOutput;
  searchRestaurant: SearchRestaurantOutput;
  userProfile: UserProfileOutput;
};


export type QueryCategoryArgs = {
  input: CategoryInput;
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryMyRestaurantArgs = {
  input: MyRestaurantInput;
};


export type QueryRestaurantArgs = {
  input: RestaurantInput;
};


export type QueryRestaurantsArgs = {
  input: RestaurantsInput;
};


export type QuerySearchRestaurantArgs = {
  input: SearchRestaurantInput;
};


export type QueryUserProfileArgs = {
  userId: Scalars['Float']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String']['output'];
  category?: Maybe<Category>;
  coverImg: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  isPromoted: Scalars['Boolean']['output'];
  menu: Array<Dish>;
  name: Scalars['String']['output'];
  orders: Array<Order>;
  owner: User;
  promotedUntil?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RestaurantInput = {
  restaurantId: Scalars['Int']['input'];
};

export type RestaurantOutput = {
  __typename?: 'RestaurantOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  restaurant?: Maybe<Restaurant>;
};

export type RestaurantsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type RestaurantsOutput = {
  __typename?: 'RestaurantsOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  results?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type SearchRestaurantInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type SearchRestaurantOutput = {
  __typename?: 'SearchRestaurantOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  restaurants?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  cookedOrders: Order;
  orderUpdates: Order;
  pendingOrders: Order;
};


export type SubscriptionOrderUpdatesArgs = {
  input: OrderUpdatesInput;
};

export type TakeOrderInput = {
  id: Scalars['Float']['input'];
};

export type TakeOrderOutput = {
  __typename?: 'TakeOrderOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  orders: Array<Order>;
  password: Scalars['String']['output'];
  payments: Array<Payment>;
  restaurants: Array<Restaurant>;
  rides: Array<Order>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export enum UserRole {
  Client = 'Client',
  Delivery = 'Delivery',
  Owner = 'Owner'
}

export type VerifyEmailInput = {
  code: Scalars['String']['input'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type RestaurantPartsFragment = { __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null };

export type CategoryPartsFragment = { __typename?: 'Category', id: number, name: string, coverImg?: string | null, slug: string, restaurantCount: number };

export type DishPartsFragment = { __typename?: 'Dish', id: number, name: string, price: number, photo: string, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null }> | null }> | null };

export type OrderPartsFragment = { __typename?: 'Order', id: number, createdAt: any, total: number };

export type FullOrderPartsFragment = { __typename?: 'Order', id: number, status: OrderStatus, total: number, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, role: UserRole, verified: boolean } };

export type CreateAccountMutationMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;


export type CreateAccountMutationMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type CookedOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CookedOrdersSubscription = { __typename?: 'Subscription', cookedOrders: { __typename?: 'Order', id: number, status: OrderStatus, total: number, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } };

export type TakeOrderMutationVariables = Exact<{
  input: TakeOrderInput;
}>;


export type TakeOrderMutation = { __typename?: 'Mutation', takeOrder: { __typename?: 'TakeOrderOutput', ok: boolean, error?: string | null } };

export type LoginMutationMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, token?: string | null, error?: string | null } };

export type GetOrderQueryVariables = Exact<{
  input: GetOrderInput;
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'GetOrderOutput', ok: boolean, error?: string | null, order?: { __typename?: 'Order', id: number, status: OrderStatus, total: number, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } | null } };

export type OrderUpdatesSubscriptionVariables = Exact<{
  input: OrderUpdatesInput;
}>;


export type OrderUpdatesSubscription = { __typename?: 'Subscription', orderUpdates: { __typename?: 'Order', id: number, status: OrderStatus, total: number, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } };

export type EditOrderMutationVariables = Exact<{
  input: EditOrderInput;
}>;


export type EditOrderMutation = { __typename?: 'Mutation', editOrder: { __typename?: 'EditOrderOutput', ok: boolean, error?: string | null } };

export type CreateDishMutationVariables = Exact<{
  input: CreateDishInput;
}>;


export type CreateDishMutation = { __typename?: 'Mutation', createDish: { __typename?: 'CreateDishOutput', ok: boolean, error?: string | null } };

export type CreateRestaurantMutationVariables = Exact<{
  input: CreateRestaurantInput;
}>;


export type CreateRestaurantMutation = { __typename?: 'Mutation', createRestaurant: { __typename?: 'CreateRestaurantOutput', error?: string | null, ok: boolean, restaurantId: number } };

export type MyRestaurantQueryVariables = Exact<{
  input: MyRestaurantInput;
}>;


export type MyRestaurantQuery = { __typename?: 'Query', myRestaurant: { __typename?: 'MyRestaurantOutput', ok: boolean, error?: string | null, restaurant?: { __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, menu: Array<{ __typename?: 'Dish', id: number, name: string, price: number, photo: string, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null }> | null }> | null }>, orders: Array<{ __typename?: 'Order', id: number, createdAt: any, total: number }>, category?: { __typename?: 'Category', name: string } | null } | null } };

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'CreatePaymentOutput', ok: boolean, error?: string | null } };

export type PendingOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PendingOrdersSubscription = { __typename?: 'Subscription', pendingOrders: { __typename?: 'Order', id: number, status: OrderStatus, total: number, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } };

export type MyRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRestaurantsQuery = { __typename?: 'Query', myRestaurants: { __typename?: 'MyRestaurantsOutput', ok: boolean, error?: string | null, restaurants: Array<{ __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null }> } };

export type CategoryQueryVariables = Exact<{
  input: CategoryInput;
}>;


export type CategoryQuery = { __typename?: 'Query', category: { __typename?: 'CategoryOutput', ok: boolean, error?: string | null, totalPages?: number | null, totalResults?: number | null, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null }> | null, category?: { __typename?: 'Category', id: number, name: string, coverImg?: string | null, slug: string, restaurantCount: number } | null } };

export type RestaurantQueryVariables = Exact<{
  input: RestaurantInput;
}>;


export type RestaurantQuery = { __typename?: 'Query', restaurant: { __typename?: 'RestaurantOutput', ok: boolean, error?: string | null, restaurant?: { __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, menu: Array<{ __typename?: 'Dish', id: number, name: string, price: number, photo: string, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null }> | null }> | null }>, category?: { __typename?: 'Category', name: string } | null } | null } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderOutput', ok: boolean, error?: string | null, orderId?: number | null } };

export type RestaurantsPageQueryQueryVariables = Exact<{
  input: RestaurantsInput;
}>;


export type RestaurantsPageQueryQuery = { __typename?: 'Query', allCategories: { __typename?: 'AllCategoriesOutput', ok: boolean, error?: string | null, categories?: Array<{ __typename?: 'Category', id: number, name: string, coverImg?: string | null, slug: string, restaurantCount: number }> | null }, restaurants: { __typename?: 'RestaurantsOutput', ok: boolean, error?: string | null, totalPages?: number | null, totalResults?: number | null, results?: Array<{ __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null }> | null } };

export type SearchRestaurantQueryVariables = Exact<{
  input: SearchRestaurantInput;
}>;


export type SearchRestaurantQuery = { __typename?: 'Query', searchRestaurant: { __typename?: 'SearchRestaurantOutput', ok: boolean, error?: string | null, totalPages?: number | null, totalResults?: number | null, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null }> | null } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailOutput', ok: boolean, error?: string | null } };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileOutput', ok: boolean, error?: string | null } };

export const RestaurantPartsFragmentDoc = gql`
    fragment RestaurantParts on Restaurant {
  id
  name
  coverImg
  category {
    name
  }
  address
  isPromoted
}
    `;
export const CategoryPartsFragmentDoc = gql`
    fragment CategoryParts on Category {
  id
  name
  coverImg
  slug
  restaurantCount
}
    `;
export const DishPartsFragmentDoc = gql`
    fragment DishParts on Dish {
  id
  name
  price
  photo
  description
  options {
    name
    extra
    choices {
      name
      extra
    }
  }
}
    `;
export const OrderPartsFragmentDoc = gql`
    fragment OrderParts on Order {
  id
  createdAt
  total
}
    `;
export const FullOrderPartsFragmentDoc = gql`
    fragment FullOrderParts on Order {
  id
  status
  total
  driver {
    email
  }
  customer {
    email
  }
  restaurant {
    name
  }
}
    `;
export const MeQueryDocument = gql`
    query meQuery {
  me {
    id
    email
    role
    verified
  }
}
    `;

/**
 * __useMeQueryQuery__
 *
 * To run a query within a React component, call `useMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQueryQuery(baseOptions?: Apollo.QueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
      }
export function useMeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
        }
export function useMeQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
        }
export type MeQueryQueryHookResult = ReturnType<typeof useMeQueryQuery>;
export type MeQueryLazyQueryHookResult = ReturnType<typeof useMeQueryLazyQuery>;
export type MeQuerySuspenseQueryHookResult = ReturnType<typeof useMeQuerySuspenseQuery>;
export type MeQueryQueryResult = Apollo.QueryResult<MeQueryQuery, MeQueryQueryVariables>;
export const CreateAccountMutationDocument = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
  createAccount(input: $createAccountInput) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationMutationFn = Apollo.MutationFunction<CreateAccountMutationMutation, CreateAccountMutationMutationVariables>;

/**
 * __useCreateAccountMutationMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutationMutation, { data, loading, error }] = useCreateAccountMutationMutation({
 *   variables: {
 *      createAccountInput: // value for 'createAccountInput'
 *   },
 * });
 */
export function useCreateAccountMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutationMutation, CreateAccountMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutationMutation, CreateAccountMutationMutationVariables>(CreateAccountMutationDocument, options);
      }
export type CreateAccountMutationMutationHookResult = ReturnType<typeof useCreateAccountMutationMutation>;
export type CreateAccountMutationMutationResult = Apollo.MutationResult<CreateAccountMutationMutation>;
export type CreateAccountMutationMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutationMutation, CreateAccountMutationMutationVariables>;
export const CookedOrdersDocument = gql`
    subscription cookedOrders {
  cookedOrders {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useCookedOrdersSubscription__
 *
 * To run a query within a React component, call `useCookedOrdersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCookedOrdersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCookedOrdersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCookedOrdersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CookedOrdersSubscription, CookedOrdersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CookedOrdersSubscription, CookedOrdersSubscriptionVariables>(CookedOrdersDocument, options);
      }
export type CookedOrdersSubscriptionHookResult = ReturnType<typeof useCookedOrdersSubscription>;
export type CookedOrdersSubscriptionResult = Apollo.SubscriptionResult<CookedOrdersSubscription>;
export const TakeOrderDocument = gql`
    mutation takeOrder($input: TakeOrderInput!) {
  takeOrder(input: $input) {
    ok
    error
  }
}
    `;
export type TakeOrderMutationFn = Apollo.MutationFunction<TakeOrderMutation, TakeOrderMutationVariables>;

/**
 * __useTakeOrderMutation__
 *
 * To run a mutation, you first call `useTakeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTakeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [takeOrderMutation, { data, loading, error }] = useTakeOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTakeOrderMutation(baseOptions?: Apollo.MutationHookOptions<TakeOrderMutation, TakeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TakeOrderMutation, TakeOrderMutationVariables>(TakeOrderDocument, options);
      }
export type TakeOrderMutationHookResult = ReturnType<typeof useTakeOrderMutation>;
export type TakeOrderMutationResult = Apollo.MutationResult<TakeOrderMutation>;
export type TakeOrderMutationOptions = Apollo.BaseMutationOptions<TakeOrderMutation, TakeOrderMutationVariables>;
export const LoginMutationDocument = gql`
    mutation loginMutation($loginInput: LoginInput!) {
  login(input: $loginInput) {
    ok
    token
    error
  }
}
    `;
export type LoginMutationMutationFn = Apollo.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;

/**
 * __useLoginMutationMutation__
 *
 * To run a mutation, you first call `useLoginMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutationMutation, { data, loading, error }] = useLoginMutationMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutationMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutationMutation, LoginMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutationMutation, LoginMutationMutationVariables>(LoginMutationDocument, options);
      }
export type LoginMutationMutationHookResult = ReturnType<typeof useLoginMutationMutation>;
export type LoginMutationMutationResult = Apollo.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = Apollo.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;
export const GetOrderDocument = gql`
    query getOrder($input: GetOrderInput!) {
  getOrder(input: $input) {
    ok
    error
    order {
      ...FullOrderParts
    }
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables> & ({ variables: GetOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export function useGetOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderSuspenseQueryHookResult = ReturnType<typeof useGetOrderSuspenseQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const OrderUpdatesDocument = gql`
    subscription orderUpdates($input: OrderUpdatesInput!) {
  orderUpdates(input: $input) {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useOrderUpdatesSubscription__
 *
 * To run a query within a React component, call `useOrderUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrderUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderUpdatesSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables> & ({ variables: OrderUpdatesSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables>(OrderUpdatesDocument, options);
      }
export type OrderUpdatesSubscriptionHookResult = ReturnType<typeof useOrderUpdatesSubscription>;
export type OrderUpdatesSubscriptionResult = Apollo.SubscriptionResult<OrderUpdatesSubscription>;
export const EditOrderDocument = gql`
    mutation editOrder($input: EditOrderInput!) {
  editOrder(input: $input) {
    ok
    error
  }
}
    `;
export type EditOrderMutationFn = Apollo.MutationFunction<EditOrderMutation, EditOrderMutationVariables>;

/**
 * __useEditOrderMutation__
 *
 * To run a mutation, you first call `useEditOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderMutation, { data, loading, error }] = useEditOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderMutation, EditOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderMutation, EditOrderMutationVariables>(EditOrderDocument, options);
      }
export type EditOrderMutationHookResult = ReturnType<typeof useEditOrderMutation>;
export type EditOrderMutationResult = Apollo.MutationResult<EditOrderMutation>;
export type EditOrderMutationOptions = Apollo.BaseMutationOptions<EditOrderMutation, EditOrderMutationVariables>;
export const CreateDishDocument = gql`
    mutation createDish($input: CreateDishInput!) {
  createDish(input: $input) {
    ok
    error
  }
}
    `;
export type CreateDishMutationFn = Apollo.MutationFunction<CreateDishMutation, CreateDishMutationVariables>;

/**
 * __useCreateDishMutation__
 *
 * To run a mutation, you first call `useCreateDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDishMutation, { data, loading, error }] = useCreateDishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDishMutation(baseOptions?: Apollo.MutationHookOptions<CreateDishMutation, CreateDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDishMutation, CreateDishMutationVariables>(CreateDishDocument, options);
      }
export type CreateDishMutationHookResult = ReturnType<typeof useCreateDishMutation>;
export type CreateDishMutationResult = Apollo.MutationResult<CreateDishMutation>;
export type CreateDishMutationOptions = Apollo.BaseMutationOptions<CreateDishMutation, CreateDishMutationVariables>;
export const CreateRestaurantDocument = gql`
    mutation createRestaurant($input: CreateRestaurantInput!) {
  createRestaurant(input: $input) {
    error
    ok
    restaurantId
  }
}
    `;
export type CreateRestaurantMutationFn = Apollo.MutationFunction<CreateRestaurantMutation, CreateRestaurantMutationVariables>;

/**
 * __useCreateRestaurantMutation__
 *
 * To run a mutation, you first call `useCreateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRestaurantMutation, { data, loading, error }] = useCreateRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CreateRestaurantDocument, options);
      }
export type CreateRestaurantMutationHookResult = ReturnType<typeof useCreateRestaurantMutation>;
export type CreateRestaurantMutationResult = Apollo.MutationResult<CreateRestaurantMutation>;
export type CreateRestaurantMutationOptions = Apollo.BaseMutationOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>;
export const MyRestaurantDocument = gql`
    query myRestaurant($input: MyRestaurantInput!) {
  myRestaurant(input: $input) {
    ok
    error
    restaurant {
      ...RestaurantParts
      menu {
        ...DishParts
      }
      orders {
        ...OrderParts
      }
    }
  }
}
    ${RestaurantPartsFragmentDoc}
${DishPartsFragmentDoc}
${OrderPartsFragmentDoc}`;

/**
 * __useMyRestaurantQuery__
 *
 * To run a query within a React component, call `useMyRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRestaurantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyRestaurantQuery(baseOptions: Apollo.QueryHookOptions<MyRestaurantQuery, MyRestaurantQueryVariables> & ({ variables: MyRestaurantQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(MyRestaurantDocument, options);
      }
export function useMyRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyRestaurantQuery, MyRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(MyRestaurantDocument, options);
        }
export function useMyRestaurantSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyRestaurantQuery, MyRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(MyRestaurantDocument, options);
        }
export type MyRestaurantQueryHookResult = ReturnType<typeof useMyRestaurantQuery>;
export type MyRestaurantLazyQueryHookResult = ReturnType<typeof useMyRestaurantLazyQuery>;
export type MyRestaurantSuspenseQueryHookResult = ReturnType<typeof useMyRestaurantSuspenseQuery>;
export type MyRestaurantQueryResult = Apollo.QueryResult<MyRestaurantQuery, MyRestaurantQueryVariables>;
export const CreatePaymentDocument = gql`
    mutation createPayment($input: CreatePaymentInput!) {
  createPayment(input: $input) {
    ok
    error
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const PendingOrdersDocument = gql`
    subscription pendingOrders {
  pendingOrders {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __usePendingOrdersSubscription__
 *
 * To run a query within a React component, call `usePendingOrdersSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePendingOrdersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingOrdersSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePendingOrdersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PendingOrdersSubscription, PendingOrdersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PendingOrdersSubscription, PendingOrdersSubscriptionVariables>(PendingOrdersDocument, options);
      }
export type PendingOrdersSubscriptionHookResult = ReturnType<typeof usePendingOrdersSubscription>;
export type PendingOrdersSubscriptionResult = Apollo.SubscriptionResult<PendingOrdersSubscription>;
export const MyRestaurantsDocument = gql`
    query myRestaurants {
  myRestaurants {
    ok
    error
    restaurants {
      ...RestaurantParts
    }
  }
}
    ${RestaurantPartsFragmentDoc}`;

/**
 * __useMyRestaurantsQuery__
 *
 * To run a query within a React component, call `useMyRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<MyRestaurantsQuery, MyRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MyRestaurantsDocument, options);
      }
export function useMyRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyRestaurantsQuery, MyRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MyRestaurantsDocument, options);
        }
export function useMyRestaurantsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyRestaurantsQuery, MyRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MyRestaurantsDocument, options);
        }
export type MyRestaurantsQueryHookResult = ReturnType<typeof useMyRestaurantsQuery>;
export type MyRestaurantsLazyQueryHookResult = ReturnType<typeof useMyRestaurantsLazyQuery>;
export type MyRestaurantsSuspenseQueryHookResult = ReturnType<typeof useMyRestaurantsSuspenseQuery>;
export type MyRestaurantsQueryResult = Apollo.QueryResult<MyRestaurantsQuery, MyRestaurantsQueryVariables>;
export const CategoryDocument = gql`
    query category($input: CategoryInput!) {
  category(input: $input) {
    ok
    error
    totalPages
    totalResults
    restaurants {
      ...RestaurantParts
    }
    category {
      ...CategoryParts
    }
  }
}
    ${RestaurantPartsFragmentDoc}
${CategoryPartsFragmentDoc}`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables> & ({ variables: CategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export function useCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategorySuspenseQueryHookResult = ReturnType<typeof useCategorySuspenseQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const RestaurantDocument = gql`
    query restaurant($input: RestaurantInput!) {
  restaurant(input: $input) {
    ok
    error
    restaurant {
      ...RestaurantParts
      menu {
        ...DishParts
      }
    }
  }
}
    ${RestaurantPartsFragmentDoc}
${DishPartsFragmentDoc}`;

/**
 * __useRestaurantQuery__
 *
 * To run a query within a React component, call `useRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestaurantQuery(baseOptions: Apollo.QueryHookOptions<RestaurantQuery, RestaurantQueryVariables> & ({ variables: RestaurantQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
      }
export function useRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
        }
export function useRestaurantSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
        }
export type RestaurantQueryHookResult = ReturnType<typeof useRestaurantQuery>;
export type RestaurantLazyQueryHookResult = ReturnType<typeof useRestaurantLazyQuery>;
export type RestaurantSuspenseQueryHookResult = ReturnType<typeof useRestaurantSuspenseQuery>;
export type RestaurantQueryResult = Apollo.QueryResult<RestaurantQuery, RestaurantQueryVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    ok
    error
    orderId
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const RestaurantsPageQueryDocument = gql`
    query restaurantsPageQuery($input: RestaurantsInput!) {
  allCategories {
    ok
    error
    categories {
      ...CategoryParts
    }
  }
  restaurants(input: $input) {
    ok
    error
    totalPages
    totalResults
    results {
      ...RestaurantParts
    }
  }
}
    ${CategoryPartsFragmentDoc}
${RestaurantPartsFragmentDoc}`;

/**
 * __useRestaurantsPageQueryQuery__
 *
 * To run a query within a React component, call `useRestaurantsPageQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsPageQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsPageQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestaurantsPageQueryQuery(baseOptions: Apollo.QueryHookOptions<RestaurantsPageQueryQuery, RestaurantsPageQueryQueryVariables> & ({ variables: RestaurantsPageQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantsPageQueryQuery, RestaurantsPageQueryQueryVariables>(RestaurantsPageQueryDocument, options);
      }
export function useRestaurantsPageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantsPageQueryQuery, RestaurantsPageQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantsPageQueryQuery, RestaurantsPageQueryQueryVariables>(RestaurantsPageQueryDocument, options);
        }
export function useRestaurantsPageQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RestaurantsPageQueryQuery, RestaurantsPageQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RestaurantsPageQueryQuery, RestaurantsPageQueryQueryVariables>(RestaurantsPageQueryDocument, options);
        }
export type RestaurantsPageQueryQueryHookResult = ReturnType<typeof useRestaurantsPageQueryQuery>;
export type RestaurantsPageQueryLazyQueryHookResult = ReturnType<typeof useRestaurantsPageQueryLazyQuery>;
export type RestaurantsPageQuerySuspenseQueryHookResult = ReturnType<typeof useRestaurantsPageQuerySuspenseQuery>;
export type RestaurantsPageQueryQueryResult = Apollo.QueryResult<RestaurantsPageQueryQuery, RestaurantsPageQueryQueryVariables>;
export const SearchRestaurantDocument = gql`
    query searchRestaurant($input: SearchRestaurantInput!) {
  searchRestaurant(input: $input) {
    ok
    error
    totalPages
    totalResults
    restaurants {
      ...RestaurantParts
    }
  }
}
    ${RestaurantPartsFragmentDoc}`;

/**
 * __useSearchRestaurantQuery__
 *
 * To run a query within a React component, call `useSearchRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRestaurantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchRestaurantQuery(baseOptions: Apollo.QueryHookOptions<SearchRestaurantQuery, SearchRestaurantQueryVariables> & ({ variables: SearchRestaurantQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRestaurantQuery, SearchRestaurantQueryVariables>(SearchRestaurantDocument, options);
      }
export function useSearchRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRestaurantQuery, SearchRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRestaurantQuery, SearchRestaurantQueryVariables>(SearchRestaurantDocument, options);
        }
export function useSearchRestaurantSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchRestaurantQuery, SearchRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchRestaurantQuery, SearchRestaurantQueryVariables>(SearchRestaurantDocument, options);
        }
export type SearchRestaurantQueryHookResult = ReturnType<typeof useSearchRestaurantQuery>;
export type SearchRestaurantLazyQueryHookResult = ReturnType<typeof useSearchRestaurantLazyQuery>;
export type SearchRestaurantSuspenseQueryHookResult = ReturnType<typeof useSearchRestaurantSuspenseQuery>;
export type SearchRestaurantQueryResult = Apollo.QueryResult<SearchRestaurantQuery, SearchRestaurantQueryVariables>;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input) {
    ok
    error
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($input: EditProfileInput!) {
  editProfile(input: $input) {
    ok
    error
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;