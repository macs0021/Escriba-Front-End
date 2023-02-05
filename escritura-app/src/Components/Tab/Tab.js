import React from "react";
import { useState } from "react";
import './Tab.css'
import Galery from '../Galery/Galery'
import SearchBar from "../SearchBar/SearchBar";

function Tab(props) {
  const [activeTab, setActiveTab] = useState(props.tabs[0].id);

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  const tabs = props.tabs;

  return (
    <div className="tab-container">
      <div className="bloc-tabs">
      <div className="separator"></div>
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
                  {tab.content}
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