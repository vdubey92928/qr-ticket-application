import GateScanner from "../components/GateScanner";

function GatePage() {
    return (

        <div className="row">
            <h2 className="text-center ">Park Entry Gate</h2>
            <div className="col-sm-3 mx-auto ">
                <GateScanner />
            </div>
        </div>

    );
}

export default GatePage;
