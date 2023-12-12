import React from 'react'
import "../styles/Profile.css";
import { Link } from 'react-router-dom';

const PatientFooter = () => {
  return (
    <div id="footbar">
            <nav>
                <ul>
                    <li><h4 style={{ color: '#FFFFFF' }}>© Doc Click Connect. All Rights Reserved. 2023</h4></li>
                    <li style={{float:"right"}}><a href="/faqs"><Link to={"/faqs"}>FAQs</Link></a></li>
                    <li style={{float:"right"}}><a href="/about"><Link to={"/about"}>About Us!</Link></a></li>
                </ul>
            </nav>
        </div>
  )
}

export default PatientFooter
