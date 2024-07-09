'use client';

const AdminFooter = () => {
    return (
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © ${new Date().getFullYear()} - Version 1.0.0 - Bus Ticket Booking Admin</p>
        </aside>
      </footer>
    );
};

export default AdminFooter;
