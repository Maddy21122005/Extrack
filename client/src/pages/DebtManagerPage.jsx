import React, { useEffect, useState } from "react";
import "../styles/debtmanager.css";
import Debtor from "../components/Debtor";
import Creditor from "../components/Creditor";
import {
  getDebtors,
  getCreditors,
  createDebtor,
  createCreditor,
  updateDebtor,
  updateCreditor,
  deleteDebtor,
  deleteCreditor,
} from "../api/debtManager";

const DebtManagerPage = () => {
  const [debtors, setDebtors] = useState([]);
  const [creditors, setCreditors] = useState([]);
  const [formMode, setFormMode] = useState(null);
  const [formData, setFormData] = useState({ name: "", amount: "" });
  const [searchDebtor, setSearchDebtor] = useState("");
  const [searchCreditor, setSearchCreditor] = useState("");

  const fetchDebtors = async () => {
    try {
      const res = await getDebtors();
      setDebtors(res.data);
    } catch (err) {
      console.error("Failed to load debtors", err);
    }
  };

  const fetchCreditors = async () => {
    try {
      const res = await getCreditors();
      setCreditors(res.data);
    } catch (err) {
      console.error("Failed to load creditors", err);
    }
  };

  useEffect(() => {
    fetchDebtors();
    fetchCreditors();
  }, []);

  const handleCreate = async () => {
    if (!formData.name || !formData.amount) return;

    const entry = {
      name: formData.name.trim(),
      amount: Number(formData.amount),
    };

    try {
      if (formMode === "create-debtor") {
        await createDebtor(entry);
        fetchDebtors();
      } else if (formMode === "create-creditor") {
        await createCreditor(entry);
        fetchCreditors();
      }
    } catch (err) {
      console.error("Create error", err);
    }

    setFormMode(null);
    setFormData({ name: "", amount: "" });
  };

  const handleUpdate = async () => {
    const id = formMode.split("-")[2];
    const amountToDeduct = Number(formData.amount);
    if (!amountToDeduct) return;

    try {
      if (formMode.includes("debtor")) {
        const current = debtors.find((d) => d._id === id);
        const newAmount = current.amount - amountToDeduct;
        if (newAmount <= 0) {
          await deleteDebtor(id);
        } else {
          await updateDebtor(id, { amount: newAmount });
        }
        fetchDebtors();
      } else {
        const current = creditors.find((c) => c._id === id);
        const newAmount = current.amount - amountToDeduct;
        if (newAmount <= 0) {
          await deleteCreditor(id);
        } else {
          await updateCreditor(id, { amount: newAmount });
        }
        fetchCreditors();
      }
    } catch (err) {
      console.error("Update error", err);
    }

    setFormMode(null);
    setFormData({ name: "", amount: "" });
  };

  const handleDelete = async (id, type) => {
    // if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      if (type === "debtor") {
        await deleteDebtor(id);
        fetchDebtors();
      } else {
        await deleteCreditor(id);
        fetchCreditors();
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const filteredDebtors = debtors.filter((d) =>
    d.name.toLowerCase().includes(searchDebtor.toLowerCase())
  );
  const filteredCreditors = creditors.filter((c) =>
    c.name.toLowerCase().includes(searchCreditor.toLowerCase())
  );

  const renderCreateForm = () => (
    <div className="inline-form">
      <input
        type="text"
        placeholder="Enter name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );

  const renderUpdateForm = () => (
    <div className="inline-form">
      <input
        type="number"
        placeholder="Amount to deduct"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );

  return (
    <div className="debt-manager-page">
      {/* Debtors */}
      <div className="debt-section">
        <div className="section-header">
          <h2>Borrowers</h2>
          <button
            onClick={() =>
              setFormMode((prev) => (prev === "create-debtor" ? null : "create-debtor"))
            }
          >
            Create New
          </button>
        </div>

        {formMode === "create-debtor" && renderCreateForm()}
        {formMode?.startsWith("update-debtor") && renderUpdateForm()}

        {!(formMode === "create-debtor" || formMode?.startsWith("update-debtor")) && (
          <input
            type="text"
            className="search-box"
            placeholder="Search debtor by name..."
            value={searchDebtor}
            onChange={(e) => setSearchDebtor(e.target.value)}
          />
        )}

        <div className="debt-headings">
          <span>#</span>
          <span>Name</span>
          <span>Amount</span>
          <span>Actions</span>
        </div>
        <div className="scroll-container-d">
          {filteredDebtors.map((d, i) => (
            <Debtor
              key={d._id}
              index={i + 1}
              name={d.name}
              amount={d.amount}
              onDelete={() => handleDelete(d._id, "debtor")}
              onUpdate={() => {
                setFormMode(`update-debtor-${d._id}`);
                setFormData({ amount: "" });
              }}
            />
          ))}
        </div>
      </div>

      {/* Creditors */}
      <div className="debt-section">
        <div className="section-header">
          <h2>Lenders</h2>
          <button
            onClick={() =>
              setFormMode((prev) => (prev === "create-creditor" ? null : "create-creditor"))
            }
          >
            Create New
          </button>
        </div>

        {formMode === "create-creditor" && renderCreateForm()}
        {formMode?.startsWith("update-creditor") && renderUpdateForm()}

        {!(formMode === "create-creditor" || formMode?.startsWith("update-creditor")) && (
          <input
            type="text"
            className="search-box"
            placeholder="Search creditor by name..."
            value={searchCreditor}
            onChange={(e) => setSearchCreditor(e.target.value)}
          />
        )}

        <div className="debt-headings">
          <span>#</span>
          <span>Name</span>
          <span>Amount</span>
          <span>Actions</span>
        </div>
        <div className="scroll-container-c">
          {filteredCreditors.map((c, i) => (
            <Creditor
              key={c._id}
              index={i + 1}
              name={c.name}
              amount={c.amount}
              onDelete={() => handleDelete(c._id, "creditor")}
              onUpdate={() => {
                setFormMode(`update-creditor-${c._id}`);
                setFormData({ amount: "" });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebtManagerPage;
