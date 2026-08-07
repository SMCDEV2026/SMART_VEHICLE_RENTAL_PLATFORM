// ======================================
// SMART VEHICLE RENTAL PLATFORM
// script.js
// ======================================

// Mobile menu (Future Use)
function toggleMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}

// Browse Vehicles
function browseVehicles() {
    window.location.href = "pages/vehicles.html";
}

// Login
function loginPage() {
    window.location.href = "pages/login.html";
}

// Register
function registerPage() {
    window.location.href = "pages/register.html";
}

// Vehicle Details
function viewDetails() {
    window.location.href = "vehicle-details.html";
}

// Book Vehicle
function bookVehicle() {
    window.location.href = "booking.html";
}

// Check Availability
function checkAvailability() {
    window.location.href = "availability.html";
}

// Booking Summary
function bookingSummary() {
    window.location.href = "booking-summary.html";
}

// Payment
function paymentPage() {
    window.location.href = "payment.html";
}

// Booking Success
function bookingSuccess() {
    window.location.href = "booking-success.html";
}

// Pickup
function pickupVehicle() {
    window.location.href = "pickup.html";
}

// Ride Started
function startRide() {
    window.location.href = "ride-progress.html";
}

// Return Vehicle
function returnVehicle() {
    window.location.href = "return-vehicle.html";
}

// Final Bill
function finalBill() {
    window.location.href = "final-bill.html";
}

// Payment Settlement
function paymentSettlement() {
    window.location.href = "payment-settlement.html";
}

// Booking Completed
function bookingCompleted() {
    window.location.href = "booking-completed.html";
}

// Review
function reviewPage() {
    window.location.href = "review.html";
}

// Scroll to top
function scrollTopBtn() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

console.log("Smart Vehicle Rental Platform Loaded Successfully");

