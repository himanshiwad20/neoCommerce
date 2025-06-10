import React from "react";
import Layout from "../../components/layouts/Layout.js";
import { useAuth } from "../../context/auth.js";
import UserMenu from "../../components/layouts/UserMenu.js";

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard - neoCommerce"}>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
            </div>
            <div className='col-md-9'>
                <div className="cart w-75 p-3">
                  <h3>{auth?.user?.name}</h3>
                  <h3>{auth?.user?.email}</h3>
                  <h3>{auth?.user?.address}</h3>
                </div>
            </div>
        </div>
        </div>
    </Layout>
  );
};

export default Dashboard;