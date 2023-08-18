import { Accordion } from "react-bootstrap";    
import styled from "styled-components";
import styles from "./Data.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faWifi, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import client from "../sanity";
import { urlFor } from "../sanity";

//styles.
const Heading = styled.h1`
position:relative;
margin:auto;
margin-top:50px;
margin-bottom:0px;
  font-size:70px;
  @media screen and (max-width:730px){
    font-size:3rem;
  }
  @media screen and (max-width:490px){
    font-size:2rem;
  }
`;
const Strip = styled.div`
background: linear-gradient(
  270deg,
  rgba(238, 109, 152, 1) 15%,
  rgba(138, 94, 191, 1) 85%
);
color: #fff;
width: 100%;
height:fit-content;
padding: 1.3rem;
text-align:center;
@media screen and (max-width: 600px) {
  padding: 0.8rem;
  }`;
const AboutSection = styled.div`
  background: linear-gradient(
    270deg,
    rgba(238, 109, 152, 1) 15%,
    rgba(138, 94, 191, 1) 85%
  );
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  color: #fff;
  width: 100%;
  height: 50vh;
  padding: 0.5rem;
  @media screen and (max-width: 400px) {
    padding: 0.3rem;
    flex-direction:column;
  }
`;
const Paragraph = styled.p`
  position:relative;
  // text-align: right;
  margin: auto;
  max-width: 45%;
  font-weight: 500;
  
  @media screen and (max-width: 750px) {
    max-width:80%;
    }
`;
const Image = styled.img`
  width: 300px;
  height: 22rem;
  position: absolute;
  left: 15px;
  top: 90px;
  @media screen and (max-width: 700px) {
    height: 250px;
    width: 200px;
    top: 150px;
    left:10px; 
  }
`;

const Data = () => {     
  const params = useParams();
  const [companyInfo, setCompanyInfo] = useState({
    selection_process: {
      step1: '1',
      step2: '1',
      step3: '1'
    },
    interview_round: {
      round1: '1',
      round2: '1',
      round3: '1',
      round4: '1'
    },
    influence_of: {
      projects: '1',
      PORs: '2',
    },
    logo: "",
    eligible_branch: 'CS',
    selected_students: '4',
  });

    useEffect(()=>{
    let query = `*[_type == "placement" && company_name == "${params.id}" && year == ${params.year}]{...}`
    if(params.year==2023){
      query = `*[_type == "placement23" && company_name == "${params.id}" && year == ${params.year}]{...}`
    }
    client.fetch(query).then(companyInfo =>{
      setCompanyInfo(companyInfo);
    })
  },[setCompanyInfo]);
  const data = companyInfo[0];   //Sanity is sending an array so taking the first and only element of that array.

  if (params.type !== "placement" && params.type !== "placement23" && params.type !== "internship") {
    return <div style={{ margin: "2rem auto", textAlign: "center", fontSize: "2.5rem", color: "rgba(138, 94, 191, 1) " }}>Not Found 😔</div>;
  }

  //To display Loading on the insights website if the data is yet to load and at that moment !data==true.
  if (!data) {   
    return <div style={{ margin: "2rem auto", textAlign: "center", fontSize: "1rem", color: "rgba(138, 94, 191, 1) " }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  }

return (
    <>
      <div className={styles.main_content}>
        <h3 className={styles.company_name}>{data.company_name}</h3>                {/*Company Name just above the image.*/}
        <img src={urlFor(data.image).url()} className={styles.logo_small} />        {/*company logo using urlFor imported from Sanity.*/}

        <Strip className={styles.data_container} > 
          <div className={styles.frosty} >              {/*This div contains the primary data of job profile,cgpa,eligible branches and Year.*/}
            <ul className={styles.info_section}>        {/*Importing info_section and frosty class styles from styles imported from Data-modules.css in statscharts folder.*/} 
              <li style={styles.li_styles}><u>Profile</u> :  <span style={styles.li_styles2}> {data.role}</span></li> {/*Getting job profile by fetching role from data object.*/}
              <li style={styles.li_styles3}><u>Branches Eligible</u> :<span style={styles.li_styles2}> {data.eligible_branch} </span></li>   {/*Getting branches by fetching eligible_branch from data object.*/}
              <li style={styles.li_styles}><u>CGPA Criteria</u> :   <span style={styles.li_styles2}>{data.CGPA} CGPA</span></li>       {/*Getting cgpa by fetching CGPA from data object.*/}
              <li style={styles.li_styles}><u>Year</u> :   <span style={styles.li_styles2}>{params.year} </span></li>         {/*Getting Year of placement by using useParams hook.*/}
            </ul>
          </div>
        </Strip>

      </div>    {/*This div container contains all other secondary information and insights of the selection process, GD rounds, technical interviews and takeaways.*/}
      <Container style={{ width: "auto", display: "flex", flexDirection: "column", margin: "auto" }}>
        <Row className={styles.temp}>
          <div className="col-lg-5" style={styles.rowStyles}>
            <h1 className={styles.heading}> Selection Process</h1>  {/*Importing heading class style from styles imported from Data-modules.css in statscharts folder.*/}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Round 1</Accordion.Header>
                <Accordion.Body>
                  {data.selection_process.step1}            {/*Getting Data of round 1 selection process from data object.*/}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Group discussion Round</Accordion.Header>
                <Accordion.Body>
                  {data.selection_process.step2}            {/*Getting Data of GD round from data object.*/}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Interview Round</Accordion.Header>
                <Accordion.Body>
                  {data.selection_process.step3}            {/*Getting Data of interview round from data object.*/}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {data.interview_round && data.interview_round.round1 &&    
            <h2 className={styles.heading} style={{ paddingTop: "1rem" }}> Interview Rounds</h2>}
            {data.interview_round && <Accordion defaultActiveKey="0">
              {data.interview_round.round1 && <Accordion.Item eventKey="1">
                <Accordion.Header>Round 1</Accordion.Header>
                <Accordion.Body>
                  {data.interview_round.round1}     {/*Getting Data of round 1 of Interview from data object.*/}
                </Accordion.Body>
              </Accordion.Item>}
              {data.interview_round.round2 &&       
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Round 2</Accordion.Header>
                  <Accordion.Body>
                    {data.interview_round.round2}   {/*Getting Data of round 2 of Interview from data object if available.*/}
                  </Accordion.Body>
                </Accordion.Item>}
              {data.interview_round.round3 &&       
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Round 3</Accordion.Header>
                  <Accordion.Body>
                    {data.interview_round.round3}   {/*Getting Data of round 3 of Interview from data object if available.*/}

                  </Accordion.Body>
                </Accordion.Item>}
              {data.interview_round.round4 &&      
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Round 4</Accordion.Header>
                  <Accordion.Body>
                    {data.interview_round.round4}   {/*Getting Data of round 4 of Interview from data object if available.*/}

                  </Accordion.Body>
                </Accordion.Item>}
            </Accordion>}
          </div>

          <div className="col-lg-5" style={styles.rowStyles}>
            <h1 className={styles.heading}> Influence Of</h1>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Projects/Previous Internships</Accordion.Header>
                <Accordion.Body>
                  {data.influence_of.projects}      {/*Getting Data of influence_of.projects from data object.*/}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>PORs</Accordion.Header>
                <Accordion.Body>
                  {data.influence_of.PORs}          {/*Getting Data of influence_of.PORs from data object.*/}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

             {/*The below items display the selected candidates.*/}          
            {data.selected.length!=0 && <h1 className={styles.heading} style={{ paddingTop: "1rem" }}>Selected Candidates</h1>}
            {data.selected.length!=0 && <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Selected Candidates</Accordion.Header>
                <Accordion.Body>
                  <ol>
                    {data.selected.map((element_of_data,idx)=>{     
                      return (<li> {element_of_data}</li>)      
                    })}
                  </ol>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>}
          </div>
        </Row>

        <Row className={styles.temp}>   {/*Importing temp component from styles imported from Data-modules.css in statscharts folder.*/}
          <div className="col-lg-5" style={styles.rowStyles}>
            <h1 className={styles.heading}>Test Preparation</h1>        {/*Importing heading component from styles imported from Data-modules.css in statscharts folder.*/}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Test Series</Accordion.Header>
                <Accordion.Body>
                  {data.test_series}        {/*Getting test_series data from data object.*/}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-lg-5" style={styles.rowStyles}>
            <h1 className={styles.heading}> Takeaways</h1>       {/*Importing heading component from styles imported from Data-modules.css in statscharts folder.*/}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Key Takeaways</Accordion.Header>
                <Accordion.Body>
                  {data.takeaways}  {/*Getting takeawas data from data object.*/}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Data;