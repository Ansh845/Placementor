import { Helmet } from "react-helmet";
import BarchartD02 from "../components/statscharts/Day0yearwise";
import BarchartD01 from "../components/statscharts/Day0companywise";
import Lcchart from "../components/statscharts/Day0Branchwise";
import BarchartD12a from "../components/statscharts/Day12companywise";
import BarchartD12b from "../components/statscharts/Day12yearwise";
import Lcchart12 from "../components/statscharts/Day12branchwise";

export default function Stats() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Statistics | Placementor</title>
        <link
          rel="icon"
          type="image/png"
          href="https://github.com/MejarKumar/All-Company-Logo/blob/main/favicon-32x32.png?raw=true"
        />
        <meta name="theme-color" content="#064420" />
      </Helmet>
      <div style={{textAlign: "center", margin:"2rem",fontWeight:"bold",fontSize:"3rem",fontFamily:"sans-serif",color:"rgba(238, 79, 152, 1) "}}>On Campus Placements 2021
      <BarchartD01/><BarchartD12a/><Lcchart/><BarchartD02/>
      <Lcchart12/><BarchartD12b/></div>
    

    </div>
  );
}
