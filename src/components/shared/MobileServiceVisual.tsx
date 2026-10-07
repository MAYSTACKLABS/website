import PhoneMockup from "./PhoneMockup.tsx";
import appDashboard from "../../assets/projects/snowball/mobile1.png";
import appOverview from "../../assets/projects/snowball/mobile-current.png";
import appWorkspace from "../../assets/projects/snowball/mobile3.png";

/** Real product screens in the calibrated titanium iPhone frame. */
export default function MobileServiceVisual() {
    const screens = [appDashboard, appOverview, appWorkspace];
    return <div className="mobile-service-visual">
        {screens.map((screen, index) => <PhoneMockup key={screen} className={`mobile-service-phone mobile-service-phone-${index + 1}`} image={screen} name={`Mobile application interface ${index + 1}`} />)}
    </div>;
}
