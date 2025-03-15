import Header from "../components/Header/Header";
import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";
import Grid from "../components/Grid/Grid";
const HomePage: React.FC = () => {
    return (
      <>
        <Header showAdvertising={true}/>
        <div className="mb-4 pr-10 pl-10">
          <AdvertisingCarousel />
        </div>
        <Grid></Grid>
      </>
    );
};

export default HomePage;