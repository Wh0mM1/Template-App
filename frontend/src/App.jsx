import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { DefineFields } from "./componets/DefineFields";
import { TemplateScreen } from "./componets/TemplateScreen/TemplateScreen";
import { AddOrg } from "./componets/AddOrg";
import { AddUser } from "./componets/AddUser";
import { EditFileds } from "./componets/EditFields";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefineFields />} />
          <Route path="/add-org" element={<AddOrg />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-fields" element={<EditFileds />} />
          <Route path="/template-screen" element={<TemplateScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
