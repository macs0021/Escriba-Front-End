import React from "react";
import { useState } from "react";
import './Tab.css'
import Galery from '../Galery/Galery'
import SearchBar from "../SearchBar/SearchBar";

function Tab(props) {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    { id: 1, title: 'Tab 1', content: 'Contenido del Tab 1' },
    { id: 2, title: 'Tab 2', content: 'Contenido del Tab 2' },
    { id: 3, title: 'Tab 3', content: 'Contenido del Tab 3' },
  ];

  return (
    <div className="tab-container">
      <div className="bloc-tabs">
        {tabs.map((tab) => (
          <button key={tab.id} className={`tabs ${activeTab === tab.id ? 'active-tabs' : ''}`} onClick={() => toggleTab(tab.id)}>
            {tab.title}
          </button>
        ))}
        <div className="separator"></div>
      </div>
      <div className="content-tabs">
        {tabs.map((tab) => {
          if (activeTab === tab.id) {
            return (
              <div key={tab.id} className={`content ${activeTab === tab.id ? 'active-content' : ''}`}>
                <h2>Content {tab.id}</h2>
                <hr />
                <p>
                  <Galery />
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Tab;