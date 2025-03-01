import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: '60px' }}>
            <div className="row text-center" style={{ marginBottom: '50px' }}>
                <div className="col-md-12">
                    <h2 className="mt-4">Welcome to Beeply NFT Certificate Generator with XRPL</h2>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-12">
                    <img src="/assets/images/beeply.png" alt="Beeply" width="200" height="200" />
                    {/* hide following small screen */}
                    <img src="/assets/images/nft.png" style={{ marginRight: '20px', marginLeft: '10px' }} className="d-none d-md-inline" alt="NFT" width="100" height="100" />
                    <img src="/assets/images/xrpl.png" style={{ borderRadius: '40px' }} alt="XRPL" width="180" height="180" />
                </div>
            </div>
            <footer>
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={() => navigate("/achievements")}>
                        Let's Start
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Home;
