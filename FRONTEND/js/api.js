// ============================================================
// Smart Vehicle Rental Platform - API Configuration
// ============================================================

const API_BASE_URL =
    "https://smart-vehicle-rental-platform-1.onrender.com/api";


// ============================================================
// API Helper
// ============================================================

const api = {

    // --------------------------------------------------------
    // Generic Request
    // --------------------------------------------------------
    async request(endpoint, options = {}) {

        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {})
        };

        // Add JWT token if available
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        try {

            const response = await fetch(
                `${API_BASE_URL}${endpoint}`,
                {
                    ...options,
                    headers
                }
            );

            // Handle empty response
            if (response.status === 204) {
                return null;
            }

            const data = await response.json();

            // Handle API errors
            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    data.message ||
                    `Request failed with status ${response.status}`
                );
            }

            return data;

        } catch (error) {

            console.error("API Error:", error);

            throw error;
        }
    },


    // ========================================================
    // AUTHENTICATION
    // ========================================================

    login(email, password) {

        return this.request("/auth/login", {
            method: "POST",

            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    },


    register(userData) {

        return this.request("/auth/register", {
            method: "POST",

            body: JSON.stringify(userData)
        });
    },


    getCurrentUser() {

        return this.request("/auth/me", {
            method: "GET"
        });
    },


    forgotPassword(email) {

        return this.request("/auth/forgot-password", {
            method: "POST",

            body: JSON.stringify({
                email: email
            })
        });
    },


    resetPassword(token, password) {

        return this.request("/auth/reset-password", {
            method: "POST",

            body: JSON.stringify({
                token: token,
                password: password
            })
        });
    },


    // ========================================================
    // VEHICLES
    // ========================================================

    getVehicles(params = "") {

        return this.request(
            `/vehicles${params}`
        );
    },


    getVehicle(id) {

        return this.request(
            `/vehicles/${id}`
        );
    },


    getVehicleById(id) {

        return this.request(
            `/vehicles/${id}`
        );
    },


    searchVehicles(query) {

        return this.request(
            `/vehicles/search?query=${encodeURIComponent(query)}`
        );
    },


    // ========================================================
    // BOOKINGS
    // ========================================================

    createBooking(bookingData) {

        return this.request("/bookings", {
            method: "POST",

            body: JSON.stringify(bookingData)
        });
    },


    getBookings() {

        return this.request("/bookings", {
            method: "GET"
        });
    },


    getMyBookings() {

        return this.request("/bookings/my-bookings", {
            method: "GET"
        });
    },


    getBooking(id) {

        return this.request(
            `/bookings/${id}`
        );
    },


    cancelBooking(id) {

        return this.request(
            `/bookings/${id}/cancel`,
            {
                method: "PUT"
            }
        );
    },


    // ========================================================
    // REVIEWS
    // ========================================================

    getVehicleReviews(vehicleId) {

        return this.request(
            `/reviews/vehicle/${vehicleId}`
        );
    },


    createReview(reviewData) {

        return this.request("/reviews", {
            method: "POST",

            body: JSON.stringify(reviewData)
        });
    },


    // ========================================================
    // COUPONS
    // ========================================================

    validateCoupon(code) {

        return this.request(
            `/coupons/validate/${encodeURIComponent(code)}`
        );
    },


    // ========================================================
    // ADMIN
    // ========================================================

    getAdminDashboard() {

        return this.request("/admin/dashboard");
    },


    // ========================================================
    // CHATBOT
    // ========================================================

    chatbot(message) {

        return this.request("/chatbot", {
            method: "POST",

            body: JSON.stringify({
                message: message
            })
        });
    }

};


// ============================================================
// Export for normal browser JavaScript
// ============================================================

window.API_BASE_URL = API_BASE_URL;
window.api = api;
