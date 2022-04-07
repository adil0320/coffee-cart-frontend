import React, { useState, useEffect, useContext } from "react";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import OrderItem from "../components/Orders/OrderItem";
import AuthContext from "../store/auth-context";

import classes from "./Orders.module.css";

const OrdersPage = () => {
  const authCtx = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getOrders = async () => {
      const orders = await fetch(
        `https://adils-cafe-default-rtdb.firebaseio.com/orders.json?orderBy="email"&equalTo="${authCtx.email}"`
      );
      const ordersData = await orders.json();
      setIsLoading(false);

      const loadedOrders = [];

      for (const key in ordersData) {
        loadedOrders.push({ id: key, ...ordersData[key] });
      }

      setOrders(loadedOrders);
    };
    getOrders();
  }, [authCtx.email]);

  if (orders.length === 0 && !isLoading) {
    return <h2 style={{ textAlign: "center" }}>No Orders Yet</h2>;
  }

  return (
    <>
      <h2 className={classes.title}>Orders</h2>
      {isLoading && <LoadingSpinner />}
      <div className={classes.orders}>
        <ul>
          {orders.map((order) => (
            <div className={classes["order-item"]}>
              <Card>
                <li key={order.id}>
                  <div className={classes.amount}>
                    Total Amount: ${order.totalAmount}
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    Order Date: {order.orderDate}
                  </div>
                  <div>
                    {order.items.map((item) => (
                      <OrderItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                      />
                    ))}
                  </div>
                </li>
              </Card>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OrdersPage;
