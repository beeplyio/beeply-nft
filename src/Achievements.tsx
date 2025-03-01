import { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
    { id: "a-1.png", label: "10K Customer" },
    { id: "a-2.png", label: "Level 12" },
    { id: "a-3.png", label: "15th Anniversary" },
];

function Achievements() {
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
                Select Your Achievements
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
                    <button className="btn btn-primary" onClick={() => navigate("/badges")}>
                        Next
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Achievements;
