import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';


function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (



            <div className="mina-poap-homepage">
            <header className="mina-poap-header">
              <h1 className="mina-poap-title">MinaPOAP</h1>
          
            </header>
            <main className="mina-poap-main">
              <section className="mina-poap-hero">
                <h2 className="mina-poap-hero-title">Welcome to MinaPOAP Beta</h2>
                <p className="mina-poap-hero-text">
                  MinaPOAP is a revolutionary event attendance and proof-of-participation platform built on the Mina Protocol.
                  Create, manage, and participate in events with the power of zero-knowledge proofs.
                </p>
              </section>
              <section className="mina-poap-features">
                <h3 className="mina-poap-features-title">Key Features</h3>
                <ul className="mina-poap-features-list">
                  <li>Create and manage events with ease</li>
                  <li>Secure, privacy-preserving attendance tracking</li>
                  <li>Claim unique proof-of-attendance tokens</li>
                  <li>Built on the lightweight and secure Mina Protocol</li>
                </ul>
              </section>
              <section className="mina-poap-cta">
                <h3 className="mina-poap-cta-title">Get Started Today</h3>
                <p className="mina-poap-cta-text">Join the beta and experience the future of event management.</p>
                <a href="/create" className="mina-poap-cta-button">Create Your First Event</a>
              </section>
            </main>
          </div>






  );
}

export default Dashboard;
