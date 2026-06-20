"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Doc {
    _id: string;
    category: string;
    title: string;
    content: string;
    fileUrl: string;
}

export default function ResourcesPage() {
    const [docs, setDocs] = useState<Doc[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetch(`${API}/api/files/documents`)
            .then((r) => r.json())
            .then((d) => {
                setDocs(d.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered =
        filter === "All" ? docs : docs.filter((d) => d.category === filter);

    return (
        <div style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "sans-serif" }}>

            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0c2340, #1a3a6b)", padding: "3rem 2rem", textAlign: "center" }}>
                <h1 style={{ color: "white", fontSize: "2rem", margin: "0 0 8px" }}>
                    📚 Resources & PYQ Papers
                </h1>
                <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 16px" }}>
                    Download Previous Year Questions & Study Notes
                </p>
                <a href="/" style={{ color: "#d4af37", fontSize: "13px", textDecoration: "none" }}>
                    ← Back to Home
                </a>
            </div>

            {/* Filter Buttons */}
            <div style={{ display: "flex", gap: "10px", padding: "1.5rem 2rem", justifyContent: "center", flexWrap: "wrap" }}>
                {["All", "PYQ", "Notes"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: "8px 20px",
                            borderRadius: "20px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "13px",
                            background: filter === cat ? "#0c2340" : "white",
                            color: filter === cat ? "white" : "#0c2340",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Documents */}
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem 3rem" }}>
                {loading && (
                    <p style={{ textAlign: "center", color: "#64748b" }}>Loading...</p>
                )}

                {!loading && filtered.length === 0 && (
                    <p style={{ textAlign: "center", color: "#64748b" }}>No documents found!</p>
                )}

                <div style={{ display: "grid", gap: "1rem" }}>
                    {filtered.map((doc) => (
                        <div
                            key={doc._id}
                            style={{
                                background: "white",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "1.5rem",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        background: doc.category === "PYQ" ? "#0c2340" : "#a91d22",
                                        color: "white",
                                        fontSize: "11px",
                                        padding: "3px 10px",
                                        borderRadius: "20px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {doc.category}
                                </span>
                                <h3 style={{ margin: "8px 0 4px", color: "#1e293b", fontSize: "15px" }}>
                                    {doc.title}
                                </h3>
                                <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                                    {doc.content}
                                </p>
                            </div>

                            <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: "linear-gradient(135deg, #a91d22, #c0392b)",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                }}
                            >
                                📥 Download
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
