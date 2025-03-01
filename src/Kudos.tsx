import { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
    { id: "k-1.png", label: "Kudos 1" },
    { id: "k-2.png", label: "Kudos 2" },
    { id: "k-3.png", label: "Kudos 3" },
];

function Kudos() {
    const navigate = useNavigate();

    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

    const handleSelect = (badgeId: string) => {
        if (selectedBadges.includes(badgeId)) {
            setSelectedBadges(selectedBadges.filter((id) => id !== badgeId));
            return;
        }
        setSelectedBadges([...selectedBadges, badgeId]);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">
                Select Your Kudos
            </h2>
            <div className="row">
                {items.map((badge) => (
                    <div key={badge.id} className="col-md-4 mb-4   ">
                        <label
                            className={`badge-card card ${selectedBadges.includes(badge.id) ? "selected" : ""}`}
                            onClick={() => handleSelect(badge.id)}>
                            <input
                                type="checkbox"
                                checked={selectedBadges.includes(badge.id)}
                                readOnly
                                onClick={handleClick} />
                            <img
                                src={`/assets/images/${badge.id}`}
                                alt={badge.label}
                                className="img-fluid"
                                width="120"
                                height="120" />
                            <p className="mt-2">{badge.label}</p>
                        </label>
                    </div>
                ))}
            </div>
            <footer>
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={() => navigate("/preview")}>
                        Next
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Kudos;
