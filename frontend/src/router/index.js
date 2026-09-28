import { createRouter, createWebHistory } from "vue-router";

import axios from "axios";

import Home from "../views/Home.vue";
import Vendors from "../views/Vendors.vue";
import VendorDetail from "../views/VendorDetail.vue";
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminVendors from "../views/AdminVendors.vue";
import AdminPackages from "../views/AdminPackages.vue";
import AdminReviews from "../views/AdminReviews.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },

    {
        path: "/vendors",
        name: "Vendors",
        component: Vendors
    },

    {
        path: "/vendors/:id",
        name: "VendorDetail",
        component: VendorDetail
    },

    {
        path: "/admin/login",
        name: "AdminLogin",
        component: AdminLogin
    },

    {
        path: "/admin/dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/admin/vendors",
        name: "AdminVendors",
        component: AdminVendors,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/admin/packages",
        name: "AdminPackages",
        component: AdminPackages,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/admin/reviews",
        name: "AdminReviews",
        component: AdminReviews,
        meta: {
            requiresAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to) => {

    if (!to.meta.requiresAuth) {
        return true;
    }

    try {

        const response = await axios.get(
            "http://localhost:3000/api/auth/me",
            {
                withCredentials: true
            }
        );

        if (response.data.success) {
            return true;
        }

        return "/admin/login";

    } catch (error) {

        return "/admin/login";

    }

});

export default router;