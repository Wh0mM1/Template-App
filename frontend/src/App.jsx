import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { DefineFields } from "./componets/DefineFields/DefineFields";
import { TemplateScreen } from "./componets/TemplateScreen/TemplateScreen";
import { AddOrg } from "./componets/AddOrg/AddOrg";
import { AddUser } from "./componets/AddUser/AddUser";
import { EditFields } from "./componets/EditFields/EditFields";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefineFields />} />
          <Route path="/add-org" element={<AddOrg />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-fields" element={<EditFields />} />
          <Route path="/template-screen" element={<TemplateScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
