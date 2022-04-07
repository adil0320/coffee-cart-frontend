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
      const url = process.env.REACT_APP_API_ENDPOINT + "/orders";
      const orders = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      const ordersData = await orders.json();
      if (!orders.ok) {
        setOrders([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);

      setOrders(ordersData);
    };
    try {
      getOrders();
    } catch (error) {
      console.log("first");
      setOrders([]);
    }
  }, [authCtx.email, authCtx.token]);

  if (!orders || (orders.length === 0 && !isLoading)) {
    return <h2 style={{ textAlign: "center" }}>No Orders Yet</h2>;
  }

  return (
    <>
      <h2 className={classes.title}>Orders</h2>
      {isLoading && <LoadingSpinner />}
      <div className={classes.orders}>
        <ul>
          {orders.map((order) => (
            <div className={classes["order-item"]} key={order._id}>
              <Card>
                <li>
                  <div className={classes.amount}>
                    Total Amount: ${order.totalAmount}
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    Order Date: {new Date(order.orderDate).toLocaleString()}
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
