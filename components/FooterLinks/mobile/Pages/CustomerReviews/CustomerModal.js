import React from "react";

const CustomerModal = ({ onClose, openModal }) => {
  return (
    <div className={`customermodal-content ${openModal ? "open" : ""} `}>
      <header className="drawer-header">
        <span className="text">Category</span>
        <button onClick={() => onClose(false)}>
          <span className="close-button">＋</span>
        </button>
      </header>
      <ul className="drawer-content">
        <li className="mobile-category-item">COMPANY INFO</li>
        <li className="mobile-category-item">NEW IN</li>
        <li className="mobile-category-item">CLOTHING</li>
        <li className="mobile-category-item">DRESSES</li>
        <li className="mobile-category-item">TOPS</li>
        <li className="mobile-category-item">BOTTOMS</li>
        <li className="mobile-category-item">ACCESSORIES</li>
        <li className="mobile-category-item">CLOTHING</li>
        <li className="mobile-category-item">TOPS</li>
        <li className="mobile-category-item">DRESSES</li>
        <li className="mobile-category-item">BOTTOMS</li>
        <li className="mobile-category-item">ACCESSORIES</li>
        <li className="mobile-category-item">SPECIAL OCCASIONS</li>
        <li className="mobile-category-item">SWIMWEAR</li>
        <li className="mobile-category-item">other</li>
      </ul>
      <div className="drawer-footer">
        <button className="indexstyle-sc-147lzxr-0 lcIgeh drawer-footer-apply">
          <div className="children-container">APPLY</div>
        </button>
      </div>
    </div>
  );
};

export default CustomerModal;
