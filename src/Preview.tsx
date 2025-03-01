import { useNavigate } from "react-router-dom";


function Preview() {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div className="text-center mt-4">
                    <h2 >
                        Preview Your Certificate
                    </h2>
                </div>
            </header>
            <iframe src="/preview.html"></iframe>
            <footer>
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={() => navigate("/mint")}>
                        Mint NFT!
                    </button>
                </div>
            </footer>
        </>
    );
}

export default Preview;
